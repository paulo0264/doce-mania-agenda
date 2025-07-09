
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login - replace with real authentication after Supabase connection
    setTimeout(() => {
      if (email === "admin@docemania.com" && password === "admin123") {
        localStorage.setItem("isAdminAuthenticated", "true");
        window.location.href = "/admin";
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao painel administrativo.",
        });
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cake-cream to-cake-peach/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-cake-pink/20 shadow-lg">
        <CardHeader className="text-center">
          <div className="bg-gradient-to-r from-cake-pink to-cake-rose p-3 rounded-full w-16 h-16 mx-auto mb-4">
            <Lock className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-cake-brown font-script">
            Painel Administrativo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-cake-brown">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-cake-brown/60" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@docemania.com"
                  className="pl-10 border-cake-pink/30 focus:border-cake-rose"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-cake-brown">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-cake-brown/60" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="pl-10 pr-10 border-cake-pink/30 focus:border-cake-rose"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-cake-brown/60 hover:text-cake-brown"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cake-pink to-cake-rose hover:from-cake-rose hover:to-cake-pink text-white"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-cake-pink/10 rounded-lg">
            <p className="text-sm text-cake-brown/70 text-center">
              <strong>Credenciais de teste:</strong><br />
              Email: admin@docemania.com<br />
              Senha: admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
