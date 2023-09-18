import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  id: string;
  label: string;
  value: string | number | undefined;
  error?: boolean | string;
  required?: boolean;
}

export function Input({
  id,
  label,
  value,
  required,
  error,
  ...props
}: InputProps) {
  return (
    <>
      <div className="dados relative">
        <input
          id={id}
          placeholder=""
          value={value}
          autoComplete="off"
          className={`w-full rounded border-2 px-3 pb-2 pt-6 font-medium outline-none focus:bg-primary-light ${
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

          {!required && (
            <span className="text-sm text-gray/80"> (opcional)</span>
          )}
        </label>

        {error && <span className="font-medium text-red">{error}</span>}
      </div>
    </>
  );
}
