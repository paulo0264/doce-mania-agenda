
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, MessageCircle, Calendar, User, Phone, Cake } from "lucide-react";
import { useBookings } from "@/hooks/useBookings";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BookingsManager = () => {
  const { bookings, loading, deleteBooking } = useBookings();

  const handleWhatsApp = (phone: string, whatsapp: string | undefined, name: string) => {
    const phoneNumber = whatsapp || phone;
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const message = `Olá ${name}! Recebemos seu pedido de bolo e entraremos em contato para finalizar os detalhes. Obrigado!`;
    const whatsappUrl = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    
    const statusLabels = {
      pending: "Pendente",
      confirmed: "Confirmado",
      cancelled: "Cancelado",
    };

    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || statusColors.pending}>
        {statusLabels[status as keyof typeof statusLabels] || "Pendente"}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Carregando agendamentos...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Agendamentos ({bookings.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhum agendamento encontrado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Data do Evento</TableHead>
                  <TableHead>Tipo de Bolo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{booking.name}</div>
                          <div className="text-sm text-gray-500">
                            {formatDate(booking.created_at)}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-sm">{booking.phone}</div>
                          {booking.whatsapp && (
                            <div className="text-xs text-gray-500">
                              WhatsApp: {booking.whatsapp}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {formatDate(booking.event_date)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Cake className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{booking.cake_type}</div>
                          {booking.flavor && (
                            <div className="text-xs text-gray-500">
                              Sabor: {booking.flavor}
                            </div>
                          )}
                          {booking.size && (
                            <div className="text-xs text-gray-500">
                              Tamanho: {booking.size}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(booking.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleWhatsApp(booking.phone, booking.whatsapp, booking.name)}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir agendamento</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o agendamento de {booking.name}? 
                                Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteBooking(booking.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingsManager;
