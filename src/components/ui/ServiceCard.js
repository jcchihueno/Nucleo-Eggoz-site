import React from 'react';
import Link from 'next/link';

const ServiceCard = ({ id, title, description, icon, url = '/servicos' }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="bg-primary-light w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl mb-4">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-primary">{title}</h3>
      
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      
      <Link
        href={url}
        className="text-primary hover:text-primary-dark font-medium mt-auto inline-block"
      >
        Saiba mais
      </Link>
    </div>
  );
};

export default ServiceCard;