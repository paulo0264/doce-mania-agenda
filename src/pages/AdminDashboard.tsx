
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LogOut, 
  Image as ImageIcon, 
  MessageSquare, 
  BarChart3,
  Users,
  Calendar,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GalleryManager from "@/components/admin/GalleryManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAdminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    } else {
      window.location.href = "/admin/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    window.location.href = "/admin/login";
  };

  if (!isAuthenticated) {
    return <div>Verificando autenticação...</div>;
  }

  // Mock stats - replace with real data after Supabase connection
  const stats = [
    { label: "Total de Imagens", value: "24", icon: ImageIcon },
    { label: "Depoimentos", value: "18", icon: MessageSquare },
    { label: "Agendamentos", value: "12", icon: Calendar },
    { label: "Visitantes", value: "1.2k", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cake-cream to-white">
      {/* Header */}
      <div className="bg-white border-b border-cake-pink/20 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cake-brown font-script">
            Painel Administrativo - Doce Mania
          </h1>
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
          <TabsList className="grid w-full grid-cols-2 lg:w-1/2">
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Galeria
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Depoimentos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
