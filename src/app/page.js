import Image from 'next/image';
import Link from 'next/link';
import Button from '../components/ui/Button';
import EventsGrid from '../components/ui/EventsGrid';
import ServiceCard from '../components/ui/ServiceCard';

export const metadata = {
  title: 'Núcleo Eggoz - Organização de Eventos Corporativos',
  description: 'Núcleo Eggoz é uma empresa especializada em organização de eventos corporativos, proporcionando experiências únicas e memoráveis.',
};

export default function Home() {
  // Services data
  const services = [
    {
      id: 1,
      title: 'Eventos Corporativos',
      description: 'Organizamos eventos empresariais completos, desde pequenas reuniões executivas até grandes convenções e congressos.',
      icon: '🏢',
      url: '/servicos#eventos-corporativos'
    },
    {
      id: 2,
      title: 'Eventos Solidários',
      description: 'Planejamento e execução de eventos com propósito social, ajudando sua empresa a cumprir sua responsabilidade corporativa.',
      icon: '🤝',
      url: '/servicos#eventos-solidarios'
    },
    {
      id: 3,
      title: 'Protocolo Executivo',
      description: 'Assessoria completa em etiqueta corporativa e protocolo para eventos executivos de alto nível.',
      icon: '✨',
      url: '/servicos#protocolo-executivo'
    },
    {
      id: 4,
      title: 'Coffee Break',
      description: 'Serviço de alimentação personalizado para eventos corporativos, com opções para todos os tipos de ocasião.',
      icon: '☕',
      url: '/servicos#coffee-break'
    }
  ];

  // Client testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Maria Silva',
      position: 'Diretora de RH',
      company: 'Tech Solutions',
      testimonial: 'A Núcleo Eggoz superou todas as nossas expectativas. Nosso evento de integração foi perfeitamente executado e nossos colaboradores ainda comentam sobre o quão memorável foi.',
      image: '/images/testimonials/person1.jpg'
    },
    {
      id: 2,
      name: 'Roberto Mendes',
      position: 'CEO',
      company: 'Grupo Inovação',
      testimonial: 'Já realizamos três eventos com a equipe da Núcleo Eggoz e sempre ficamos impressionados com o profissionalismo e atenção aos detalhes. Parceiros de confiança!',
      image: '/images/testimonials/person2.jpg'
    },
    {
      id: 3,
      name: 'Carolina Torres',
      position: 'Diretora de Marketing',
      company: 'Global Brands',
      testimonial: 'Nosso lançamento de produto precisava ser impecável e a Núcleo Eggoz entregou exatamente o que precisávamos. A repercussão na mídia superou todas as metas.',
      image: '/images/testimonials/person3.jpg'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-dark min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-primary-dark opacity-90">
          <Image 
            src="/images/hero-bg.jpg" 
            alt="Evento corporativo"
            fill
            className="object-cover mix-blend-overlay"
            priority
          />
        </div>
        <div className="container mx-auto px-6 z-10 relative">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-montserrat">
              Transformamos ideias em experiências memoráveis
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Sua parceira estratégica na organização de eventos corporativos
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="light" size="lg">
                <Link href="/servicos">Nossos Serviços</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/contato">Solicitar Orçamento</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src="/images/about-image.jpg"
                  alt="Equipe Núcleo Eggoz"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-primary font-montserrat">
                Sobre a Núcleo Eggoz
              </h2>
              <p className="mb-4 text-lg">
                Desde 2015, a Núcleo Eggoz tem se destacado como referência na organização de eventos corporativos, oferecendo soluções personalizadas que combinam criatividade, excelência e resultados tangíveis.
              </p>
              <p className="mb-6 text-lg">
                Nossa equipe multidisciplinar trabalha com paixão para transformar cada evento em uma experiência inesquecível, alinhada com os objetivos estratégicos e valores de cada cliente.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">+500</div>
                  <p className="text-gray-600">Eventos realizados</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">+300</div>
                  <p className="text-gray-600">Clientes satisfeitos</p>
                </div>
              </div>
              <div className="mt-8">
                <Button variant="primary">
                  <Link href="/sobre">Conheça nossa história</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary font-montserrat">
              Nossos Serviços
            </h2>
            <p className="text-xl mt-2 max-w-3xl mx-auto text-gray-600">
              Soluções completas para todos os tipos de eventos corporativos
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard 
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                url={service.url}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="primary">
              <Link href="/servicos">Ver todos os serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary font-montserrat">
              Próximos Eventos
            </h2>
            <p className="text-xl mt-2 max-w-3xl mx-auto text-gray-600">
              Confira alguns dos eventos que estamos organizando
            </p>
          </div>
          
          <EventsGrid 
            filter={{ status: 'upcoming' }} 
            limit={3}
          />
          
          <div className="text-center mt-12">
            <Button variant="primary">
              <Link href="/eventos">Ver todos os eventos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-montserrat">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl mt-2 max-w-3xl mx-auto opacity-90">
              A satisfação dos nossos clientes é o nosso maior patrimônio
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="mr-4 relative h-12 w-12 rounded-full overflow-hidden">
                    <Image 
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm opacity-80">{testimonial.position} | {testimonial.company}</p>
                  </div>
                </div>
                <p className="italic opacity-90">{testimonial.testimonial}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-secondary-dark text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 font-montserrat">
            Pronto para criar um evento memorável?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Entre em contato conosco e vamos planejar juntos o seu próximo evento de sucesso
          </p>
          <Button variant="light" size="lg">
            <Link href="/contato">Solicitar Orçamento</Link>
          </Button>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary font-montserrat">
              Empresas que confiam em nós
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="grayscale hover:grayscale-0 transition-all duration-300">
                <Image 
                  src={`/images/logos/client-${num}.png`}
                  alt={`Cliente ${num}`}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}