
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const GalleryManager = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: ""
  });

  // Mock data - replace with real data after Supabase connection
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    {
      id: 1,
      title: "Bolo de Aniversário Infantil",
      description: "Bolo temático com decoração colorida",
      image: "/placeholder.svg",
      category: "infantil"
    },
    {
      id: 2,
      title: "Bolo de Casamento",
      description: "Bolo elegante de três andares",
      image: "/placeholder.svg",
      category: "casamento"
    },
    {
      id: 3,
      title: "Cupcakes Personalizados",
      description: "Cupcakes com cobertura especial",
      image: "/placeholder.svg",
      category: "cupcakes"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing item
      setGalleryItems(items => 
        items.map(item => 
          item.id === editingItem.id 
            ? { ...item, ...formData }
            : item
        )
      );
      toast({
        title: "Item atualizado!",
        description: "O item da galeria foi atualizado com sucesso.",
      });
    } else {
      // Add new item
      const newItem: GalleryItem = {
        id: Date.now(),
        ...formData
      };
      setGalleryItems(items => [...items, newItem]);
      toast({
        title: "Item adicionado!",
        description: "Novo item foi adicionado à galeria.",
      });
    }

    setFormData({ title: "", description: "", image: "", category: "" });
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      category: item.category
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setGalleryItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item removido!",
      description: "O item foi removido da galeria.",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock image upload - replace with real upload after Supabase connection
      const mockUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: mockUrl }));
      toast({
        title: "Imagem carregada!",
        description: "A imagem foi carregada temporariamente.",
      });
    }
  };

  return (
    <Card className="border-cake-pink/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-cake-brown font-script">
          Gerenciar Galeria
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingItem(null);
                setFormData({ title: "", description: "", image: "", category: "" });
              }}
              className="bg-gradient-to-r from-cake-pink to-cake-rose hover:from-cake-rose hover:to-cake-pink text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Imagem
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-cake-brown">
                {editingItem ? "Editar Item" : "Adicionar Novo Item"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-cake-brown">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Nome do bolo/produto"
                  className="border-cake-pink/30 focus:border-cake-rose"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-cake-brown">Categoria</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="ex: infantil, casamento, cupcakes"
                  className="border-cake-pink/30 focus:border-cake-rose"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-cake-brown">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição do produto"
                  className="border-cake-pink/30 focus:border-cake-rose resize-none"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-cake-brown">Imagem</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="border-cake-pink/30 focus:border-cake-rose"
                  />
                  <Upload className="h-4 w-4 text-cake-brown/60" />
                </div>
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-md border border-cake-pink/20"
                    />
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cake-pink to-cake-rose hover:from-cake-rose hover:to-cake-pink text-white"
              >
                {editingItem ? "Atualizar" : "Adicionar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item) => (
            <Card key={item.id} className="border-cake-pink/20 overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEdit(item)}
                    className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <h3 className="font-semibold text-cake-brown text-sm">{item.title}</h3>
                <p className="text-xs text-cake-brown/70 mt-1">{item.description}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-cake-pink/20 text-cake-rose text-xs rounded-full">
                  {item.category}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {galleryItems.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto h-12 w-12 text-cake-brown/40 mb-4" />
            <p className="text-cake-brown/60">Nenhuma imagem na galeria ainda.</p>
            <p className="text-sm text-cake-brown/40">Clique em "Adicionar Imagem" para começar.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GalleryManager;
