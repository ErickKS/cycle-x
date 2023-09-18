"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

interface CheckBoxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean | "indeterminate") => void;
}

export function CheckBox({ checked, onCheckedChange }: CheckBoxProps) {
  return (
    <div className="flex gap-2">
      <Checkbox.Root
        className="group relative top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded bg-gray-light/70 data-[state=checked]:bg-primary "
        id="terms"
        checked={checked}
        onCheckedChange={onCheckedChange}
      >
        <Checkbox.Indicator>
          <Check className="h-4 w-4 group-data-[state=checked]:stroke-primary-light" />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <label htmlFor="terms" className="cursor-pointer text-sm">
        Você está ciente de que a Porto irá coletar e tratar seus dados de
        acordo com a nossa{" "}
        <a href="#" className="text-primary underline">
          Política de Privacidade
        </a>
        .
      </label>
    </div>
  );
}
