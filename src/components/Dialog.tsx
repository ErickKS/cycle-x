"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { CustomButton } from "./CustomButton";

interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: "add" | "edit" | null;
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
}

interface DialogAddressProps extends DialogProps {}

export function DialogAddress({
  open,
  setOpen,
  type,
  title,
  onSubmit,
  children,
}: DialogAddressProps) {
  //
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />

        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 flex w-full max-w-[432px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded border-2 border-primary bg-white px-4 py-6 text-black sm:max-w-[450px]">
          <div className="flex justify-between">
            <DialogPrimitive.Title className="text-xl font-medium">
              {type === "add" ? `Adicionar ${title}` : `Editar ${title}`}
            </DialogPrimitive.Title>

            <DialogPrimitive.Close>
              <X />
            </DialogPrimitive.Close>
          </div>

          <main className="flex flex-col gap-4">{children}</main>

          <footer className="flex justify-end gap-4">
            <DialogPrimitive.Close className="flex justify-center rounded border-2 border-transparent bg-transparent px-5 py-2 text-lg font-semibold text-primary outline-none transition hover:border-primary focus:border-primary">
              Cancelar
            </DialogPrimitive.Close>

            <CustomButton
              type="solid"
              onClick={onSubmit}
              additionalClass="px-5"
            >
              {type === "add" ? "Adicionar" : "Salvar"}
            </CustomButton>
          </footer>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

interface DialogAccessoryProps extends DialogProps {
  onDelete: () => void;
}

export function DialogAccessory({
  open,
  setOpen,
  title,
  type,
  onSubmit,
  onDelete,
  children,
}: DialogAccessoryProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />

        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 flex w-full max-w-[432px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded border-2 border-primary bg-white px-4 py-6 text-black sm:max-w-[450px]">
          <div className="flex justify-between">
            <DialogPrimitive.Title className="text-xl font-medium">
              {type === "add" ? `Adicionar ${title}` : `Editar ${title}`}
            </DialogPrimitive.Title>

            <DialogPrimitive.Close>
              <X />
            </DialogPrimitive.Close>
          </div>

          <main className="flex flex-col gap-4">{children}</main>

          <footer className="flex justify-end gap-4">
            {type === "add" ? (
              <DialogPrimitive.Close className="flex justify-center rounded border-2 border-transparent bg-transparent px-5 py-2 text-lg font-semibold text-primary outline-none transition hover:border-primary focus:border-primary">
                Cancelar
              </DialogPrimitive.Close>
            ) : (
              <button
                onClick={onDelete}
                className="flex justify-center rounded border-2 border-transparent bg-transparent px-5 py-2 text-lg font-semibold text-red outline-none transition hover:border-red focus:border-red"
              >
                Deletar
              </button>
            )}

            <CustomButton
              type="solid"
              onClick={onSubmit}
              additionalClass="px-5"
            >
              {type === "add" ? "Adicionar" : "Salvar"}
            </CustomButton>
          </footer>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
