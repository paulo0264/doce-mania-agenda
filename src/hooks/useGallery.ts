
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

type GalleryItem = Tables<'gallery_items'>;

export const useGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast({
        title: "Erro ao carregar galeria",
        description: "Não foi possível carregar os itens da galeria.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .insert([item])
        .select()
        .single();

      if (error) throw error;
      setItems(prev => [data, ...prev]);
      
      toast({
        title: "Item adicionado!",
        description: "O item foi adicionado à galeria com sucesso.",
      });
      
      return { data, error: null };
    } catch (error) {
      toast({
        title: "Erro ao adicionar item",
        description: "Não foi possível adicionar o item à galeria.",
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const updateItem = async (id: string, updates: Partial<GalleryItem>) => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setItems(prev => prev.map(item => item.id === id ? data : item));
      
      toast({
        title: "Item atualizado!",
        description: "O item foi atualizado com sucesso.",
      });
      
      return { data, error: null };
    } catch (error) {
      toast({
        title: "Erro ao atualizar item",
        description: "Não foi possível atualizar o item.",
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setItems(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Item removido!",
        description: "O item foi removido da galeria.",
      });
    } catch (error) {
      toast({
        title: "Erro ao remover item",
        description: "Não foi possível remover o item.",
        variant: "destructive",
      });
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Erro ao fazer upload",
        description: "Não foi possível fazer o upload da imagem.",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    addItem,
    updateItem,
    deleteItem,
    uploadImage,
    refetch: fetchItems,
  };
};
