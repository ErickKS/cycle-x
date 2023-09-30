import { ElementType, InputHTMLAttributes, KeyboardEvent, ReactNode } from "react";

interface RadioRootProps extends InputHTMLAttributes<HTMLElement> {
  id: string;
  name: string;
  icon: ElementType;
  children: ReactNode
  checked: boolean;
  onKeyDown: (event: KeyboardEvent<HTMLLabelElement>) => void;
  alert?: boolean;
}

function RadioRoot({ id, icon: Icon, name, children, checked, onKeyDown, alert, ...props }: RadioRootProps) {
  return (
    <label
      tabIndex={1}
      onKeyDown={onKeyDown}
      className={`flex flex-col rounded border-2 px-6 py-5 outline-none cursor-pointer animate-alert transition hover:bg-primary-light focus:bg-primary-light
        ${checked ? "border-primary bg-primary-light" : "border-gray-light"}
        ${alert && "border-red/70"}
      `}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={id}
        className="appearance-none"
        {...props}
      />

      <Icon className="h-7 w-7 stroke-gray" />

      <div className="mt-3 space-y-1">
        {children}
      </div>
    </label>
  );
}

interface RadioTitleProps {
  children: ReactNode;
}

function RadioTitle({children}:RadioTitleProps) {
  return (
    <h2 className="text-xl font-semibold">
      {children}
    </h2>
  )
}

interface RadioDescriptionProps {
  children: ReactNode;
}

function RadioDescription({children}: RadioDescriptionProps) {
  return (
    <p className="font-medium">
      {children}
    </p>
  )
}

export const Radio = {
  Root: RadioRoot,
  Title: RadioTitle,
  Description: RadioDescription,
};