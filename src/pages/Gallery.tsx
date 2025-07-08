
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("todos");

  const categories = [
    { id: "todos", name: "Todos" },
    { id: "infantil", name: "Aniversário Infantil" },
    { id: "adulto", name: "Adulto / Temático" },
    { id: "casamento", name: "Casamento / Chá de Bebê" }
  ];

  const cakes = [
    {
      id: 1,
      name: "Bolo Unicórnio",
      flavor: "Chocolate com Brigadeiro",
      size: "Serve 20 pessoas",
      category: "infantil",
      image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "Bolo de Casamento Clássico",
      flavor: "Baunilha com Frutas Vermelhas",
      size: "Serve 80 pessoas",
      category: "casamento",
      image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "Bolo Super-Herói",
      flavor: "Chocolate Duplo",
      size: "Serve 15 pessoas",
      category: "infantil",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 4,
      name: "Bolo Elegante Rosa",
      flavor: "Red Velvet",
      size: "Serve 25 pessoas",
      category: "adulto",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 5,
      name: "Bolo Chá de Bebê",
      flavor: "Limão com Coco",
      size: "Serve 30 pessoas",
      category: "casamento",
      image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 6,
      name: "Bolo Princesa",
      flavor: "Morango com Chantilly",
      size: "Serve 18 pessoas",
      category: "infantil",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 7,
      name: "Bolo Aniversário Dourado",
      flavor: "Chocolate Belga",
      size: "Serve 35 pessoas",
      category: "adulto",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 8,
      name: "Bolo Frozen",
      flavor: "Baunilha com Doce de Leite",
      size: "Serve 22 pessoas",
      category: "infantil",
      image: "https://images.unsplash.com/photo-1517427294546-5aa121d3467e?w=400&h=400&fit=crop&crop=center"
    }
  ];

  const filteredCakes = activeFilter === "todos" 
    ? cakes 
    : cakes.filter(cake => cake.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cake-cream to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cake-brown mb-4 font-script">
            Galeria de Bolos
          </h1>
          <p className="text-xl text-cake-brown/70 max-w-2xl mx-auto">
            Conheça alguns dos nossos trabalhos mais especiais. Cada bolo é uma obra de arte única, feita com muito carinho e dedicação.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              variant={activeFilter === category.id ? "default" : "outline"}
              className={`${
                activeFilter === category.id
                  ? "bg-gradient-to-r from-cake-pink to-cake-rose text-white"
                  : "border-cake-rose text-cake-rose hover:bg-cake-rose hover:text-white"
              } transition-all duration-300`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCakes.map((cake) => (
            <Card 
              key={cake.id} 
              className="overflow-hidden border-cake-pink/20 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-cake-brown mb-2 group-hover:text-cake-rose transition-colors duration-300">
                  {cake.name}
                </h3>
                <p className="text-cake-brown/70 mb-1">
                  <span className="font-medium">Sabor:</span> {cake.flavor}
                </p>
                <p className="text-cake-brown/70">
                  <span className="font-medium">Tamanho:</span> {cake.size}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-cake-pink/10 to-cake-rose/10 rounded-2xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-cake-brown mb-4 font-script">
            Gostou do que viu?
          </h2>
          <p className="text-cake-brown/70 mb-6 max-w-2xl mx-auto">
            Todos esses bolos podem ser personalizados de acordo com o seu gosto e ocasião. Entre em contato conosco e vamos criar algo especial para você!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cake-pink to-cake-rose hover:from-cake-rose hover:to-cake-pink text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href="/agendamento">Fazer Meu Pedido</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-cake-rose text-cake-rose hover:bg-cake-rose hover:text-white transition-all duration-300"
            >
              <a href="/contato">Falar Conosco</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
