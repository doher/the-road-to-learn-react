import React from 'react';

const InputWithLabel = ({
  id,
  type = 'text',
  value,
  onInputChange,
  children,
}) => (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );

export default InputWithLabel;