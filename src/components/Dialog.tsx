"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Plus, X } from "lucide-react";

import { CustomButton } from "./CustomButton";

interface DialogProps {
  title: string;
  triggerText: string;
  onClick: () => void;
  children: React.ReactNode;
}

export function Dialog({ title, triggerText, onClick, children }: DialogProps) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <button className="border-gray-light hover:bg-primary-light focus:bg-primary-light flex w-full items-center justify-between rounded border-2 px-3 py-3 text-lg outline-none transition">
          {triggerText}
          <Plus />
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />

        <DialogPrimitive.Content className="border-primary fixed left-1/2 top-1/2 flex w-full max-w-[432px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded border-2 bg-white px-4 py-6 text-black sm:max-w-[450px]">
          <div className="flex justify-between">
            <DialogPrimitive.Title className="text-xl font-medium">
              {title}
            </DialogPrimitive.Title>

            <DialogPrimitive.Close>
              <X />
            </DialogPrimitive.Close>
          </div>

          <main className="flex flex-col gap-4">{children}</main>

          <footer className="flex gap-4">
            <DialogPrimitive.Close className="text-primary hover:border-primary focus:border-primary flex justify-center rounded border-2 border-transparent bg-transparent px-5 py-2 text-lg font-semibold outline-none transition">
              Cancelar
            </DialogPrimitive.Close>

            <CustomButton type="solid" onClick={onClick} additionalClass="px-5">
              Adicionar
            </CustomButton>
          </footer>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
