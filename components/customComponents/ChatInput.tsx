import React, { useEffect, useState } from 'react';

type CustomInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  hasMin?: boolean;
  hasMax?: boolean;
  initialValue?: string;
  disabled?: boolean;
  customClass?: string;
  onReset?: boolean;
};

const CustomInput = ({
  name,
  label,
  placeholder,
  required,
  type,
  hasMax,
  hasMin,
  initialValue,
  disabled,
  customClass,
  onReset,
}: CustomInputProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue('');
  }, [onReset]);

  return (
    <>
      <label className="text-secondary">{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value || ''}
        onChange={handleChange}
        min={hasMin ? new Date().getFullYear() - 100 : undefined} // Optional: Adjust the range of years
        max={hasMax ? new Date().getFullYear() - 18 : undefined} // Optional: Adjust the range of years
        className={customClass || `w-full ${value ? 'text-secondary' : 'text-secondary'}`}
        disabled={disabled}
      />
    </>
  );
};

export default CustomInput;
