import * as ToastPrimitive from "@radix-ui/react-toast";
import { AlertOctagon } from "lucide-react";

interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alert: string;
}

export function Toast({ open, onOpenChange, alert }: ToastProps) {
  return (
    <>
      <ToastPrimitive.Provider swipeDirection="up" duration={4000}>
        <ToastPrimitive.Root
          open={open}
          onOpenChange={onOpenChange}
          className="-ml-4 px-4 outline-none data-[state=closed]:animate-hide data-[state=open]:animate-slideIn sm:-ml-6 sm:px-6 md:px-20"
        >
          <div className="grid grid-cols-[24px_1fr] items-center gap-2 w-full max-w-[450px] px-4 py-3 rounded-xl border-2 border-red bg-[#EABCC4] shadow shadow-red/50">
            <AlertOctagon className="stroke-red" />

            <ToastPrimitive.Description asChild>
              <p className="text-sm font-semibold text-red">{alert}</p>
            </ToastPrimitive.Description>
          </div>
        </ToastPrimitive.Root>

        <ToastPrimitive.Viewport />
      </ToastPrimitive.Provider>
    </>
  );
}
