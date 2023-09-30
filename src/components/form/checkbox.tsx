"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

interface CheckboxProps {
  checked: boolean;
  alert?: boolean;
  onCheckedChange: (checked: boolean | "indeterminate") => void;
}

export function Checkbox({ checked, alert, onCheckedChange }: CheckboxProps) {
  return (
    <div className="flex gap-2">
      <CheckboxPrimitive.Root
        id="terms"
        className={`group relative top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded border-2 bg-gray-light/70 outline-primary data-[state=checked]:bg-primary
          ${alert ? "border-red" : "border-transparent"}
        `}
        checked={checked}
        onCheckedChange={onCheckedChange}
      >
        <CheckboxPrimitive.Indicator>
          <Check className="h-4 w-4 group-data-[state=checked]:stroke-primary-light" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      <label htmlFor="terms" className="cursor-pointer text-sm">
        Você está ciente de que a Porto irá coletar e tratar seus dados de acordo com a nossa{" "}
        <a href="#" className="text-primary underline">
          Política de Privacidade
        </a>
        .
      </label>
    </div>
  );
}
