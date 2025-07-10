
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LogOut, 
  Image as ImageIcon, 
  MessageSquare, 
  Users,
  Calendar,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGallery } from "@/hooks/useGallery";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useBookings } from "@/hooks/useBookings";
import GalleryManager from "@/components/admin/GalleryManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import BookingsManager from "@/components/admin/BookingsManager";

const AdminDashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { items: galleryItems } = useGallery();
  const { testimonials } = useTestimonials();
  const { bookings } = useBookings();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/admin/login");
    }
  }, [user, authLoading, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cake-cream to-white flex items-center justify-center">
        <div>Verificando autenticação...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    { label: "Total de Imagens", value: galleryItems.length.toString(), icon: ImageIcon },
    { label: "Depoimentos", value: testimonials.length.toString(), icon: MessageSquare },
    { label: "Agendamentos", value: bookings.length.toString(), icon: Calendar },
    { label: "Visitantes", value: "1.2k", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cake-cream to-white">
      {/* Header */}
      <div className="bg-white border-b border-cake-pink/20 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-cake-brown font-script">
              Painel Administrativo - Doce Mania
            </h1>
            <p className="text-sm text-cake-brown/60">
              Bem-vindo, {user.user_metadata?.full_name || user.email}
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-cake-rose text-cake-rose hover:bg-cake-rose hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-cake-pink/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-cake-brown/70">{stat.label}</p>
                    <p className="text-2xl font-bold text-cake-brown">{stat.value}</p>
                  </div>
                  <div className="bg-gradient-to-r from-cake-pink to-cake-rose p-3 rounded-full">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-2/3">
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Galeria
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Depoimentos
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Agendamentos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsManager />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
