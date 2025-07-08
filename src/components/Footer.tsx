
import { Link } from "react-router-dom";
import { Cake, Instagram, Phone, MapPin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-cake-cream to-cake-peach border-t border-cake-pink/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-cake-pink to-cake-rose p-2 rounded-full">
                <Cake className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-cake-brown font-script">
                  Doce Mania
                </h3>
                <p className="text-sm text-cake-rose -mt-1">Cakes</p>
              </div>
            </Link>
            <p className="text-cake-brown/80 text-sm leading-relaxed">
              Transformando momentos especiais em doces memórias através de bolos únicos e personalizados, feitos com muito carinho e ingredientes selecionados.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-cake-brown font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-cake-brown/80 hover:text-cake-rose transition-colors text-sm"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/galeria"
                  className="text-cake-brown/80 hover:text-cake-rose transition-colors text-sm"
                >
                  Galeria
                </Link>
              </li>
              <li>
                <Link
                  to="/depoimentos"
                  className="text-cake-brown/80 hover:text-cake-rose transition-colors text-sm"
                >
                  Depoimentos
                </Link>
              </li>
              <li>
                <Link
                  to="/agendamento"
                  className="text-cake-brown/80 hover:text-cake-rose transition-colors text-sm"
                >
                  Agendamento
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-cake-brown font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm text-cake-brown/80">
              <li>Bolos de Aniversário</li>
              <li>Bolos Infantis</li>
              <li>Bolos de Casamento</li>
              <li>Chá de Bebê</li>
              <li>Eventos Corporativos</li>
              <li>Bolos Temáticos</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-cake-brown font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-cake-rose" />
                <span className="text-sm text-cake-brown/80">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-cake-rose" />
                <span className="text-sm text-cake-brown/80">contato@docemaniacakes.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-cake-rose" />
                <span className="text-sm text-cake-brown/80">São Paulo, SP</span>
              </div>
              <div className="flex items-center space-x-2">
                <Instagram className="h-4 w-4 text-cake-rose" />
                <a
                  href="https://instagram.com/docemaniacakes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cake-brown/80 hover:text-cake-rose transition-colors"
                >
                  @docemaniacakes
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cake-pink/20 mt-8 pt-8 text-center">
          <p className="text-cake-brown/60 text-sm">
            © 2024 Doce Mania Cakes. Todos os direitos reservados. Feito com ❤️ para adoçar seus momentos especiais.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
