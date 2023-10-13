import { ComponentProps, FocusEvent } from "react";
import clsx from "clsx";

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
        mask={mask}
        onBlur={valueVerification}
        className={clsx(
          "w-full px-3 pb-2 pt-6 border-2 rounded font-medium outline-none",
          "focus:bg-primary-light",
          {"border-red" : error},
          {"border-gray-light focus:border-b-primary" : !error},
          {"uppercase" : id === "uf"}
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className={clsx(
          "absolute left-3 top-4 cursor-text text-lg transition",
          {"text-red" : error},
          {"text-black" : !error},
        )}
      >
        {label}

        {!required && <span className="text-sm text-gray/80"> (opcional)</span>}
      </label>

      {error && <span className="font-medium text-red">{error}</span>}
    </div>
  );
}
