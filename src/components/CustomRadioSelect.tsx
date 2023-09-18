import { ElementType, InputHTMLAttributes, KeyboardEvent } from "react";

interface CustomRadioSelectProps extends InputHTMLAttributes<HTMLElement> {
  id: string;
  name: string;
  icon: ElementType;
  title: string;
  text: string;
  checked: boolean;
  onKeyDown: (event: KeyboardEvent<HTMLLabelElement>) => void;
  alert?: boolean;
}

export function CustomRadioSelect({
  id,
  icon: Icon,
  name,
  title,
  text,
  checked,
  onKeyDown,
  alert,
  ...props
}: CustomRadioSelectProps) {
  return (
    <label
      tabIndex={1}
      className={`animate-alert flex cursor-pointer flex-col rounded border-2 px-6 py-5 outline-none transition hover:bg-primary-light focus:bg-primary-light ${
        checked ? "border-primary bg-primary-light" : "border-gray-light"
      } ${alert && "border-red/70"}`}
      onKeyDown={onKeyDown}
    >
      <input
        type="radio"
        name={name}
        id={id}
        value={id}
        className="appearance-none"
        {...props}
      />

      <Icon className="h-7 w-7 stroke-gray" />

      <div className="mt-3 space-y-1">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="font-medium">{text}</p>
      </div>
    </label>
  );
}
