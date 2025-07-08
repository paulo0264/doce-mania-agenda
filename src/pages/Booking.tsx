
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Cake, Heart, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Booking = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    eventDate: "",
    cakeType: "",
    flavor: "",
    size: "",
    message: ""
  });

  const cakeTypes = [
    "Aniversário Infantil",
    "Aniversário Adulto",
    "Casamento",
    "Chá de Bebê",
    "Chá de Panela",
    "Formatura",
    "Evento Corporativo",
    "Temático",
    "Outro"
  ];

  const flavors = [
    "Chocolate",
    "Baunilha",
    "Morango",
    "Chocolate Belga",
    "Red Velvet",
    "Limão",
    "Coco",
    "Doce de Leite",
    "Brigadeiro",
    "Ninho com Nutella",
    "Frutas Vermelhas",
    "Outro"
  ];

  const sizes = [
    "10-15 pessoas",
    "15-20 pessoas",
    "20-30 pessoas",
    "30-40 pessoas",
    "40-60 pessoas",
    "60-80 pessoas",
    "80-100 pessoas",
    "Mais de 100 pessoas"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone || !formData.eventDate || !formData.cakeType) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Here you would integrate with your backend, Zapier, Google Calendar, etc.
    console.log("Booking data:", formData);
    
    toast({
      title: "Agendamento enviado!",
      description: "Recebemos seu pedido e entraremos em contato em breve via WhatsApp para confirmar os detalhes.",
    });

    // Reset form
    setFormData({
      name: "",
      phone: "",
      whatsapp: "",
      eventDate: "",
      cakeType: "",
      flavor: "",
      size: "",
      message: ""
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cake-cream to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cake-brown mb-4 font-script">
            Agende seu Bolo
          </h1>
          <p className="text-xl text-cake-brown/70 max-w-2xl mx-auto">
            Preencha o formulário abaixo e vamos criar o bolo perfeito para sua ocasião especial. Entraremos em contato para confirmar todos os detalhes.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border-cake-pink/20 shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-xl font-semibold text-cake-brown mb-4 flex items-center">
                        <Heart className="mr-2 h-5 w-5 text-cake-rose" />
                        Suas Informações
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-cake-brown mb-2 block">
                            Nome Completo *
                          </label>
                          <Input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Seu nome completo"
                            className="border-cake-pink/30 focus:border-cake-rose"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-cake-brown mb-2 block">
                            Telefone *
                          </label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="(11) 99999-9999"
                            className="border-cake-pink/30 focus:border-cake-rose"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium text-cake-brown mb-2 block">
                            WhatsApp (se diferente do telefone)
                          </label>
                          <Input
                            type="tel"
                            value={formData.whatsapp}
                            onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                            placeholder="(11) 99999-9999"
                            className="border-cake-pink/30 focus:border-cake-rose"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Event Information */}
                    <div>
                      <h3 className="text-xl font-semibold text-cake-brown mb-4 flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-cake-rose" />
                        Informações do Evento
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-cake-brown mb-2 block">
                            Data da Festa *
                          </label>
                          <Input
                            type="date"
                            value={formData.eventDate}
                            onChange={(e) => handleInputChange("eventDate", e.target.value)}
                            min={today}
                            className="border-cake-pink/30 focus:border-cake-rose"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-cake-brown mb-2 block">
                            Tipo de Bolo *
                          </label>
                          <Select value={formData.cakeType} onValueChange={(value) => handleInputChange("cakeType", value)}>
                            <SelectTrigger className="border-cake-pink/30 focus:border-cake-rose">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              {cakeTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Cake Details */}
                    <div>
                      <h3 className="text-xl font-semibold text-cake-brown mb-4 flex items-center">
                        <Cake className="mr-2 h-5 w-5 text-cake-rose" />
                        Detalhes do Bolo
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-cake-brown mb-2 block">
                            Sabor Preferido
                          </label>
                          <Select value={formData.flavor} onValueChange={(value) => handleInputChange("flavor", value)}>
                            <SelectTrigger className="border-cake-pink/30 focus:border-cake-rose">
                              <SelectValue placeholder="Escolha o sabor" />
                            </SelectTrigger>
                            <SelectContent>
                              {flavors.map((flavor) => (
                                <SelectItem key={flavor} value={flavor}>
                                  {flavor}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-cake-brown mb-2 block">
                            Tamanho (número de pessoas)
                          </label>
                          <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                            <SelectTrigger className="border-cake-pink/30 focus:border-cake-rose">
                              <SelectValue placeholder="Quantas pessoas?" />
                            </SelectTrigger>
                            <SelectContent>
                              {sizes.map((size) => (
                                <SelectItem key={size} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Additional Message */}
                    <div>
                      <label className="text-sm font-medium text-cake-brown mb-2 block">
                        Mensagem Personalizada / Observações
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Descreva detalhes sobre decoração, cores, tema, alergias ou outras observações importantes..."
                        rows={4}
                        className="border-cake-pink/30 focus:border-cake-rose resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-cake-pink to-cake-rose hover:from-cake-rose hover:to-cake-pink text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Enviar Pedido
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Process Info */}
              <Card className="border-cake-pink/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-cake-brown mb-4 flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-cake-rose" />
                    Como Funciona
                  </h3>
                  <div className="space-y-4 text-sm text-cake-brown/80">
                    <div className="flex items-start space-x-3">
                      <div className="bg-cake-rose text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                        1
                      </div>
                      <p>Você preenche o formulário com todos os detalhes</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-cake-rose text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                        2
                      </div>
                      <p>Entramos em contato via WhatsApp em até 2 horas</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-cake-rose text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                        3
                      </div>
                      <p>Definimos juntos todos os detalhes e valores</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-cake-rose text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                        4
                      </div>
                      <p>Seu bolo fica pronto no dia combinado!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Notes */}
              <Card className="border-cake-pink/20 bg-cake-pink/5">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-cake-brown mb-4">
                    📝 Informações Importantes
                  </h3>
                  <ul className="space-y-2 text-sm text-cake-brown/80">
                    <li>• Pedidos com 5 dias de antecedência</li>
                    <li>• Entregamos em toda São Paulo</li>
                    <li>• Taxa de entrega calculada por região</li>
                    <li>• Aceitamos cartão, PIX e dinheiro</li>
                    <li>• Orçamento sem compromisso</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="border-cake-pink/20 bg-gradient-to-br from-cake-pink to-cake-rose text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">
                    Dúvidas?
                  </h3>
                  <p className="text-sm mb-4 opacity-90">
                    Fale conosco diretamente no WhatsApp
                  </p>
                  <Button
                    asChild
                    variant="secondary"
                    className="bg-white text-cake-rose hover:bg-cake-cream"
                  >
                    <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                      Chamar no WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
