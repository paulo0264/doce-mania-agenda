
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Heart, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTestimonials } from "@/hooks/useTestimonials";

const Testimonials = () => {
  const { toast } = useToast();
  const { testimonials, loading, addTestimonial } = useTestimonials();
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    email: "",
    text: "",
    rating: 5
  });

  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTestimonial.name || !newTestimonial.text) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha seu nome e depoimento.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await addTestimonial({
      name: newTestimonial.name,
      text: newTestimonial.text,
      rating: newTestimonial.rating
    });

    if (!error) {
      // Reset form
      setNewTestimonial({
        name: "",
        email: "",
        text: "",
        rating: 5
      });
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cake-cream to-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p>Carregando depoimentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cake-cream to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cake-brown mb-4 font-script">
            Depoimentos
          </h1>
          <p className="text-xl text-cake-brown/70 max-w-2xl mx-auto">
            A satisfação dos nossos clientes é nossa maior recompensa. Veja o que eles têm a dizer sobre nossos bolos e atendimento.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="border-cake-pink/20 hover:shadow-lg transition-shadow duration-300 group overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cake-pink to-cake-rose flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-cake-brown">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-cake-brown/60">
                      {testimonial.date ? new Date(testimonial.date).toLocaleDateString('pt-BR') : ''}
                    </p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-cake-brown/80 mb-4 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Testimonial Form */}
        {/* <div className="max-w-2xl mx-auto">
          <Card className="border-cake-pink/20 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <MessageCircle className="h-12 w-12 text-cake-rose mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-cake-brown mb-2 font-script">
                  Conte sua Experiência
                </h2>
                <p className="text-cake-brown/70">
                  Seu depoimento é muito importante para nós e ajuda outros clientes a conhecerem nosso trabalho.
                </p>
              </div>

              <form onSubmit={handleSubmitTestimonial} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-cake-brown mb-2 block">
                      Nome Completo *
                    </label>
                    <Input
                      type="text"
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                      placeholder="Seu nome completo"
                      className="border-cake-pink/30 focus:border-cake-rose"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-cake-brown mb-2 block">
                      E-mail (opcional)
                    </label>
                    <Input
                      type="email"
                      value={newTestimonial.email}
                      onChange={(e) => setNewTestimonial({...newTestimonial, email: e.target.value})}
                      placeholder="seu@email.com"
                      className="border-cake-pink/30 focus:border-cake-rose"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-cake-brown mb-2 block">
                    Avaliação
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewTestimonial({...newTestimonial, rating: star})}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-8 w-8 transition-colors ${
                            star <= newTestimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-cake-brown mb-2 block">
                    Seu Depoimento *
                  </label>
                  <Textarea
                    value={newTestimonial.text}
                    onChange={(e) => setNewTestimonial({...newTestimonial, text: e.target.value})}
                    placeholder="Conte-nos sobre sua experiência com a Doce Mania Cakes..."
                    rows={4}
                    className="border-cake-pink/30 focus:border-cake-rose resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-cake-pink to-cake-rose hover:from-cake-rose hover:to-cake-pink text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Enviar Depoimento
                </Button>
              </form>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default Testimonials;
