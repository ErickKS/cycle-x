import { ElementType, InputHTMLAttributes, KeyboardEvent, ReactNode } from "react";
import clsx from "clsx";

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
      className={clsx(
        "flex flex-col rounded border-2 px-6 py-5 outline-none cursor-pointer animate-alert transition",
        "hover:bg-primary-light focus:bg-primary-light",
        {"border-primary bg-primary-light" : checked},
        {"border-gray-light" : !checked},
        {"border-red/70" : alert}
      )}
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

interface RadioTextsProps {
  children: ReactNode;
}

function RadioTitle({ children }:RadioTextsProps) {
  return <h2 className="text-xl font-semibold">{children}</h2>
}

function RadioDescription({ children }: RadioTextsProps) {
  return <p className="font-medium">{children}</p>
}

export const Radio = {
  Root: RadioRoot,
  Title: RadioTitle,
  Description: RadioDescription,
};