
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Cake } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Início", href: "/" },
    { name: "Galeria", href: "/galeria" },
    { name: "Depoimentos", href: "/depoimentos" },
    { name: "Agendamento", href: "/agendamento" },
    { name: "Contato", href: "/contato" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-cake-pink/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-cake-pink to-cake-rose p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
              <Cake className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-cake-brown font-script">
                Doce Mania
              </h1>
              <p className="text-xs text-cake-rose -mt-1">Caks</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-cake-rose ${
                  isActive(item.href)
                    ? "text-cake-rose"
                    : "text-cake-brown"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cake-pink to-cake-rose rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-gradient-to-r from-cake-pink to-cake-rose hover:from-cake-rose hover:to-cake-pink text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/agendamento">Agende seu Bolo</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-cake-pink/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-cake-brown" />
            ) : (
              <Menu className="h-6 w-6 text-cake-brown" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-cake-pink/20 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-cake-rose bg-cake-pink/10"
                      : "text-cake-brown hover:text-cake-rose hover:bg-cake-pink/5"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                asChild
                className="mx-4 mt-2 bg-gradient-to-r from-cake-pink to-cake-rose hover:from-cake-rose hover:to-cake-pink text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/agendamento">Agende seu Bolo</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
