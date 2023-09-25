"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AlertOctagon, X } from "lucide-react";

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

        <DialogPrimitive.Content className="fixed left-1/2 z-10 h-screen w-full max-w-[498px] -translate-x-1/2 items-center px-4 sm:top-1/2 sm:h-auto sm:-translate-y-1/2 sm:px-6">
          <div className="flex h-screen flex-col gap-6 overflow-y-scroll rounded border-2 border-primary bg-white px-4 py-6 text-black sm:h-fit">
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
          </div>
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

interface DialogHomeProps extends Partial<DialogProps> {
  block?: boolean;
}

export function DialogHome({ open, setOpen, block }: DialogHomeProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-10 bg-black/50" />

        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-30 w-full max-w-[498px] -translate-x-1/2 -translate-y-1/2 px-4 outline-none sm:max-w-[498px]">
          <div className="flex flex-col items-center gap-4 rounded border-2 border-red bg-white px-4 py-6">
            <div className="flex flex-col items-center">
              <AlertOctagon className="stroke-red" size={32} />

              <DialogPrimitive.Title className="text-center text-xl font-semibold text-red">
                Ops, parece que seu dispositivo não tem câmera!
              </DialogPrimitive.Title>
            </div>

            <main className="space-y-6">
              <p className="text-center font-medium">
                Para garantir a segurança, é necessário acessar através um
                dispositivo móvel para concluir essa contratação, pois
                precisamos de uma foto da sua bicicleta em tempo real.
              </p>

              {block ? (
                <button className="mx-auto flex items-center justify-center rounded border-2 border-primary bg-transparent px-4 py-2 text-center text-lg font-semibold text-primary outline-none transition hover:bg-primary/10 focus:bg-primary/10">
                  Sair
                </button>
              ) : (
                <DialogPrimitive.Close className="mx-auto flex items-center justify-center rounded border-2 border-primary bg-transparent px-4 py-2 text-center text-lg font-semibold text-primary outline-none transition hover:bg-primary/10 focus:bg-primary/10">
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
