"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

interface SelectProps {
  data: {
    placeholder: string;
    item: string[];
  };
}

export function Select({ data }: SelectProps) {
  return (
    <SelectPrimitive.Root>
      <SelectPrimitive.Trigger
        aria-label="Bike"
        className="border-gray-light focus:bg-primary-light group flex w-full items-center justify-between rounded border-2 px-3 py-4 text-lg outline-none"
      >
        <SelectPrimitive.Value placeholder={data.placeholder} />

        <SelectPrimitive.Icon>
          <ChevronDown className="text-gray/80 transition group-data-[state=open]:rotate-180" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="SelectContent relative -top-[2px]"
          position="popper"
        >
          <SelectPrimitive.Viewport className="border-gray-light rounded border-2 bg-white p-1 shadow-lg">
            <SelectPrimitive.Group>
              {data.item.map((item, i) => (
                <SelectPrimitive.Item
                  key={`${item}-${i}`}
                  value={item.toLowerCase()}
                  className="focus:bg-primary-light flex cursor-pointer select-none items-center rounded-md p-2 text-lg focus:outline-none"
                >
                  <SelectPrimitive.ItemText>{item}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Group>
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
