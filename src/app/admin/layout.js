'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '../components/layout/AdminSidebar';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-dark"></div>
      </div>
    );
  }
  
  // If not authenticated, show minimal layout (actual redirect happens in useEffect)
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Redirecionando para o login...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-primary-dark mx-auto"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top header */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            className="mr-4 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          {/* Logo */}
          <Link href="/admin" className="flex items-center">
            <div className="relative h-10 w-32">
              <Image 
                src="/images/logo.png" 
                alt="Núcleo Eggoz" 
                fill
                className="object-contain" 
              />
            </div>
            <span className="ml-2 font-semibold text-lg hidden sm:inline">Admin</span>
          </Link>
        </div>
        
        {/* User profile */}
        <div className="flex items-center">
          <div className="hidden md:block mr-4 text-right">
            <p className="font-medium">{session?.user?.name || 'Administrador'}</p>
            <p className="text-sm text-gray-500">{session?.user?.email || ''}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary-light text-white flex items-center justify-center">
            {session?.user?.name?.charAt(0) || 'A'}
          </div>
        </div>
      </header>
      
      <div className="flex">
        {/* Sidebar - desktop version always visible, mobile version conditionally shown */}
        <div className={`
          ${isMobileMenuOpen ? 'block' : 'hidden'} 
          md:block fixed md:static top-16 left-0 h-[calc(100vh-4rem)] md:h-auto z-30
          w-64 bg-white shadow-md overflow-y-auto transition-all duration-300
        `}>
          <AdminSidebar />
        </div>
        
        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}