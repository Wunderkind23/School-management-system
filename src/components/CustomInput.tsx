import React, { type ChangeEvent } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
  label?: string;
  name?: string;
  rows?: number;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  label,
  name,
  rows = 5,
  ...rest
}) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm mb-1">{label}</label>}
      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          className="w-full p-2 border rounded-md resize-none"
          rows={rows}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
          required
          {...rest}
        />
      )}
    </div>
  );
};

export default Input;
