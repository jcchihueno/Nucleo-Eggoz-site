'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function EventosAdmin() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/eventos');
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading events:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Function to handle event deletion
  const handleDeleteEvent = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este evento?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/eventos/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      
      // Remove the event from the state
      setEvents(events.filter(event => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Erro ao excluir evento: ' + error.message);
    }
  };
  
  // Filter events based on active tab
  const filteredEvents = events.filter(event => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return event.status === 'upcoming';
    if (activeTab === 'past') return event.status === 'past';
    if (activeTab === 'canceled') return event.status === 'canceled';
    return true;
  });
  
  // For development/demo until we have actual API
  useEffect(() => {
    // Mock data if no events are returned from API
    if (!loading && events.length === 0 && !error) {
      const mockEvents = [
        {
          _id: '1',
          slug: 'congresso-inovacao-empresarial-2024',
          title: 'Congresso de Inovação Empresarial 2024',
          date: '2024-08-15',
          location: 'Centro de Convenções, São Paulo',
          status: 'upcoming',
          featured: true
        },
        {
          _id: '2',
          slug: 'workshop-lideranca-transformadora',
          title: 'Workshop Liderança Transformadora',
          date: '2023-11-20',
          location: 'Hotel Business Premium, Rio de Janeiro',
          status: 'past',
          featured: false
        },
        {
          _id: '3',
          slug: 'feira-sustentabilidade-corporativa',
          title: 'Feira de Sustentabilidade Corporativa',
          date: '2024-09-10',
          location: 'Expo Center Norte, São Paulo',
          status: 'upcoming',
          featured: true
        }
      ];
      
      setEvents(mockEvents);
    }
  }, [loading, events.length, error]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Eventos</h1>
        <Link href="/admin/eventos/criar">
          <Button variant="primary">Criar Novo Evento</Button>
        </Link>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${activeTab === 'all' ? 'border-b-2 border-primary text-primary' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
              onClick={() => setActiveTab('all')}
            >
              Todos
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${activeTab === 'upcoming' ? 'border-b-2 border-primary text-primary' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Próximos
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${activeTab === 'past' ? 'border-b-2 border-primary text-primary' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
              onClick={() => setActiveTab('past')}
            >
              Realizados
            </button>
          </li>
          <li>
            <button
              className={`inline-block p-4 rounded-t-lg ${activeTab === 'canceled' ? 'border-b-2 border-primary text-primary' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
              onClick={() => setActiveTab('canceled')}
            >
              Cancelados
            </button>
          </li>
        </ul>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-dark"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>Erro ao carregar eventos: {error}</p>
          <button 
            className="underline mt-2" 
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-lg text-gray-600 mb-4">
            Nenhum evento {activeTab === 'all' ? '' : activeTab === 'upcoming' ? 'próximo' : activeTab === 'past' ? 'realizado' : 'cancelado'} encontrado
          </p>
          <Link href="/admin/eventos/criar">
            <Button variant="primary">Criar Novo Evento</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Evento
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Local
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destaque
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{event.title}</div>
                    <div className="text-sm text-gray-500">{event.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(event.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 
                        event.status === 'past' ? 'bg-gray-100 text-gray-800' : 
                        'bg-red-100 text-red-800'}`}
                    >
                      {event.status === 'upcoming' ? 'Próximo' : 
                       event.status === 'past' ? 'Realizado' : 'Cancelado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.featured ? (
                      <span className="text-green-600">Sim</span>
                    ) : (
                      <span className="text-gray-400">Não</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Link href={`/eventos/${event.slug}`} target="_blank" className="text-primary hover:text-primary-dark">
                      Ver
                    </Link>
                    <Link href={`/admin/eventos/editar/${event._id}`} className="text-indigo-600 hover:text-indigo-900">
                      Editar
                    </Link>
                    <button 
                      onClick={() => handleDeleteEvent(event._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}