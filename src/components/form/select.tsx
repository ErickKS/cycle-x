"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

interface SelectProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onValueChange: (value: string) => void;
  alert?: boolean;
  data: {
    placeholder: string;
    item: string[];
  };
}

export function Select({ open, onOpenChange, value, onValueChange, alert, data }: SelectProps) {
  return (
    <SelectPrimitive.Root onValueChange={onValueChange} open={open} onOpenChange={onOpenChange} value={value}>
      <SelectPrimitive.Trigger
        aria-label="Bike"
        className={clsx(
          "group flex items-center justify-between w-full px-3 py-4 border-2 rounded text-lg outline-none",
          "focus:bg-primary-light",
          { "border-red": alert },
          { "border-gray-light": !alert }
        )}
      >
        <SelectPrimitive.Value placeholder={data.placeholder}>{value ? value : data.placeholder}</SelectPrimitive.Value>

        <SelectPrimitive.Icon>
          <ChevronDown className="text-gray/80 transition group-data-[state=open]:rotate-180" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="SelectContent relative -top-[2px] z-10 max-h-[120px]" position="popper">
          <SelectPrimitive.Viewport className="p-1 border-2 border-gray-light rounded bg-white shadow-inner-select">
            <SelectPrimitive.Group>
              {data.item.map((item, i) => (
                <SelectPrimitive.Item
                  key={`${item}-${i}`}
                  value={item}
                  className="flex items-center p-2 rounded-md text-lg cursor-pointer select-none focus:bg-primary-light focus:outline-none"
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
