import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  type = 'button',
  className = '',
  onClick,
  ...props
}) => {
  // Button variants
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark',
    light: 'bg-primary-contrast text-primary-dark hover:bg-white',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'bg-transparent text-primary hover:bg-neutral-light'
  };
  
  // Button sizes
  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        font-medium rounded-md transition-colors duration-300
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;