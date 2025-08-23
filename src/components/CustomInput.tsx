import React from "react";

type InputProps =
  | (React.InputHTMLAttributes<HTMLInputElement> & {
      type?: Exclude<string, "textarea">; // ✅ anything but "textarea"
      label?: string;
      rows?: number;
    })
  | (React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
      type: "textarea"; // ✅ if textarea, force correct props
      label?: string;
      rows?: number;
    });

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
          className={`w-full p-2 border rounded-md resize-none ${className}`}
          rows={rows}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          className={`border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
};

export default Input;
