import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const EventCard = ({ 
  event, 
  variant = 'vertical', 
  onClick,
  showStatus = true
}) => {
  // Format date for display
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  // Check if event has already happened
  const isPastEvent = new Date() > eventDate;
  
  // Event status
  let statusClass = isPastEvent 
    ? 'bg-gray-500' // Past event
    : 'bg-green-500'; // Upcoming event
    
  if (event.status === 'canceled') {
    statusClass = 'bg-red-500'; // Canceled event
  }
  
  // Event status text
  const statusText = isPastEvent 
    ? 'Realizado' 
    : event.status === 'canceled' ? 'Cancelado' : 'Em breve';
  
  if (variant === 'horizontal') {
    return (
      <div 
        className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={() => onClick && onClick(event)}
      >
        {/* Image */}
        <div className="md:w-2/5 relative h-48 md:h-auto">
          {event.image ? (
            <Image 
              src={event.image} 
              alt={event.title} 
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary-light flex items-center justify-center">
              <span className="text-white text-4xl">📅</span>
            </div>
          )}
          
          {/* Status badge */}
          {showStatus && (
            <div className={`absolute top-4 right-4 ${statusClass} text-white py-1 px-3 rounded-full text-xs font-bold`}>
              {statusText}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="md:w-3/5 p-6 flex flex-col justify-between">
          <div>
            <span className="text-sm font-semibold text-primary-dark">{formattedDate}</span>
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
            <div className="flex items-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">{event.location}</span>
            </div>
          </div>
          <div className="mt-4">
            <Link href={`/eventos/${event.slug}`} className="text-primary font-medium hover:text-primary-dark">
              Ver detalhes
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Default: vertical card
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col"
      onClick={() => onClick && onClick(event)}
    >
      {/* Image */}
      <div className="relative h-48">
        {event.image ? (
          <Image 
            src={event.image} 
            alt={event.title} 
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary-light flex items-center justify-center">
            <span className="text-white text-4xl">📅</span>
          </div>
        )}
        
        {/* Status badge */}
        {showStatus && (
          <div className={`absolute top-4 right-4 ${statusClass} text-white py-1 px-3 rounded-full text-xs font-bold`}>
            {statusText}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <span className="text-sm font-semibold text-primary-dark">{formattedDate}</span>
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{event.description}</p>
        <div className="mt-auto">
          <div className="flex items-center text-gray-600 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{event.location}</span>
          </div>
          <Link href={`/eventos/${event.slug}`} className="text-primary font-medium hover:text-primary-dark">
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;