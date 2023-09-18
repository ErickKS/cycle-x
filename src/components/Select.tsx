"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

interface SelectProps {
  data: {
    placeholder: string;
    item: string[];
  };
  onValueChange: (value: string) => void;
  value: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alert?: boolean;
}

export function Select({
  data,
  onValueChange,
  value,
  onOpenChange,
  open,
  alert,
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      onValueChange={onValueChange}
      open={open}
      onOpenChange={onOpenChange}
      value={value}
    >
      <SelectPrimitive.Trigger
        aria-label="Bike"
        className={`group flex w-full items-center justify-between rounded border-2 px-3 py-4 text-lg outline-none focus:bg-primary-light ${
          alert ? "border-red" : "border-gray-light"
        }`}
      >
        <SelectPrimitive.Value placeholder={data.placeholder}>
          {value ? value : data.placeholder}
        </SelectPrimitive.Value>

        <SelectPrimitive.Icon>
          <ChevronDown className="text-gray/80 transition group-data-[state=open]:rotate-180" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="SelectContent relative -top-[2px]"
          position="popper"
        >
          <SelectPrimitive.Viewport className="rounded border-2 border-gray-light bg-white p-1 shadow-lg">
            <SelectPrimitive.Group>
              {data.item.map((item, i) => (
                <SelectPrimitive.Item
                  key={`${item}-${i}`}
                  value={item}
                  className="flex cursor-pointer select-none items-center rounded-md p-2 text-lg focus:bg-primary-light focus:outline-none"
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
