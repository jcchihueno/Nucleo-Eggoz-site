import React, { useState } from 'react';
import EventsGrid from '@/components/ui/EventsGrid';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Eventos | Núcleo Eggoz',
  description: 'Confira os próximos eventos corporativos e workshops organizados pela Núcleo Eggoz, bem como eventos passados e histórico de realizações.',
};

export default function EventosPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat">Eventos</h1>
            <p className="text-xl mb-0 opacity-90">
              Confira nossa agenda de eventos e fique por dentro das últimas tendências e oportunidades
            </p>
          </div>
        </div>
      </section>

      {/* Events Introduction */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold mb-6 text-primary font-montserrat">
              Experiências que transformam
            </h2>
            <p className="text-lg text-gray-600">
              A Núcleo Eggoz organiza e apoia diversos eventos corporativos ao longo do ano, 
              desde grandes conferências a workshops especializados. Nossos eventos são 
              cuidadosamente planejados para promover conhecimento, networking e 
              desenvolvimento profissional em um ambiente inspirador.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-12 bg-neutral-light">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-primary font-montserrat">
            Próximos Eventos
          </h2>
          <EventsGrid filter={{ status: 'upcoming' }} />
        </div>
      </section>

      {/* Featured Event Banner (if available) */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="bg-primary-contrast text-primary-dark rounded-full px-4 py-1 text-sm font-bold mb-4 inline-block">
                Evento em Destaque
              </span>
              <h2 className="text-3xl font-bold mb-4 font-montserrat">
                Congresso de Inovação Empresarial 2024
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Um evento imperdível para discutir as últimas tendências e práticas inovadoras no ambiente 
                corporativo. Participe e conecte-se com líderes do mercado e especialistas em inovação.
              </p>
              <p className="mb-8">
                <strong>Data:</strong> 15 de agosto de 2024<br />
                <strong>Local:</strong> Centro de Convenções, São Paulo
              </p>
              <Button variant="light" size="lg">
                Saiba mais
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <div className="bg-primary-light h-64 md:h-80 relative">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  📅
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-primary font-montserrat">
            Eventos Realizados
          </h2>
          <EventsGrid filter={{ status: 'past' }} limit={6} />
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary font-montserrat">
              Tipos de Eventos
            </h2>
            <p className="text-lg text-gray-600">
              Organizamos diversos formatos de eventos para atender às diferentes necessidades corporativas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🎤</div>
              <h3 className="text-xl font-bold mb-2 text-primary">Conferências e Congressos</h3>
              <p className="text-gray-600">
                Eventos de grande porte com palestrantes renomados, painéis de discussão e networking entre profissionais do setor.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2 text-primary">Workshops e Treinamentos</h3>
              <p className="text-gray-600">
                Capacitações práticas e imersivas em temas específicos, com foco no desenvolvimento de habilidades profissionais.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2 text-primary">Lançamentos e Apresentações</h3>
              <p className="text-gray-600">
                Eventos estratégicos para lançamento de produtos, serviços ou divulgação de resultados para públicos específicos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 font-montserrat">
              Depoimentos
            </h2>
            <p className="text-lg opacity-90">
              O que participantes dizem sobre nossos eventos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <p className="italic mb-4 opacity-90">
                "Participar do Workshop de Liderança Transformadora foi uma experiência incrível. 
                A organização impecável e o conteúdo de altíssima qualidade fizeram toda diferença no meu desenvolvimento profissional."
              </p>
              <div className="font-bold">Carlos Mendes</div>
              <div className="text-sm opacity-80">Gerente de RH | Empresa ABC</div>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <p className="italic mb-4 opacity-90">
                "O Congresso de Inovação organizado pela Núcleo Eggoz superou todas as expectativas. 
                Os palestrantes, o networking e toda a estrutura contribuíram para uma experiência realmente transformadora."
              </p>
              <div className="font-bold">Mariana Costa</div>
              <div className="text-sm opacity-80">Diretora de Inovação | StartupTech</div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary font-montserrat">
              Fique por dentro
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Cadastre-se para receber em primeira mão informações sobre nossos próximos eventos
            </p>
            
            <div className="max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  className="flex-grow p-3 border border-gray-300 rounded-md"
                  required
                />
                <Button variant="primary">
                  Inscrever-se
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                Respeitamos sua privacidade. Você pode cancelar a inscrição a qualquer momento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary-dark text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 font-montserrat">
            Tem um evento em mente?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Entre em contato conosco e vamos transformar sua ideia em um evento memorável
          </p>
          <Button variant="light" size="lg">
            Solicitar Orçamento
          </Button>
        </div>
      </section>
    </>
  );
}