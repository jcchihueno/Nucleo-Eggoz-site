'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

// Admin dashboard summary card component
const DashboardCard = ({ title, value, icon, color, linkTo }) => (
  <Link href={linkTo} className="block">
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 ${color}`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className={`text-${color.replace('border-', '')} text-3xl`}>
          {icon}
        </div>
      </div>
    </div>
  </Link>
);

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState({
    events: {
      total: 0,
      upcoming: 0,
    },
    contacts: {
      total: 0,
      unread: 0,
    }
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, you'd fetch this data from your API
        // For now, we'll use mock data since the API routes aren't fully implemented yet
        
        // This would be the actual API call:
        // const response = await fetch('/api/admin/dashboard-summary');
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockData = {
          events: {
            total: 8,
            upcoming: 3,
          },
          contacts: {
            total: 25,
            unread: 4,
          }
        };
        
        setDashboardData(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-dark"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Bem-vindo(a), {session?.user?.name || 'Administrador'}!</h2>
        <p className="text-gray-600">
          Este é o painel administrativo do site Núcleo Eggoz. 
          Aqui você pode gerenciar eventos, contatos e configurações do site.
        </p>
      </div>
      
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Total de Eventos" 
          value={dashboardData.events.total} 
          icon="📅" 
          color="border-blue-500" 
          linkTo="/admin/eventos"
        />
        <DashboardCard 
          title="Próximos Eventos" 
          value={dashboardData.events.upcoming} 
          icon="🗓️" 
          color="border-green-500" 
          linkTo="/admin/eventos"
        />
        <DashboardCard 
          title="Total de Contatos" 
          value={dashboardData.contacts.total} 
          icon="📋" 
          color="border-purple-500" 
          linkTo="/admin/contatos"
        />
        <DashboardCard 
          title="Contatos Não Lidos" 
          value={dashboardData.contacts.unread} 
          icon="📧" 
          color="border-amber-500" 
          linkTo="/admin/contatos"
        />
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/eventos/criar" className="bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-md text-center transition-colors duration-300">
              Criar Novo Evento
            </Link>
            <Link href="/admin/contatos" className="bg-secondary hover:bg-secondary-dark text-white py-3 px-4 rounded-md text-center transition-colors duration-300">
              Ver Mensagens
            </Link>
            <Link href="/" target="_blank" className="bg-gray-700 hover:bg-gray-800 text-white py-3 px-4 rounded-md text-center transition-colors duration-300">
              Visualizar Site
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Atividade Recente</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p>
                  <span className="font-medium">Evento Criado</span>: Congresso de Inovação Empresarial 2024
                </p>
                <p className="text-sm text-gray-500">3 horas atrás</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="rounded-full bg-green-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p>
                  <span className="font-medium">Novo Contato</span>: Empresa ABC solicitou orçamento para workshop
                </p>
                <p className="text-sm text-gray-500">6 horas atrás</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="rounded-full bg-amber-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p>
                  <span className="font-medium">Evento Atualizado</span>: Alteração de data na Feira de Sustentabilidade
                </p>
                <p className="text-sm text-gray-500">12 horas atrás</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}