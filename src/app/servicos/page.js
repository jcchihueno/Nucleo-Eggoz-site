import Image from 'next/image';
import Link from 'next/link';
import Button from '../components/ui/Button';

export const metadata = {
  title: 'Serviços | Núcleo Eggoz',
  description: 'Conheça nossos serviços especializados em organização de eventos corporativos, incluindo conferências, workshops, eventos solidários e mais.',
};

export default function ServicosPage() {
  // Services data
  const services = [
    {
      id: 'eventos-corporativos',
      title: 'Eventos Corporativos',
      description: 'Projetamos e executamos eventos empresariais completos, desde pequenas reuniões executivas até grandes conferências e convenções.',
      details: 'Nossa equipe especializada cuida de todos os detalhes, desde o planejamento estratégico, escolha de local, gestão de fornecedores, até a execução impecável no dia do evento. Garantimos que cada aspecto esteja alinhado com os objetivos da sua empresa e com a experiência desejada para os participantes.',
      image: '/images/services/eventos-corporativos.jpg',
      features: [
        'Conferências e congressos',
        'Convenções de vendas',
        'Lançamentos de produtos',
        'Reuniões de liderança',
        'Workshops e treinamentos',
        'Eventos de integração'
      ]
    },
    {
      id: 'eventos-solidarios',
      title: 'Eventos Solidários',
      description: 'Organizamos ações de responsabilidade social corporativa que fortalecem a imagem da sua empresa enquanto geram um impacto positivo na sociedade.',
      details: 'Desenvolvemos eventos solidários que conectam sua marca com causas sociais relevantes, criando experiências significativas para colaboradores e comunidade. Nosso trabalho inclui desde o conceito e planejamento até parcerias com ONGs, gestão de doações e mensuração de resultados.',
      image: '/images/services/eventos-solidarios.jpg',
      features: [
        'Ações de voluntariado corporativo',
        'Campanhas de arrecadação',
        'Eventos beneficentes',
        'Team building social',
        'Parcerias com ONGs',
        'Relatórios de impacto social'
      ]
    },
    {
      id: 'protocolo-executivo',
      title: 'Protocolo Executivo',
      description: 'Oferecemos serviços especializados de protocolo e cerimonial para eventos executivos de alto nível, garantindo formalidade e elegância.',
      details: 'Nossa equipe de especialistas em protocolo garante que todos os aspectos formais do seu evento executivo sejam conduzidos com excelência e refinamento. Cuidamos da etiqueta corporativa, precedência, cerimonial e todos os detalhes que conferem sofisticação a encontros de alto nível.',
      image: '/images/services/protocolo-executivo.jpg',
      features: [
        'Assessoria em etiqueta corporativa',
        'Cerimonial completo',
        'Gestão de precedência',
        'Recepção VIP',
        'Coordenação de autoridades',
        'Treinamento de equipe'
      ]
    },
    {
      id: 'coffee-break',
      title: 'Coffee Break',
      description: 'Serviço de alimentação personalizado para eventos corporativos, com opções para todos os tipos de ocasião e necessidades dietéticas.',
      details: 'Oferecemos uma experiência gastronômica de qualidade que complementa perfeitamente seu evento corporativo. Nossos serviços incluem desde coffee breaks simples até refeições completas, sempre com apresentação impecável, serviço profissional e atenção a restrições alimentares.',
      image: '/images/services/coffee-break.jpg',
      features: [
        'Coffee breaks personalizados',
        'Almoços e jantares executivos',
        'Coquetéis e recepções',
        'Opções para restrições alimentares',
        'Serviço de bar',
        'Apresentação diferenciada'
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat">Nossos Serviços</h1>
            <p className="text-xl mb-0 opacity-90">
              Soluções completas e personalizadas para todos os tipos de eventos corporativos
            </p>
          </div>
        </div>
      </section>

      {/* Services Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary font-montserrat">
              Excelência em cada detalhe
            </h2>
            <p className="text-lg text-gray-600">
              Na Núcleo Eggoz, oferecemos serviços completos de organização de eventos corporativos, 
              com soluções personalizadas que atendem às necessidades específicas da sua empresa. 
              Nossa abordagem estratégica garante que cada evento gere resultados tangíveis e 
              experiências memoráveis para todos os participantes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🔍
              </div>
              <h3 className="font-bold">Planejamento</h3>
            </div>
            <div className="text-center">
              <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl mx-auto mb-4">
                📝
              </div>
              <h3 className="font-bold">Organização</h3>
            </div>
            <div className="text-center">
              <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🚀
              </div>
              <h3 className="font-bold">Execução</h3>
            </div>
            <div className="text-center">
              <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl mx-auto mb-4">
                📊
              </div>
              <h3 className="font-bold">Resultados</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary font-montserrat">
            Conheça nossos serviços
          </h2>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div 
                key={service.id}
                id={service.id} 
                className={`bg-white rounded-lg shadow-md overflow-hidden ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <Image 
                      src={service.image}
                      alt={service.title} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 text-primary">{service.title}</h3>
                    <p className="font-medium text-lg mb-4">{service.description}</p>
                    <p className="mb-6 text-gray-600">{service.details}</p>

                    <h4 className="font-semibold mb-3">O que oferecemos:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <svg className="h-5 w-5 text-primary-light mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary font-montserrat">
              Nosso processo
            </h2>
            <p className="text-lg text-gray-600">
              Seguimos uma metodologia estruturada que garante resultados excelentes em cada projeto
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-neutral-light p-6 rounded-lg relative">
                <div className="bg-primary-dark text-white rounded-full w-10 h-10 flex items-center justify-center font-bold absolute -top-3 -left-3">1</div>
                <h3 className="text-xl font-bold mb-3 text-primary">Briefing e Diagnóstico</h3>
                <p className="text-gray-600">
                  Entendemos profundamente as necessidades da sua empresa e os objetivos específicos do evento, realizando um diagnóstico completo para orientar o planejamento estratégico.
                </p>
              </div>
              
              <div className="bg-neutral-light p-6 rounded-lg relative">
                <div className="bg-primary-dark text-white rounded-full w-10 h-10 flex items-center justify-center font-bold absolute -top-3 -left-3">2</div>
                <h3 className="text-xl font-bold mb-3 text-primary">Planejamento Estratégico</h3>
                <p className="text-gray-600">
                  Desenvolvemos um plano detalhado incluindo conceito, local, fornecedores, programação, orçamento e cronograma, sempre alinhados aos objetivos definidos.
                </p>
              </div>
              
              <div className="bg-neutral-light p-6 rounded-lg relative">
                <div className="bg-primary-dark text-white rounded-full w-10 h-10 flex items-center justify-center font-bold absolute -top-3 -left-3">3</div>
                <h3 className="text-xl font-bold mb-3 text-primary">Coordenação e Produção</h3>
                <p className="text-gray-600">
                  Gerenciamos todos os aspectos operacionais, fornecedores e detalhes logísticos, garantindo que cada elemento do evento esteja perfeitamente integrado.
                </p>
              </div>
              
              <div className="bg-neutral-light p-6 rounded-lg relative">
                <div className="bg-primary-dark text-white rounded-full w-10 h-10 flex items-center justify-center font-bold absolute -top-3 -left-3">4</div>
                <h3 className="text-xl font-bold mb-3 text-primary">Execução e Acompanhamento</h3>
                <p className="text-gray-600">
                  No dia do evento, nossa equipe coordena cada detalhe, solucionando imprevistos e garantindo que tudo ocorra conforme o planejado, com excelência.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-neutral-light p-6 rounded-lg inline-block relative">
                <div className="bg-primary-dark text-white rounded-full w-10 h-10 flex items-center justify-center font-bold absolute -top-3 left-1/2 -translate-x-1/2">5</div>
                <h3 className="text-xl font-bold mb-3 text-primary">Avaliação e Resultados</h3>
                <p className="text-gray-600 max-w-md">
                  Após o evento, realizamos uma análise detalhada dos resultados, métricas e feedback, fornecendo relatórios e identificando oportunidades de melhoria para futuros eventos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Types */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 font-montserrat">
              Para quem são nossos serviços
            </h2>
            <p className="text-lg opacity-90">
              Atendemos empresas de todos os portes e segmentos que buscam excelência em seus eventos corporativos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-2">Grandes Corporações</h3>
              <p className="opacity-90">
                Para empresas que necessitam de eventos de grande porte, com logística complexa e altos padrões de qualidade e segurança.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Empresas em Crescimento</h3>
              <p className="opacity-90">
                Para negócios em expansão que buscam eventos estratégicos para fortalecer sua marca, treinar equipes ou lançar novos produtos.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold mb-2">Startups e Pequenas Empresas</h3>
              <p className="opacity-90">
                Para empreendedores que desejam realizar eventos impactantes mesmo com orçamentos mais enxutos, maximizando resultados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary font-montserrat">
              Perguntas Frequentes
            </h2>

            <div className="space-y-6">
              <div className="bg-neutral-light rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Qual a antecedência ideal para contratar seus serviços?</h3>
                <p>
                  Recomendamos um prazo mínimo de 60 dias para eventos de pequeno porte e 120 dias para eventos maiores ou mais complexos. No entanto, também trabalhamos com demandas urgentes quando possível.
                </p>
              </div>
              
              <div className="bg-neutral-light rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Vocês atendem em outras cidades além de São Paulo?</h3>
                <p>
                  Sim, atendemos em todo o Brasil. Nossa sede fica em São Paulo, mas temos parceiros locais em diversas cidades para garantir a qualidade dos nossos serviços em qualquer localização.
                </p>
              </div>
              
              <div className="bg-neutral-light rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Como é feito o orçamento para um evento?</h3>
                <p>
                  Cada evento é único, portanto, desenvolvemos orçamentos personalizados com base nos objetivos, número de participantes, localização, duração, serviços incluídos e nível de sofisticação desejado.
                </p>
              </div>
              
              <div className="bg-neutral-light rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Vocês cuidam de toda a infraestrutura técnica do evento?</h3>
                <p>
                  Sim, gerenciamos todos os aspectos técnicos, incluindo som, iluminação, projeção, transmissão ao vivo, tradução simultânea e qualquer outra necessidade tecnológica do seu evento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary-dark text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 font-montserrat">
            Pronto para criar um evento memorável?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Entre em contato conosco para uma consulta gratuita sobre seu próximo evento corporativo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="light" size="lg">
              <Link href="/contato">Solicitar Orçamento</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href="/eventos">Ver Nossos Eventos</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}