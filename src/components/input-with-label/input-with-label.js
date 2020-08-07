import React, { useRef, useEffect } from 'react';

const InputWithLabel = ({
  id,
  type = 'text',
  value,
  isFocused,
  onInputChange,
  children,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
}

export default InputWithLabel;