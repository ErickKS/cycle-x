import { ComponentProps, FocusEvent } from "react";
// @ts-ignore
import InputMask from "react-input-mask";

interface InputProps extends ComponentProps<"input"> {
  id: string;
  label: string;
  mask?: string;
  value: string | number | undefined;
  error?: boolean | string;
  required?: boolean;
}

export function Input({ id, label, mask, value, required, error, ...props }: InputProps) {
  function valueVerification(event: FocusEvent<HTMLInputElement>) {
    const inputValue = event.target.value;

    if (!inputValue) value = "";
  }

  return (
    <div className="dados relative">
      <InputMask
        id={id}
        value={value}
        placeholder=" "
        autoComplete="off"
        className={`w-full rounded border-2 px-3 pb-2 pt-6 font-medium outline-none focus:bg-primary-light
          ${error ? "border-red" : "border-gray-light focus:border-b-primary"}
          ${id === "uf" && "uppercase"}
        `}
        mask={mask}
        onBlur={valueVerification}
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute left-3 top-4 cursor-text text-lg transition
          ${error ? "text-red" : "text-black"}
        `}
      >
        {label}

        {!required && <span className="text-sm text-gray/80"> (opcional)</span>}
      </label>

      {error && <span className="font-medium text-red">{error}</span>}
    </div>
  );
}
