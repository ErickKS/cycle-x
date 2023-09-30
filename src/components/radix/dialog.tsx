"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import Link from "next/link";
import { AlertOctagon, X } from "lucide-react";

import { Button } from "@/components/button";

interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: "add" | "edit" | null;
  title: string;
  onSubmit: () => void;
  children: React.ReactNode;
}

interface DialogAddressProps extends DialogProps {}

export function DialogAddress({ open, setOpen, type, title, onSubmit, children}: DialogAddressProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />

        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-full max-w-[498px] px-4 sm:px-6">
          <div className="flex flex-col gap-6 px-4 py-6 rounded border-2 border-primary bg-white text-black">
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
              <DialogPrimitive.Close className="flex justify-center px-5 py-2 rounded border-2 border-transparent bg-transparent text-lg font-semibold text-primary outline-none transition hover:border-primary focus:border-primary">
                Cancelar
              </DialogPrimitive.Close>

              <Button
                type="solid"
                onClick={onSubmit}
                additionalClass="px-5"
              >
                {type === "add" ? "Adicionar" : "Salvar"}
              </Button>
            </footer>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

interface DialogAccessoryProps extends DialogProps {
  onDelete: () => void;
}

export function DialogAccessory({ open, setOpen, title, type, onSubmit, onDelete, children }: DialogAccessoryProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />

        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 w-full max-w-[432px] px-4 py-6 rounded border-2 border-primary bg-white text-black sm:max-w-[450px]">
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
              <DialogPrimitive.Close className="flex justify-center px-5 py-2 rounded border-2 border-transparent bg-transparent text-lg font-semibold text-primary outline-none transition hover:border-primary focus:border-primary">
                Cancelar
              </DialogPrimitive.Close>
            ) : (
              <button
                onClick={onDelete}
                className="flex justify-center px-5 py-2 rounded border-2 border-transparent bg-transparent text-lg font-semibold text-red outline-none transition hover:border-red focus:border-red"
              >
                Deletar
              </button>
            )}

            <Button
              type="solid"
              onClick={onSubmit}
              additionalClass="px-5"
            >
              {type === "add" ? "Adicionar" : "Salvar"}
            </Button>
          </footer>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

interface DialogAlertProps extends Partial<DialogProps> {
  block?: boolean;
}

export function DialogAlert({ open, setOpen, block }: DialogAlertProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-10 bg-black/50" />

        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 w-full max-w-[498px] px-4 outline-none sm:max-w-[498px]">
          <div className="flex flex-col items-center gap-4 px-4 py-6 rounded border-2 border-red bg-white">
            <div className="flex flex-col items-center">
              <AlertOctagon className="stroke-red" size={32} />

              <DialogPrimitive.Title className="text-center text-xl font-semibold text-red">
                Ops, parece que seu dispositivo não possui uma câmera ou a
                permissão foi negada!
              </DialogPrimitive.Title>
            </div>

            <main className="space-y-6">
              <p className="text-center font-medium">
                Para garantir a segurança, é necessário usar um dispositivo
                móvel para concluir esta contratação, uma vez que precisamos de
                uma foto em tempo real da sua bicicleta.
              </p>

              {block ? (
                <Link
                  href={"/"}
                  className="flex w-fit items-center justify-center px-6 py-1 mx-auto rounded border-2 border-red bg-transparent text-center text-lg font-semibold text-red outline-none transition hover:bg-red/10 focus:bg-red/10"
                >
                  Sair
                </Link>
              ) : (
                <DialogPrimitive.Close className="flex items-center justify-center px-4 py-2 mx-auto rounded border-2 border-red bg-transparent text-center text-lg font-semibold text-red outline-none transition hover:bg-red/10 focus:bg-red/10">
                  Entendido
                </DialogPrimitive.Close>
              )}
            </main>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
