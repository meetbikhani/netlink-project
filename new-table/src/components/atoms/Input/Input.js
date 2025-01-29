import React from 'react';
import './Input.css';

const Input = ({ type = 'text', placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      className="atomic-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input; 