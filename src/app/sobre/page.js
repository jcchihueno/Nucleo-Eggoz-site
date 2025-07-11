import Image from 'next/image';
import Link from 'next/link';
import Button from '../components/ui/Button';

export const metadata = {
  title: 'Sobre Nós | Núcleo Eggoz',
  description: 'Conheça a história e missão da Núcleo Eggoz, uma empresa especializada em organização de eventos corporativos com excelência desde 2015.',
};

export default function SobrePage() {
  // Team members data
  const teamMembers = [
    {
      name: 'Ana Paula Santos',
      position: 'CEO e Fundadora',
      bio: 'Com mais de 20 anos de experiência em eventos corporativos, Ana Paula fundou a Núcleo Eggoz com a missão de elevar o padrão de eventos empresariais no Brasil.',
      image: '/images/team/ana-paula.jpg'
    },
    {
      name: 'Ricardo Oliveira',
      position: 'Diretor de Operações',
      bio: 'Especialista em logística e gestão de equipes, Ricardo garante que cada evento seja executado com precisão e excelência.',
      image: '/images/team/ricardo.jpg'
    },
    {
      name: 'Camila Ferreira',
      position: 'Diretora Criativa',
      bio: 'Formada em Design, Camila traz uma visão inovadora para transformar conceitos em experiências únicas e memoráveis.',
      image: '/images/team/camila.jpg'
    },
    {
      name: 'Marcos Ribeiro',
      position: 'Gerente de Projetos',
      bio: 'Com formação em Administração e certificação PMP, Marcos coordena projetos complexos garantindo prazos e qualidade.',
      image: '/images/team/marcos.jpg'
    }
  ];

  // Company values
  const values = [
    {
      title: 'Excelência',
      description: 'Buscamos constantemente a perfeição em cada detalhe, superando expectativas em todos os eventos que realizamos.',
      icon: '⭐'
    },
    {
      title: 'Inovação',
      description: 'Estamos sempre à frente das tendências, trazendo soluções criativas e tecnológicas para nossos eventos.',
      icon: '💡'
    },
    {
      title: 'Comprometimento',
      description: 'Entregamos o que prometemos, trabalhando incansavelmente para atingir os objetivos dos nossos clientes.',
      icon: '🤝'
    },
    {
      title: 'Sustentabilidade',
      description: 'Promovemos práticas responsáveis em nossos eventos, minimizando impactos ambientais e maximizando benefícios sociais.',
      icon: '🌱'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat">Nossa História</h1>
            <p className="text-xl mb-0 opacity-90">
              Conheça a trajetória da Núcleo Eggoz e os valores que nos guiam
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary font-montserrat">
                Uma história de paixão e excelência
              </h2>
              <p className="mb-4">
                A Núcleo Eggoz nasceu em 2015 da visão de Ana Paula Santos, que após anos trabalhando em grandes agências de eventos, percebeu a necessidade de uma abordagem mais personalizada e estratégica para eventos corporativos.
              </p>
              <p className="mb-4">
                O que começou como uma pequena consultoria se transformou em uma empresa referência no mercado, especializada em criar experiências memoráveis alinhadas aos objetivos de negócio de seus clientes.
              </p>
              <p className="mb-4">
                O nome "Eggoz" surgiu da ideia de que assim como um ovo contém todo potencial para criar vida, cada evento contém o potencial para criar conexões significativas e resultados transformadores para as empresas.
              </p>
              <p>
                Hoje, contamos com uma equipe multidisciplinar de profissionais apaixonados por eventos e focados em entregar excelência em cada projeto que realizamos.
              </p>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/about/company-history.jpg"
                alt="História da Núcleo Eggoz" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl text-primary mb-4">🎯</div>
              <h2 className="text-2xl font-bold mb-4 text-primary">Nossa Missão</h2>
              <p>
                Criar experiências corporativas excepcionais que gerem resultados tangíveis para nossos clientes, conectando pessoas e fortalecendo marcas através de eventos memoráveis e estrategicamente planejados.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl text-primary mb-4">👁️</div>
              <h2 className="text-2xl font-bold mb-4 text-primary">Nossa Visão</h2>
              <p>
                Ser reconhecida como a principal referência em eventos corporativos no Brasil, elevando continuamente os padrões do setor e criando um impacto positivo para empresas, participantes e comunidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary font-montserrat mb-2">
              Nossos Valores
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-600">
              Princípios que guiam nossas decisões e ações em tudo o que fazemos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-neutral-light p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-primary">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-montserrat mb-2">
              Nossa Equipe
            </h2>
            <p className="text-lg max-w-3xl mx-auto opacity-90">
              Conheça os profissionais apaixonados que tornam cada evento especial
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white bg-opacity-10 rounded-lg overflow-hidden backdrop-blur-sm">
                <div className="relative h-64">
                  <Image 
                    src={member.image}
                    alt={member.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary-contrast font-medium mb-3">{member.position}</p>
                  <p className="text-sm opacity-90">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">+500</div>
              <p className="text-gray-600">Eventos realizados</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">+300</div>
              <p className="text-gray-600">Clientes satisfeitos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">+50</div>
              <p className="text-gray-600">Prêmios recebidos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">9,8</div>
              <p className="text-gray-600">Avaliação média</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary-dark text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 font-montserrat">
            Vamos trabalhar juntos?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Entre em contato para conhecer mais sobre como podemos ajudar na organização do seu próximo evento
          </p>
          <Button variant="light" size="lg">
            <Link href="/contato">Fale Conosco</Link>
          </Button>
        </div>
      </section>
    </>
  );
}