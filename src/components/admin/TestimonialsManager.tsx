
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Star, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  date: string;
}

const TestimonialsManager = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    text: "",
    rating: 5
  });

  // Mock data - replace with real data after Supabase connection
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: "Maria Silva",
      text: "O bolo da minha filha ficou perfeito! Todos os convidados elogiaram o sabor e a decoração.",
      rating: 5,
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "João Santos",
      text: "Atendimento excepcional e bolo delicioso. Super recomendo a Doce Mania!",
      rating: 5,
      date: "2024-01-10"
    },
    {
      id: 3,
      name: "Ana Costa",
      text: "Transformaram exatamente a ideia que eu tinha em mente. Ficou lindo e saboroso!",
      rating: 5,
      date: "2024-01-08"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing testimonial
      setTestimonials(items => 
        items.map(item => 
          item.id === editingItem.id 
            ? { ...item, ...formData }
            : item
        )
      );
      toast({
        title: "Depoimento atualizado!",
        description: "O depoimento foi atualizado com sucesso.",
      });
    } else {
      // Add new testimonial
      const newTestimonial: Testimonial = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      setTestimonials(items => [...items, newTestimonial]);
      toast({
        title: "Depoimento adicionado!",
        description: "Novo depoimento foi adicionado com sucesso.",
      });
    }

    setFormData({ name: "", text: "", rating: 5 });
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (item: Testimonial) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      text: item.text,
      rating: item.rating
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setTestimonials(items => items.filter(item => item.id !== id));
    toast({
      title: "Depoimento removido!",
      description: "O depoimento foi removido com sucesso.",
    });
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="border-cake-pink/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-cake-brown font-script">
          Gerenciar Depoimentos
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingItem(null);
                setFormData({ name: "", text: "", rating: 5 });
              }}
              className="bg-gradient-to-r from-cake-pink to-cake-rose hover:from-cake-rose hover:to-cake-pink text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Depoimento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-cake-brown">
                {editingItem ? "Editar Depoimento" : "Adicionar Novo Depoimento"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-cake-brown">Nome do Cliente</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nome completo"
                  className="border-cake-pink/30 focus:border-cake-rose"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating" className="text-cake-brown">Avaliação</Label>
                <Select 
                  value={formData.rating.toString()} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, rating: parseInt(value) }))}
                >
                  <SelectTrigger className="border-cake-pink/30 focus:border-cake-rose">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ (5 estrelas)</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ (4 estrelas)</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ (3 estrelas)</SelectItem>
                    <SelectItem value="2">⭐⭐ (2 estrelas)</SelectItem>
                    <SelectItem value="1">⭐ (1 estrela)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="text" className="text-cake-brown">Depoimento</Label>
                <Textarea
                  id="text"
                  value={formData.text}
                  onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Escreva o depoimento do cliente..."
                  className="border-cake-pink/30 focus:border-cake-rose resize-none"
                  rows={4}
                  required
                />
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
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-cake-pink/20">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-cake-brown">{testimonial.name}</h3>
                    <div className="flex gap-1 mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(testimonial)}
                      className="h-8 w-8 p-0 border-cake-pink/30 hover:bg-cake-pink/10"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(testimonial.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-cake-brown/80 text-sm italic">"{testimonial.text}"</p>
                <p className="text-xs text-cake-brown/50 mt-2">
                  {new Date(testimonial.date).toLocaleDateString('pt-BR')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-cake-brown/40 mb-4" />
            <p className="text-cake-brown/60">Nenhum depoimento cadastrado ainda.</p>
            <p className="text-sm text-cake-brown/40">Clique em "Adicionar Depoimento" para começar.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestimonialsManager;
