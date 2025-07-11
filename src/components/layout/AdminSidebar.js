'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  // Navigation items
  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: 'Eventos',
      href: '/admin/eventos',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      children: [
        { name: 'Todos os Eventos', href: '/admin/eventos' },
        { name: 'Criar Evento', href: '/admin/eventos/criar' }
      ]
    },
    {
      name: 'Contatos',
      href: '/admin/contatos',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];
  
  // Keep track of expanded menu items
  const [expandedItems, setExpandedItems] = useState({});
  
  // Toggle submenu
  const toggleSubMenu = (itemName) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };
  
  // Check if path is active
  const isActive = (path) => {
    if (path === '/admin' && pathname !== '/admin') return false;
    return pathname === path || pathname.startsWith(`${path}/`);
  };
  
  // Expand menu items based on current path on first render
  useEffect(() => {
    const newExpandedItems = {};
    
    navItems.forEach(item => {
      if (item.children && item.children.some(child => isActive(child.href))) {
        newExpandedItems[item.name] = true;
      }
    });
    
    setExpandedItems(newExpandedItems);
  }, []);
  
  return (
    <div className="py-6">
      <div className="px-6 mb-8">
        <p className="text-sm uppercase font-bold text-gray-400 tracking-wider">
          Administração
        </p>
      </div>
      
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isItemActive = isActive(item.href);
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems[item.name];
          
          return (
            <div key={item.name}>
              {hasChildren ? (
                <button
                  onClick={() => toggleSubMenu(item.name)}
                  className={`w-full flex items-center justify-between px-6 py-3 text-left ${
                    isItemActive
                      ? 'bg-primary-light text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center px-6 py-3 ${
                    isItemActive
                      ? 'bg-primary-light text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              )}
              
              {/* Submenu */}
              {hasChildren && isExpanded && (
                <div className="bg-gray-50 pl-10 pr-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className={`flex items-center py-2 pl-6 text-sm ${
                        isActive(child.href)
                          ? 'text-primary-dark font-medium'
                          : 'text-gray-600 hover:text-primary'
                      }`}
                    >
                      <span className="mr-2">•</span>
                      <span>{child.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      
      <div className="border-t border-gray-200 mt-8 pt-4 px-6">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}