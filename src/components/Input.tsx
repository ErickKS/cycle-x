import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLElement> {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
}

export function Input({ id, label, required, error, ...props }: InputProps) {
  return (
    <>
      <div className="dados relative">
        <input
          id={id}
          placeholder=" "
          className={`focus:bg-primary-light w-full rounded border-2 px-3 pb-2 pt-6 outline-none ${
            error ? "border-red" : "border-gray-light focus:border-b-primary"
          }`}
          {...props}
        />
        <label
          htmlFor={id}
          className={`absolute left-3 top-4 cursor-text text-lg transition ${
            error ? "text-red" : "text-black"
          }`}
        >
          {label}
          {required && "*"}
        </label>
      </div>

      {error && (
        <span className="text-red font-medium capitalize">{error}</span>
      )}
    </>
  );
}
