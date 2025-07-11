'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import Button from '../components/ui/Button';

async function getEventBySlug(slug) {
  try {
    const response = await fetch(`/api/eventos/${slug}`, { cache: 'no-store' });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

export default function EventoDetalhe() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      const eventData = await getEventBySlug(slug);
      
      if (!eventData) {
        notFound();
      }
      
      setEvent(eventData);
      setLoading(false);
    };
    
    fetchEvent();
  }, [slug]);
  
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-dark"></div>
      </div>
    );
  }
  
  if (!event) {
    return notFound();
  }
  
  // Format date for display
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  // Check if event has already happened
  const isPastEvent = new Date() > eventDate;
  
  return (
    <div className="bg-white">
      {/* Event Hero */}
      <section className="relative h-96 bg-primary-dark">
        <div className="absolute inset-0 z-0 opacity-40">
          {event.image && (
            <Image 
              src={event.image} 
              alt={event.title} 
              fill 
              className="object-cover"
              priority
            />
          )}
        </div>
        <div className="container mx-auto px-6 h-full flex items-center justify-center z-10 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-montserrat-alt mb-4">
              {event.title}
            </h1>
            <div className="inline-block bg-primary-contrast text-primary-dark font-bold py-2 px-6 rounded-md">
              {formattedDate}
            </div>
          </div>
        </div>
      </section>
      
      {/* Event Details */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6 text-primary font-montserrat">Sobre o Evento</h2>
              <div className="prose prose-lg max-w-none">
                <p>{event.description}</p>
              </div>
              
              {event.schedule && event.schedule.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6 text-primary font-montserrat">Programação</h3>
                  <div className="space-y-4">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex border-l-4 border-primary-light pl-4">
                        <div className="mr-6 min-w-[100px]">
                          <span className="font-bold text-primary-light">{item.time}</span>
                        </div>
                        <div>
                          <h4 className="font-bold">{item.title}</h4>
                          {item.speaker && <p className="text-gray-600">{item.speaker}</p>}
                          {item.description && <p className="mt-1">{item.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="bg-neutral-light rounded-lg p-6 h-fit">
              <h3 className="text-xl font-bold mb-4 text-primary">Informações</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="text-primary-dark mr-3">📍</div>
                  <div>
                    <p className="font-semibold">Local</p>
                    <p>{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-primary-dark mr-3">⏰</div>
                  <div>
                    <p className="font-semibold">Data e Hora</p>
                    <p>{formattedDate} às {event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-primary-dark mr-3">👥</div>
                  <div>
                    <p className="font-semibold">Público-alvo</p>
                    <p>{event.audience}</p>
                  </div>
                </div>
                
                {event.price && (
                  <div className="flex items-start">
                    <div className="text-primary-dark mr-3">💲</div>
                    <div>
                      <p className="font-semibold">Investimento</p>
                      <p>{typeof event.price === 'number' ? `R$ ${event.price.toFixed(2)}` : event.price}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {!isPastEvent && (
                <div className="mt-6">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    fullWidth
                  >
                    {event.registrationUrl ? (
                      <Link href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="w-full block">
                        Inscreva-se
                      </Link>
                    ) : (
                      <Link href="/contato" className="w-full block">
                        Fale Conosco
                      </Link>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      {isPastEvent ? (
        <section className="py-12 bg-neutral-light">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Quer ver mais eventos como este?</h3>
              <p className="text-lg mb-6">
                Cadastre-se para receber novidades sobre nossos próximos eventos.
              </p>
              <Button variant="primary" size="lg">
                <Link href="/contato">
                  Entre em contato
                </Link>
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-white">Não perca esta oportunidade</h3>
              <p className="text-lg mb-6 text-white">
                Vagas limitadas. Garanta já a sua participação!
              </p>
              <Button variant="light" size="lg">
                {event.registrationUrl ? (
                  <Link href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                    Inscreva-se agora
                  </Link>
                ) : (
                  <Link href="/contato">
                    Fale Conosco
                  </Link>
                )}
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}