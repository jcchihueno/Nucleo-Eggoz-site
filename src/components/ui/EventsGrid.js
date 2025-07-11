'use client';

import { useState, useEffect } from 'react';
import EventCard from './EventCard';
import Button from './Button';

const EventsGrid = ({ 
  filter = {}, 
  limit, 
  onEventClick 
}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Build query string from filter object
        const queryParams = new URLSearchParams();
        if (filter.status) queryParams.set('status', filter.status);
        if (filter.category) queryParams.set('category', filter.category);
        if (limit) queryParams.set('limit', limit.toString());
        queryParams.set('page', page.toString());
        
        const apiUrl = `/api/eventos?${queryParams.toString()}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();
        
        if (page === 1) {
          setEvents(data);
        } else {
          setEvents(prev => [...prev, ...data]);
        }
        
        // If we got less results than requested, there are no more pages
        setHasMore(data.length === (limit || 10));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, [filter, limit, page]);
  
  // For development/demo until we have actual API
  useEffect(() => {
    // Mock data if no events are returned from API
    if (!loading && events.length === 0 && !error) {
      const mockEvents = [
        {
          id: '1',
          slug: 'congresso-inovacao-empresarial-2024',
          title: 'Congresso de Inovação Empresarial 2024',
          description: 'Um evento para discutir as últimas tendências e práticas inovadoras no ambiente corporativo.',
          date: '2024-08-15',
          time: '09:00',
          location: 'Centro de Convenções, São Paulo',
          image: '/images/events/event1.jpg',
          audience: 'Empresários e gestores',
          status: 'upcoming'
        },
        {
          id: '2',
          slug: 'workshop-lideranca-transformadora',
          title: 'Workshop Liderança Transformadora',
          description: 'Desenvolva habilidades essenciais para líderes que desejam transformar suas equipes e alcançar resultados extraordinários.',
          date: '2023-11-20',
          time: '14:00',
          location: 'Hotel Business Premium, Rio de Janeiro',
          image: '/images/events/event2.jpg',
          audience: 'Líderes e gestores de equipe',
          status: 'past'
        },
        {
          id: '3',
          slug: 'feira-sustentabilidade-corporativa',
          title: 'Feira de Sustentabilidade Corporativa',
          description: 'Conheça as melhores práticas e soluções para tornar sua empresa ambientalmente responsável e economicamente sustentável.',
          date: '2024-09-10',
          time: '10:00',
          location: 'Expo Center Norte, São Paulo',
          image: '/images/events/event3.jpg',
          audience: 'Empresas e profissionais de sustentabilidade',
          status: 'upcoming'
        }
      ];
      
      // Filter mock events based on provided filter
      let filteredEvents = [...mockEvents];
      
      if (filter.status === 'upcoming') {
        filteredEvents = filteredEvents.filter(event => event.status === 'upcoming');
      } else if (filter.status === 'past') {
        filteredEvents = filteredEvents.filter(event => event.status === 'past');
      }
      
      if (limit) {
        filteredEvents = filteredEvents.slice(0, limit);
      }
      
      setEvents(filteredEvents);
    }
  }, [loading, events.length, error, filter, limit]);
  
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Erro ao carregar eventos: {error}</p>
        <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
      </div>
    );
  }
  
  if (loading && events.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-dark"></div>
      </div>
    );
  }
  
  if (!loading && events.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold mb-2">Nenhum evento encontrado</h3>
        <p className="text-gray-600">
          {filter.status === 'upcoming' 
            ? 'Não há próximos eventos agendados no momento.'
            : 'Não foram encontrados eventos passados.'}
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={onEventClick}
          />
        ))}
      </div>
      
      {hasMore && !limit && (
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            onClick={() => setPage(prevPage => prevPage + 1)}
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Carregar mais eventos'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventsGrid;