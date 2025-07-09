import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

type Testimonial = Tables<'testimonials'>;

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: "Erro ao carregar depoimentos",
        description: "Não foi possível carregar os depoimentos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at' | 'date'> & { date?: string }) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([testimonial])
        .select()
        .single();

      if (error) throw error;
      setTestimonials(prev => [data, ...prev]);
      
      toast({
        title: "Depoimento adicionado!",
        description: "O depoimento foi adicionado com sucesso.",
      });
      
      return { data, error: null };
    } catch (error) {
      toast({
        title: "Erro ao adicionar depoimento",
        description: "Não foi possível adicionar o depoimento.",
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const updateTestimonial = async (id: string, updates: Partial<Testimonial>) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTestimonials(prev => prev.map(item => item.id === id ? data : item));
      
      toast({
        title: "Depoimento atualizado!",
        description: "O depoimento foi atualizado com sucesso.",
      });
      
      return { data, error: null };
    } catch (error) {
      toast({
        title: "Erro ao atualizar depoimento",
        description: "Não foi possível atualizar o depoimento.",
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTestimonials(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Depoimento removido!",
        description: "O depoimento foi removido com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao remover depoimento",
        description: "Não foi possível remover o depoimento.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return {
    testimonials,
    loading,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    refetch: fetchTestimonials,
  };
};
