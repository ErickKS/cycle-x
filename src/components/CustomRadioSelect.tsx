import { ElementType, InputHTMLAttributes } from "react";

interface CustomRadioSelectProps extends InputHTMLAttributes<HTMLElement> {
  id: string;
  icon: ElementType;
  title: string;
  text: string;
}

// INPUT TYPE RADIO ERROR ==> REACT BUG

export function CustomRadioSelect({
  id,
  icon: Icon,
  title,
  text,
  ...rest
}: CustomRadioSelectProps) {
  return (
    <label className="border-gray-light hover:bg-primary-light focus:bg-primary-light active:border-primary active:bg-primary-light flex cursor-pointer flex-col rounded border-2 px-6 py-5 transition">
      <input
        type="radio"
        name={id}
        id={id}
        value={id}
        className="appearance-none"
        {...rest}
      />

      <Icon className="stroke-gray h-7 w-7" />

      <div className="mt-3 space-y-1">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="font-medium">{text}</p>
      </div>
    </label>
  );
}
