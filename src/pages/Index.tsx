
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cake, Heart, Star, Users, ChefHat, Clock } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Cake,
      title: "Bolos Personalizados",
      description: "Cada bolo é único, feito especialmente para o seu momento especial"
    },
    {
      icon: Heart,
      title: "Feito com Amor",
      description: "Ingredientes selecionados e muito carinho em cada receita"
    },
    {
      icon: Star,
      title: "Qualidade Premium",
      description: "Excelência em sabor, textura e apresentação"
    },
    {
      icon: Users,
      title: "Para Toda Família",
      description: "Sabores que conquistam desde crianças até adultos"
    },
    {
      icon: ChefHat,
      title: "Experiência Profissional",
      description: "Anos de dedicação à arte da confeitaria"
    },
    {
      icon: Clock,
      title: "Entrega Pontual",
      description: "Seu bolo pronto no dia e horário combinados"
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      text: "O bolo da minha filha ficou perfeito! Todos os convidados elogiaram o sabor e a decoração.",
      rating: 5
    },
    {
      name: "João Santos",
      text: "Atendimento excepcional e bolo delicioso. Super recomendo a Doce Mania!",
      rating: 5
    },
    {
      name: "Ana Costa",
      text: "Transformaram exatamente a ideia que eu tinha em mente. Ficou lindo e saboroso!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cake-cream via-cake-peach to-cake-pink/30 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-repeat opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.03'%3E%3Cpath d='M50 20c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm0 35c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-cake-brown mb-6 font-script">
              Transformando momentos em{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cake-pink to-cake-rose">
                doces memórias!
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-cake-brown/80 mb-8 leading-relaxed">
              Bolos personalizados feitos com ingredientes selecionados e muito carinho para tornar seus momentos especiais ainda mais doces.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-cake-pink to-cake-rose hover:from-cake-rose hover:to-cake-pink text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6"
              >
                <Link to="/agendamento">
                  <Cake className="mr-2 h-5 w-5" />
                  Agende seu Bolo
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-cake-rose text-cake-rose hover:bg-cake-rose hover:text-white transition-all duration-300 text-lg px-8 py-6"
              >
                <Link to="/galeria">Ver Galeria</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-cake-brown mb-4 font-script">
              Por que escolher a Doce Mania?
            </h2>
            <p className="text-cake-brown/70 text-lg max-w-2xl mx-auto">
              Nossa paixão pela confeitaria se reflete em cada detalhe dos nossos bolos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-cake-pink/20 hover:shadow-lg transition-shadow duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-br from-cake-pink to-cake-rose p-3 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-cake-brown mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-cake-brown/70">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-gradient-to-br from-cake-peach/30 to-cake-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-cake-brown mb-4 font-script">
              O que nossos clientes dizem
            </h2>
            <p className="text-cake-brown/70 text-lg max-w-2xl mx-auto">
              A satisfação dos nossos clientes é nossa maior recompensa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-cake-pink/20 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-cake-brown/80 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="text-cake-brown font-semibold">
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="border-cake-rose text-cake-rose hover:bg-cake-rose hover:text-white transition-all duration-300"
            >
              <Link to="/depoimentos">Ver Todos os Depoimentos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cake-pink to-cake-rose text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-script">
            Pronto para adoçar seu momento especial?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Agende agora seu bolo personalizado e deixe que a Doce Mania transforme sua celebração em uma doce memória inesquecível.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-cake-rose hover:bg-cake-cream transition-all duration-300 text-lg px-8 py-6"
          >
            <Link to="/agendamento">
              <Heart className="mr-2 h-5 w-5" />
              Fazer Meu Pedido
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
