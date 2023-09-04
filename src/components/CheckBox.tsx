"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

export function CheckBox() {
  return (
    <div className="flex gap-2">
      <Checkbox.Root
        className="bg-gray-light/70 data-[state=checked]:bg-primary group relative top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded"
        id="terms"
      >
        <Checkbox.Indicator>
          <Check className="group-data-[state=checked]:stroke-primary-light h-4 w-4" />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <label htmlFor="terms" className="cursor-pointer text-sm">
        Você está ciente de que a Porto irá coletar e tratar seus dados de
        acordo com a nossa Política de Privacidade.
      </label>
    </div>
  );
}
