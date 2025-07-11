'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from '../components/ui/Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  // Update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Navigation links
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Contato', href: '/contato' },
  ];

  // Check if path is active
  const isActive = (path) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  };

  const headerClass = scrollY > 50 
    ? 'bg-white shadow-md py-2' 
    : 'bg-transparent py-4';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative flex items-center">
            <div className="relative h-12 w-36">
              <Image 
                src="/images/logo.png" 
                alt="Núcleo Eggoz" 
                fill
                className="object-contain" 
                priority
              />
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-300 ${
                  isActive(item.href)
                    ? 'text-primary-dark'
                    : 'text-neutral-dark hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button variant="primary" size="sm">
              <Link href="/contato">Orçamento</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Abrir menu</span>
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 bg-white shadow-lg' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col space-y-4 px-6 py-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`font-medium text-lg py-2 ${
                isActive(item.href)
                  ? 'text-primary-dark'
                  : 'text-neutral-dark'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Button variant="primary" size="sm" fullWidth>
            <Link href="/contato" className="block w-full">Orçamento</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}