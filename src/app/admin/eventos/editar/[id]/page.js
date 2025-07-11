'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import EventForm from '../components/admin/EventForm';

export default function EditEventPage() {
  const router = useRouter();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/eventos/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        
        const eventData = await response.json();
        setEvent(eventData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading event:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [id]);

  // For development/demo until we have actual API
  useEffect(() => {
    // Mock data if no event is returned from API
    if (!loading && !event && !error) {
      const mockEvent = {
        _id: id,
        title: 'Congresso de Inovação Empresarial 2024',
        slug: 'congresso-inovacao-empresarial-2024',
        description: 'Um evento para discutir as últimas tendências e práticas inovadoras no ambiente corporativo.',
        date: '2024-08-15',
        time: '09:00',
        location: 'Centro de Convenções, São Paulo',
        audience: 'Empresários e gestores',
        image: '/images/events/event1.jpg',
        capacity: 200,
        price: 'R$ 490,00',
        status: 'upcoming',
        featured: true,
        registrationUrl: 'https://exemplo.com/inscricao',
        schedule: [
          {
            time: '09:00 - 10:00',
            title: 'Abertura',
            speaker: 'Ana Paula Santos',
            description: 'Boas-vindas e apresentação dos temas do evento'
          },
          {
            time: '10:00 - 12:00',
            title: 'Painel: Inovação em Tempos de Crise',
            speaker: 'Carlos Mendes, Maria Silva e João Oliveira',
            description: 'Debate sobre estratégias inovadoras para superar momentos desafiadores no mercado'
          },
          {
            time: '13:30 - 15:00',
            title: 'Workshop: Design Thinking na Prática',
            speaker: 'Camila Ferreira',
            description: 'Workshop prático sobre aplicação de metodologias ágeis na resolução de problemas'
          }
        ]
      };
      
      setEvent(mockEvent);
    }
  }, [loading, event, error, id]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-dark"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Erro ao carregar evento</h1>
        <p>{error}</p>
        <button 
          className="mt-4 bg-primary text-white px-4 py-2 rounded-md"
          onClick={() => router.push('/admin/eventos')}
        >
          Voltar para lista de eventos
        </button>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="bg-amber-50 border border-amber-200 text-amber-700 px-6 py-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Evento não encontrado</h1>
        <p>O evento solicitado não existe ou foi removido.</p>
        <button 
          className="mt-4 bg-primary text-white px-4 py-2 rounded-md"
          onClick={() => router.push('/admin/eventos')}
        >
          Voltar para lista de eventos
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Editar Evento</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <EventForm event={event} />
      </div>
    </div>
  );
}