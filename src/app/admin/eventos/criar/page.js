'use client';

import React from 'react';
import EventForm from '../components/admin/EventForm';

export default function CriarEventoPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Criar Novo Evento</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <EventForm />
      </div>
    </div>
  );
}