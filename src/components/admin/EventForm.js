'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

const EventForm = ({ event = null }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [scheduleItems, setScheduleItems] = useState([]);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      title: event?.title || '',
      slug: event?.slug || '',
      description: event?.description || '',
      date: event?.date ? new Date(event.date).toISOString().split('T')[0] : '',
      time: event?.time || '',
      location: event?.location || '',
      audience: event?.audience || '',
      image: event?.image || '',
      capacity: event?.capacity || 0,
      price: event?.price || 0,
      status: event?.status || 'upcoming',
      featured: event?.featured || false,
      registrationUrl: event?.registrationUrl || '',
      schedule: event?.schedule || []
    }
  });
  
  // Initialize schedule items if editing an event
  useEffect(() => {
    if (event && event.schedule && event.schedule.length > 0) {
      setScheduleItems(event.schedule);
    } else {
      // Add an empty schedule item by default
      setScheduleItems([{ time: '', title: '', speaker: '', description: '' }]);
    }
  }, [event]);
  
  // Watch for image changes
  const imageFile = watch('imageFile');
  
  // Update image preview when file is selected
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      fileReader.readAsDataURL(imageFile[0]);
    }
  }, [imageFile]);
  
  // Initialize image preview if editing an event
  useEffect(() => {
    if (event && event.image) {
      setImagePreview(event.image);
    }
  }, [event]);
  
  // Add a new schedule item
  const addScheduleItem = () => {
    setScheduleItems([...scheduleItems, { time: '', title: '', speaker: '', description: '' }]);
  };
  
  // Remove a schedule item
  const removeScheduleItem = (index) => {
    const newItems = [...scheduleItems];
    newItems.splice(index, 1);
    setScheduleItems(newItems);
  };
  
  // Update a schedule item
  const handleScheduleItemChange = (index, field, value) => {
    const newItems = [...scheduleItems];
    newItems[index][field] = value;
    setScheduleItems(newItems);
  };
  
  // Generate slug from title
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setValue('title', title);
    
    // Only auto-generate slug if it's a new event or slug hasn't been modified
    if (!event || !event.slug) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
      setValue('slug', slug);
    }
  };
  
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Add schedule items to the data
      data.schedule = scheduleItems;
      
      // Handle image upload - in a real implementation, this would upload to a storage service
      // For now, we'll just use the image preview or existing URL
      if (imagePreview && !imagePreview.startsWith('http')) {
        data.image = imagePreview;
      }
      
      // Determine if we're creating or updating an event
      const url = event ? `/api/eventos/${event._id}` : '/api/eventos';
      const method = event ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao salvar evento');
      }
      
      // Redirect to the events list page
      router.push('/admin/eventos');
      
    } catch (error) {
      console.error('Error submitting event:', error);
      alert(`Erro: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title and Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Título do Evento</label>
          <input
            id="title"
            type="text"
            className={`w-full p-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            {...register('title', { 
              required: 'Título é obrigatório',
              onChange: handleTitleChange
            })}
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
        </div>
        
        <div>
          <label htmlFor="slug" className="block text-sm font-medium mb-1">Slug (URL)</label>
          <input
            id="slug"
            type="text"
            className={`w-full p-2 border rounded-md ${errors.slug ? 'border-red-500' : 'border-gray-300'}`}
            {...register('slug', { 
              required: 'Slug é obrigatório',
              pattern: {
                value: /^[a-z0-9-]+$/,
                message: 'Slug deve conter apenas letras minúsculas, números e hífens'
              }
            })}
          />
          {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug.message}</p>}
          <p className="mt-1 text-xs text-gray-500">URL amigável (exemplo: workshop-lideranca-2024)</p>
        </div>
      </div>
      
      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">Descrição</label>
        <textarea
          id="description"
          rows="5"
          className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          {...register('description', { required: 'Descrição é obrigatória' })}
        ></textarea>
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
      </div>
      
      {/* Date and Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">Data</label>
          <input
            id="date"
            type="date"
            className={`w-full p-2 border rounded-md ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
            {...register('date', { required: 'Data é obrigatória' })}
          />
          {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>}
        </div>
        
        <div>
          <label htmlFor="time" className="block text-sm font-medium mb-1">Horário</label>
          <input
            id="time"
            type="time"
            className={`w-full p-2 border rounded-md ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
            {...register('time', { required: 'Horário é obrigatório' })}
          />
          {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>}
        </div>
      </div>
      
      {/* Location and Audience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">Local</label>
          <input
            id="location"
            type="text"
            className={`w-full p-2 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
            {...register('location', { required: 'Local é obrigatório' })}
          />
          {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>}
        </div>
        
        <div>
          <label htmlFor="audience" className="block text-sm font-medium mb-1">Público-alvo</label>
          <input
            id="audience"
            type="text"
            className={`w-full p-2 border rounded-md ${errors.audience ? 'border-red-500' : 'border-gray-300'}`}
            {...register('audience', { required: 'Público-alvo é obrigatório' })}
          />
          {errors.audience && <p className="mt-1 text-sm text-red-500">{errors.audience.message}</p>}
        </div>
      </div>
      
      {/* Image */}
      <div>
        <label htmlFor="imageFile" className="block text-sm font-medium mb-1">Imagem do Evento</label>
        <input
          id="imageFile"
          type="file"
          accept="image/*"
          className={`w-full p-2 border rounded-md ${errors.imageFile ? 'border-red-500' : 'border-gray-300'}`}
          {...register('imageFile')}
        />
        {errors.imageFile && <p className="mt-1 text-sm text-red-500">{errors.imageFile.message}</p>}
        
        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-2">
            <p className="text-sm font-medium mb-1">Preview:</p>
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="h-40 object-cover rounded-md"
            />
          </div>
        )}
      </div>
      
      {/* Capacity and Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium mb-1">Capacidade</label>
          <input
            id="capacity"
            type="number"
            min="0"
            className="w-full p-2 border rounded-md border-gray-300"
            {...register('capacity', { valueAsNumber: true })}
          />
          <p className="mt-1 text-xs text-gray-500">Deixe 0 para capacidade ilimitada</p>
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">Preço (R$)</label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            className="w-full p-2 border rounded-md border-gray-300"
            {...register('price', { valueAsNumber: true })}
          />
          <p className="mt-1 text-xs text-gray-500">Deixe 0 para eventos gratuitos</p>
        </div>
      </div>
      
      {/* Registration URL */}
      <div>
        <label htmlFor="registrationUrl" className="block text-sm font-medium mb-1">URL de Inscrição (opcional)</label>
        <input
          id="registrationUrl"
          type="url"
          className="w-full p-2 border rounded-md border-gray-300"
          {...register('registrationUrl')}
        />
        <p className="mt-1 text-xs text-gray-500">Link para formulário de inscrição externo (se houver)</p>
      </div>
      
      {/* Status and Featured */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
          <select
            id="status"
            className="w-full p-2 border rounded-md border-gray-300"
            {...register('status')}
          >
            <option value="upcoming">Próximo</option>
            <option value="past">Realizado</option>
            <option value="canceled">Cancelado</option>
          </select>
        </div>
        
        <div className="flex items-center h-full pt-6">
          <input
            id="featured"
            type="checkbox"
            className="w-4 h-4 text-primary-dark focus:ring-primary-dark rounded"
            {...register('featured')}
          />
          <label htmlFor="featured" className="ml-2 text-sm font-medium">Evento em destaque</label>
        </div>
      </div>
      
      {/* Schedule */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">Programação</label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={addScheduleItem}
          >
            Adicionar Item
          </Button>
        </div>
        
        <div className="space-y-4 border rounded-md p-4 bg-gray-50">
          {scheduleItems.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum item na programação</p>
          ) : (
            scheduleItems.map((item, index) => (
              <div key={index} className="border p-4 rounded-md bg-white relative">
                <button
                  type="button"
                  onClick={() => removeScheduleItem(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">Horário</label>
                    <input
                      type="text"
                      value={item.time}
                      onChange={(e) => handleScheduleItemChange(index, 'time', e.target.value)}
                      className="w-full p-2 border rounded-md border-gray-300"
                      placeholder="Ex: 10:00 - 11:30"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium mb-1">Título</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleScheduleItemChange(index, 'title', e.target.value)}
                      className="w-full p-2 border rounded-md border-gray-300"
                      placeholder="Ex: Palestra de Abertura"
                    />
                  </div>
                </div>
                
                <div className="mt-3">
                  <label className="block text-xs font-medium mb-1">Palestrante</label>
                  <input
                    type="text"
                    value={item.speaker}
                    onChange={(e) => handleScheduleItemChange(index, 'speaker', e.target.value)}
                    className="w-full p-2 border rounded-md border-gray-300"
                    placeholder="Ex: Dr. João Silva"
                  />
                </div>
                
                <div className="mt-3">
                  <label className="block text-xs font-medium mb-1">Descrição</label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleScheduleItemChange(index, 'description', e.target.value)}
                    className="w-full p-2 border rounded-md border-gray-300"
                    rows="2"
                    placeholder="Breve descrição da atividade"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push('/admin/eventos')}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : event ? 'Atualizar Evento' : 'Criar Evento'}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;