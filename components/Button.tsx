import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'text';
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  href, 
  className = '',
  icon = true 
}) => {
  const baseStyles = "inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-300 group";
  
  const variants = {
    primary: "bg-accent text-black hover:bg-white hover:scale-105",
    outline: "border border-white/20 text-white hover:border-accent hover:text-accent bg-transparent",
    text: "text-white hover:text-accent p-0"
  };

  const content = (
    <>
      <span>{children}</span>
      {icon && <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {content}
    </button>
  );
};