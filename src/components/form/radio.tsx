import { ChangeEvent, Dispatch, ElementType, KeyboardEvent, ReactNode, SetStateAction } from "react";
import clsx from "clsx";

interface RadioRootProps {
  id: string;
  name: string;
  icon: ElementType;
  checked: boolean;
  planValue: Dispatch<SetStateAction<string>>;
  alert?: boolean;
  alertFunction: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

function RadioRoot({ id, icon: Icon, name, children, checked, planValue, alert, alertFunction }: RadioRootProps) {
  function handleRadioChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    if (!value) return;
    if (alert) alertFunction(false);

    planValue(value);
  }

  function handleRadioKeyPress(event: KeyboardEvent<HTMLLabelElement>) {
    const { currentTarget, key } = event;
    const input = currentTarget.querySelector("input");

    if (input && (key === " " || key === "Enter")) planValue(input.value);
  }

  return (
    <label
      tabIndex={1}
      onKeyDown={handleRadioKeyPress}
      className={clsx(
        "flex flex-col rounded border-2 px-6 py-5 outline-none cursor-pointer animate-alert transition",
        "hover:bg-primary-light focus:bg-primary-light",
        { "border-primary bg-primary-light": checked },
        { "border-gray-light": !checked },
        { "border-red/70": alert }
      )}
    >
      <input id={id} type="radio" name={name} value={id} onChange={handleRadioChange} className="appearance-none" />

      <Icon className="h-7 w-7 stroke-gray" />

      <div className="mt-3 space-y-1">{children}</div>
    </label>
  );
}

interface RadioTextsProps {
  children: ReactNode;
}

function RadioTitle({ children }: RadioTextsProps) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

function RadioDescription({ children }: RadioTextsProps) {
  return <p className="font-medium">{children}</p>;
}

export const Radio = {
  Root: RadioRoot,
  Title: RadioTitle,
  Description: RadioDescription,
};
