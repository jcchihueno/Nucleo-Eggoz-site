'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/ui/Button';

export default function ContatosAdmin() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('unread');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/contato?status=${activeTab}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        
        const data = await response.json();
        setContacts(data.contacts || []);
        setLoading(false);
      } catch (err) {
        console.error('Error loading contacts:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchContacts();
  }, [activeTab]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle marking as read
  const handleMarkAsRead = async (id) => {
    try {
      const response = await fetch(`/api/contato/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read: true }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update contact');
      }
      
      // Update contact in state
      setContacts(contacts.map(contact => 
        contact._id === id ? { ...contact, read: true } : contact
      ));
      
      // Update selected contact if it's currently selected
      if (selectedContact && selectedContact._id === id) {
        setSelectedContact({ ...selectedContact, read: true });
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Erro ao marcar mensagem como lida');
    }
  };

  // Handle archiving
  const handleArchive = async (id) => {
    try {
      const response = await fetch(`/api/contato/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ archived: true }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to archive contact');
      }
      
      // Remove contact from list
      setContacts(contacts.filter(contact => contact._id !== id));
      
      // Close detail view if it was selected
      if (selectedContact && selectedContact._id === id) {
        setSelectedContact(null);
      }
    } catch (error) {
      console.error('Error archiving contact:', error);
      alert('Erro ao arquivar mensagem');
    }
  };

  // View contact details
  const viewContactDetails = (contact) => {
    setSelectedContact(contact);
    
    // Mark as read if it's unread
    if (!contact.read) {
      handleMarkAsRead(contact._id);
    }
  };

  // For development/demo until we have actual API
  useEffect(() => {
    // Mock data if no contacts are returned from API
    if (!loading && contacts.length === 0 && !error) {
      const mockContacts = [
        {
          _id: '1',
          name: 'João Silva',
          email: 'joao.silva@empresa.com.br',
          phone: '(11) 98765-4321',
          subject: 'orçamento',
          message: 'Gostaria de solicitar um orçamento para um evento corporativo que estamos planejando para dezembro. Será um evento para 100 pessoas com foco em integração de equipe.',
          createdAt: '2023-07-15T14:30:00',
          read: false,
          archived: false
        },
        {
          _id: '2',
          name: 'Maria Oliveira',
          email: 'maria@consultoria.com',
          phone: '(21) 97654-3210',
          subject: 'evento',
          message: 'Preciso de informações sobre o Workshop de Liderança que será realizado em novembro. Tenho interesse em inscrever 5 colaboradores da minha empresa.',
          createdAt: '2023-07-14T10:15:00',
          read: true,
          archived: false
        },
        {
          _id: '3',
          name: 'Carlos Mendes',
          email: 'carlos@startup.io',
          phone: '(11) 91234-5678',
          subject: 'parceria',
          message: 'Somos uma startup de tecnologia e gostaríamos de conversar sobre possíveis parcerias para eventos do setor tech.',
          createdAt: '2023-07-12T16:45:00',
          read: false,
          archived: false
        }
      ];
      
      // Filter mock contacts based on active tab
      const filteredContacts = mockContacts.filter(contact => {
        if (activeTab === 'unread') return !contact.read && !contact.archived;
        if (activeTab === 'read') return contact.read && !contact.archived;
        if (activeTab === 'archived') return contact.archived;
        return true;
      });
      
      setContacts(filteredContacts);
    }
  }, [loading, contacts.length, error, activeTab]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mensagens de Contato</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left panel - contact list */}
        <div className="md:col-span-1">
          {/* Tabs */}
          <div className="mb-4 border-b">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              <li className="mr-2">
                <button
                  className={`inline-block p-4 rounded-t-lg ${activeTab === 'unread' ? 'border-b-2 border-primary text-primary' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('unread')}
                >
                  Não lidas
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`inline-block p-4 rounded-t-lg ${activeTab === 'read' ? 'border-b-2 border-primary text-primary' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('read')}
                >
                  Lidas
                </button>
              </li>
              <li>
                <button
                  className={`inline-block p-4 rounded-t-lg ${activeTab === 'archived' ? 'border-b-2 border-primary text-primary' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('archived')}
                >
                  Arquivadas
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-primary-dark"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                <p>Erro ao carregar mensagens: {error}</p>
                <button 
                  className="underline mt-2" 
                  onClick={() => window.location.reload()}
                >
                  Tentar novamente
                </button>
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-10 px-4">
                <div className="text-4xl mb-2">📭</div>
                <p className="text-gray-600">
                  {activeTab === 'unread'
                    ? 'Não há novas mensagens para ler.'
                    : activeTab === 'read'
                    ? 'Não há mensagens lidas.'
                    : 'Não há mensagens arquivadas.'}
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <li 
                    key={contact._id}
                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedContact && selectedContact._id === contact._id
                        ? 'bg-blue-50'
                        : ''
                    } ${!contact.read ? 'font-semibold' : ''}`}
                    onClick={() => viewContactDetails(contact)}
                  >
                    <div className="px-4 py-3">
                      <div className="flex justify-between">
                        <p className="text-sm truncate">
                          {contact.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(contact.createdAt)}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 capitalize mb-1">
                        Assunto: {contact.subject}
                      </p>
                      <p className="text-sm text-gray-700 truncate">
                        {contact.message}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Right panel - contact details */}
        <div className="md:col-span-2">
          {selectedContact ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">{selectedContact.name}</h2>
                <div className="space-x-2">
                  {!selectedContact.read && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => handleMarkAsRead(selectedContact._id)}
                    >
                      Marcar como lida
                    </Button>
                  )}
                  {!selectedContact.archived && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleArchive(selectedContact._id)}
                    >
                      Arquivar
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Email:</p>
                    <p className="font-medium">{selectedContact.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Telefone:</p>
                    <p className="font-medium">{selectedContact.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Assunto:</p>
                    <p className="font-medium capitalize">{selectedContact.subject}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Data:</p>
                    <p className="font-medium">{formatDate(selectedContact.createdAt)}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-semibold mb-2">Mensagem:</h3>
                <div className="bg-gray-50 p-4 rounded-md border">
                  {selectedContact.message}
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-md font-semibold mb-2">Resposta Rápida:</h3>
                <div className="space-y-4">
                  <textarea 
                    className="w-full p-3 border rounded-md"
                    rows="4"
                    placeholder="Digite sua resposta..."
                  ></textarea>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      Cancelar
                    </Button>
                    <Button variant="primary" size="sm">
                      Enviar Resposta
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-6xl mb-4">📨</div>
              <h2 className="text-xl font-semibold mb-2">Nenhuma mensagem selecionada</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Selecione uma mensagem da lista para visualizar os detalhes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}