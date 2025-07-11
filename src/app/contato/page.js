import ContactForm from '../components/ui/ContactForm';
import Image from 'next/image';

export const metadata = {
  title: 'Contato | Núcleo Eggoz',
  description: 'Entre em contato com a Núcleo Eggoz para solicitar orçamentos ou tirar dúvidas sobre nossos serviços de organização de eventos corporativos.',
};

export default function ContatoPage() {
  const contactInfos = [
    { icon: '📞', title: 'Telefone', value: '(11) 4321-9876' },
    { icon: '📱', title: 'WhatsApp', value: '(11) 98765-4321' },
    { icon: '📧', title: 'E-mail', value: 'contato@nucleoeggoz.com.br' },
    { icon: '📍', title: 'Endereço', value: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP' },
  ];

  return (
    <div className="bg-white">
      {/* Contact Hero */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-white text-center font-montserrat">Entre em Contato</h1>
          <p className="text-xl text-white text-center mt-2">
            Estamos prontos para ajudar a tornar seu evento um sucesso
          </p>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-primary font-montserrat">Informações de Contato</h2>
              
              <div className="space-y-6 mb-10">
                {contactInfos.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-3xl mr-4 text-primary-light">{info.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg">{info.title}</h3>
                      <p className="text-gray-600">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4 text-primary">Horário de Atendimento</h3>
                <p>Segunda a Sexta: 9h às 18h</p>
                <p>Sábado: 9h às 13h</p>
              </div>
              
              <div className="mt-10 relative h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/images/map.jpg"
                  alt="Localização da Núcleo Eggoz" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Right Column - Form */}
            <div className="bg-neutral-light p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-primary font-montserrat">Envie sua Mensagem</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center font-montserrat">Perguntas Frequentes</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Como solicitar um orçamento para um evento?</h3>
              <p>Você pode solicitar um orçamento através do formulário de contato acima, por e-mail ou telefone. Quanto mais detalhes você fornecer sobre o evento, mais preciso será nosso orçamento.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Qual a antecedência ideal para organizar um evento?</h3>
              <p>Recomendamos um prazo mínimo de 60 dias para eventos de pequeno porte e 120 dias para eventos maiores. No entanto, também trabalhamos com demandas urgentes quando possível.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Vocês atendem em outras cidades?</h3>
              <p>Sim, atendemos em todo o Brasil. Nossa sede fica em São Paulo, mas temos parceiros locais em diversas cidades para garantir a qualidade dos nossos serviços em qualquer localização.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}