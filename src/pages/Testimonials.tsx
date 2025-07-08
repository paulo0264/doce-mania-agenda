
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Heart, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Testimonials = () => {
  const { toast } = useToast();
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5
  });

  const testimonials = [
    {
      id: 1,
      name: "Maria Silva",
      message: "O bolo da minha filha ficou perfeito! Todos os convidados elogiaram o sabor e a decoração. A Doce Mania superou todas as minhas expectativas!",
      rating: 5,
      date: "Janeiro 2024",
      cakeType: "Bolo Unicórnio",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "João Santos",
      message: "Atendimento excepcional e bolo delicioso. A equipe foi muito atenciosa e o resultado foi incrível. Super recomendo a Doce Mania!",
      rating: 5,
      date: "Dezembro 2023",
      cakeType: "Bolo de Chocolate Gourmet",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Ana Costa",
      message: "Transformaram exatamente a ideia que eu tinha em mente. Ficou lindo e saboroso! Meu casamento ficou ainda mais especial.",
      rating: 5,
      date: "Novembro 2023",
      cakeType: "Bolo de Casamento",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Pedro Oliveira",
      message: "Qualidade excepcional! O bolo não só estava lindo como tinha um sabor incrível. Todos perguntaram onde eu havia encomendado.",
      rating: 5,
      date: "Outubro 2023",
      cakeType: "Bolo Temático Futebol",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Carmen Rodriguez",
      message: "O chá de bebê da minha irmã ficou perfeito! O bolo estava lindo e delicioso. Muito obrigada por tornarem esse dia tão especial!",
      rating: 5,
      date: "Setembro 2023",
      cakeType: "Bolo Chá de Bebê",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c28c?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Roberto Lima",
      message: "Profissionalismo e qualidade em cada detalhe. O bolo de aniversário dos meus 50 anos ficou espetacular. Parabéns à equipe!",
      rating: 5,
      date: "Agosto 2023",
      cakeType: "Bolo Elegante Dourado",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const handleSubmitTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTestimonial.name || !newTestimonial.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha seu nome e depoimento.",
        variant: "destructive",
      });
      return;
    }

    // Aqui você integraria com um backend ou serviço
    toast({
      title: "Depoimento enviado!",
      description: "Obrigado por compartilhar sua experiência conosco. Seu depoimento será analisado e publicado em breve.",
    });

    // Reset form
    setNewTestimonial({
      name: "",
      email: "",
      message: "",
      rating: 5
    });
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
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-cake-brown">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-cake-brown/60">
                      {testimonial.date}
                    </p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-cake-brown/80 mb-4 italic leading-relaxed">
                  "{testimonial.message}"
                </p>
                
                <div className="bg-cake-pink/10 rounded-lg p-3">
                  <p className="text-sm text-cake-brown/70">
                    <span className="font-medium">Pedido:</span> {testimonial.cakeType}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Testimonial Form */}
        <div className="max-w-2xl mx-auto">
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
                    value={newTestimonial.message}
                    onChange={(e) => setNewTestimonial({...newTestimonial, message: e.target.value})}
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
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
