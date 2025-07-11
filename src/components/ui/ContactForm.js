'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm();
  
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitStatus(null);
      
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao enviar formulário');
      }
      
      reset();
      setSubmitStatus({
        success: true,
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus({
        success: false,
        message: 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato por telefone.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">Nome completo</label>
        <input
          id="name"
          type="text"
          className={`w-full p-3 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Seu nome completo"
          {...register('name', { 
            required: 'Nome é obrigatório',
            minLength: { value: 3, message: 'Nome deve ter pelo menos 3 caracteres' }
          })}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      
      {/* Email field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail</label>
        <input
          id="email"
          type="email"
          className={`w-full p-3 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="seu.email@exemplo.com"
          {...register('email', { 
            required: 'E-mail é obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'E-mail inválido'
            }
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      
      {/* Phone field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefone</label>
        <input
          id="phone"
          type="tel"
          className={`w-full p-3 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="(XX) XXXXX-XXXX"
          {...register('phone', { 
            required: 'Telefone é obrigatório',
            pattern: {
              value: /^[0-9\s()-]+$/,
              message: 'Telefone inválido'
            }
          })}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>
      
      {/* Subject field */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">Assunto</label>
        <select
          id="subject"
          className={`w-full p-3 border rounded-md ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
          {...register('subject', { required: 'Selecione um assunto' })}
        >
          <option value="">Selecione um assunto</option>
          <option value="orçamento">Solicitação de orçamento</option>
          <option value="evento">Informações sobre evento</option>
          <option value="parceria">Proposta de parceria</option>
          <option value="outro">Outro assunto</option>
        </select>
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>
      
      {/* Message field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">Mensagem</label>
        <textarea
          id="message"
          rows="5"
          className={`w-full p-3 border rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Digite sua mensagem aqui..."
          {...register('message', { 
            required: 'Mensagem é obrigatória',
            minLength: { value: 10, message: 'A mensagem deve ter pelo menos 10 caracteres' }
          })}
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>
      
      {/* Submit button */}
      <div>
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </Button>
      </div>
      
      {/* Status message */}
      {submitStatus && (
        <div className={`p-4 rounded-md mt-4 ${
          submitStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {submitStatus.message}
        </div>
      )}
    </form>
  );
};

export default ContactForm;