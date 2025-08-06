
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Instagram, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setContactForm({ ...contactForm, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha nome, email e mensagem.",
        variant: "destructive",
      });
      return;
    }

    // Here you would integrate with your backend or email service
    console.log("Contact form data:", contactForm);
    
    toast({
      title: "Mensagem enviada!",
      description: "Recebemos sua mensagem e responderemos em breve.",
    });

    // Reset form
    setContactForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone / WhatsApp",
      content: "(11) 99685-4656",
      action: "https://wa.me/5584996854656",
      actionText: "Chamar no WhatsApp"
    },
    {
      icon: Mail,
      title: "E-mail",
      content: "docemaniacaks@gmail.com",
      action: "docemaniacaks@gmail.com",
      actionText: "Enviar E-mail"
    },
    {
      icon: MapPin,
      title: "Localização",
      content: "Rodolfo Fernandes, RN",
      subtitle: "Rua: Martinho Cavalcante Dantas"
    },
    {
      icon: Instagram,
      title: "Instagram",
      content: "@docemaniacakes",
      action: "https://instagram.com/docemaniacaks",
      actionText: "Seguir no Instagram"
    }
  ];

  const workingHours = [
    { day: "Segunda a Sexta", hours: "09:00 - 18:00" },
    { day: "Sábado", hours: "09:00 - 15:00" },
    { day: "Domingo", hours: "Fechado" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cake-cream to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cake-brown mb-4 font-script">
            Entre em Contato
          </h1>
          <p className="text-xl text-cake-brown/70 max-w-2xl mx-auto">
            Estamos aqui para esclarecer suas dúvidas e ajudar a tornar sua ocasião especial ainda mais doce. Entre em contato conosco!
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-cake-pink/20 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-cake-brown mb-6 font-script">
                    Envie sua Mensagem
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-cake-brown mb-2 block">
                          Nome Completo *
                        </label>
                        <Input
                          type="text"
                          value={contactForm.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Seu nome completo"
                          className="border-cake-pink/30 focus:border-cake-rose"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-cake-brown mb-2 block">
                          E-mail *
                        </label>
                        <Input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="seu@email.com"
                          className="border-cake-pink/30 focus:border-cake-rose"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-cake-brown mb-2 block">
                          Telefone
                        </label>
                        <Input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="border-cake-pink/30 focus:border-cake-rose"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-cake-brown mb-2 block">
                          Assunto
                        </label>
                        <Input
                          type="text"
                          value={contactForm.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          placeholder="Assunto da mensagem"
                          className="border-cake-pink/30 focus:border-cake-rose"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-cake-brown mb-2 block">
                        Mensagem *
                      </label>
                      <Textarea
                        value={contactForm.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Escreva sua mensagem aqui..."
                        rows={5}
                        className="border-cake-pink/30 focus:border-cake-rose resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-cake-pink to-cake-rose hover:from-cake-rose hover:to-cake-pink text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Details */}
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-cake-pink/20 hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-br from-cake-pink to-cake-rose p-3 rounded-full">
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-cake-brown mb-2">
                            {info.title}
                          </h3>
                          <p className="text-cake-brown/80 mb-1">{info.content}</p>
                          {info.subtitle && (
                            <p className="text-sm text-cake-brown/60 mb-3">{info.subtitle}</p>
                          )}
                          {info.action && (
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="border-cake-rose text-cake-rose hover:bg-cake-rose hover:text-white transition-all duration-300"
                            >
                              <a href={info.action} target="_blank" rel="noopener noreferrer">
                                {info.actionText}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Working Hours */}
              <Card className="border-cake-pink/20 bg-gradient-to-br from-cake-pink/5 to-cake-rose/5">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-cake-brown mb-4 flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-cake-rose" />
                    Horário de Atendimento
                  </h3>
                  <div className="space-y-3">
                    {workingHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-cake-brown/80">{schedule.day}</span>
                        <span className="font-medium text-cake-brown">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-cake-rose/10 rounded-lg">
                    <p className="text-sm text-cake-brown/80">
                      <strong>Nota:</strong> Respondemos mensagens do WhatsApp e e-mail mesmo fora do horário comercial, mas o atendimento oficial é nos horários acima.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-cake-pink/20 bg-gradient-to-br from-cake-pink to-cake-rose text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-4">
                    Precisa de um Orçamento Rápido?
                  </h3>
                  <p className="mb-6 opacity-90">
                    Para orçamentos e pedidos urgentes, o WhatsApp é nossa forma mais rápida de comunicação.
                  </p>
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="bg-white text-cake-rose hover:bg-cake-cream transition-all duration-300"
                  >
                    <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                      <Phone className="mr-2 h-5 w-5" />
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

export default Contact;
