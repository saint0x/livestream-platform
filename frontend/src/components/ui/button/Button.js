import React from 'react';
import './Button.css'; 

const Button = ({ children, variant, onClick }) => {
  const className = `button ${variant}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button; 