
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Cake } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cake-cream to-cake-peach flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="bg-gradient-to-br from-cake-pink to-cake-rose p-4 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <Cake className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-cake-brown mb-4 font-script">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-cake-brown mb-4">
            Página não encontrada
          </h2>
          <p className="text-cake-brown/70 mb-8 leading-relaxed">
            Ops! Parece que esta página não existe ou foi movida. Que tal voltar para nossa página inicial e descobrir nossos deliciosos bolos?
          </p>
        </div>
        
        <div className="space-y-4">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-cake-pink to-cake-rose hover:from-cake-rose hover:to-cake-pink text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Voltar ao Início
            </Link>
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button asChild variant="outline" className="border-cake-rose text-cake-rose hover:bg-cake-rose hover:text-white">
              <Link to="/galeria">Ver Galeria</Link>
            </Button>
            <Button asChild variant="outline" className="border-cake-rose text-cake-rose hover:bg-cake-rose hover:text-white">
              <Link to="/agendamento">Fazer Pedido</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
