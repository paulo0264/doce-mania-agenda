
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type Booking = {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  event_date: string;
  cake_type: string;
  flavor?: string;
  size?: string;
  message?: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Erro ao carregar agendamentos",
        description: "Não foi possível carregar os agendamentos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addBooking = async (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([booking])
        .select()
        .single();

      if (error) throw error;

      setBookings(prev => [data, ...prev]);
      toast({
        title: "Agendamento criado!",
        description: "Seu pedido foi registrado com sucesso.",
      });
      
      return data;
    } catch (error) {
      console.error('Error adding booking:', error);
      toast({
        title: "Erro ao criar agendamento",
        description: "Não foi possível registrar seu pedido.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBookings(prev => prev.filter(booking => booking.id !== id));
      toast({
        title: "Agendamento excluído",
        description: "O agendamento foi removido com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o agendamento.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    loading,
    addBooking,
    deleteBooking,
    refetch: fetchBookings
  };
};
