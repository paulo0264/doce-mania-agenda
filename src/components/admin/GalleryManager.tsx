
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { useGallery } from "@/hooks/useGallery";
import { Tables } from "@/integrations/supabase/types";

type GalleryItem = Tables<'gallery_items'>;

const GalleryManager = () => {
  const { items, loading, addItem, updateItem, deleteItem, uploadImage } = useGallery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    category: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      await updateItem(editingItem.id, formData);
    } else {
      await addItem(formData);
    }

    setFormData({ title: "", description: "", image_url: "", category: "" });
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      image_url: item.image_url,
      category: item.category
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja remover este item?")) {
      await deleteItem(id);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setFormData(prev => ({ ...prev, image_url: imageUrl }));
    }
    setUploading(false);
  };

  if (loading) {
    return <div>Carregando galeria...</div>;
  }

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
                setFormData({ title: "", description: "", image_url: "", category: "" });
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
                    disabled={uploading}
                  />
                  {uploading && <Upload className="h-4 w-4 text-cake-brown/60 animate-spin" />}
                </div>
                {formData.image_url && (
                  <div className="mt-2">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-md border border-cake-pink/20"
                    />
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={uploading}
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
          {items.map((item) => (
            <Card key={item.id} className="border-cake-pink/20 overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={item.image_url}
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

        {items.length === 0 && (
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
