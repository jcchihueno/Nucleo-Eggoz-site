import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Núcleo Eggoz | Soluções completas em organização de eventos',
  description: 'Empresa especializada em organização de eventos corporativos com soluções completas e personalizadas.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Montserrat+Alternates:wght@400;500;700&family=Exo:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col font-montserrat">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}