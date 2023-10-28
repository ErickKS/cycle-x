import { ScanSearch, AlertOctagon, CheckCircle2 } from "lucide-react";

export type Status = "validating" | "valid" | "invalid" | "invalid-r-side" | "invalid-l-side" | "error";

export const statusOfValidation: Record<Status, { icon: JSX.Element | null; text: string }> = {
  validating: {
    icon: <ScanSearch />,
    text: "Validando...",
  },
  valid: {
    icon: <CheckCircle2 className="stroke-green" />,
    text: "Sucesso, a bicicleta é válida!",
  },
  invalid: {
    icon: <AlertOctagon className="stroke-red" />,
    text: "Foto inválida, tente novamente!",
  },
  "invalid-r-side": {
    icon: <AlertOctagon className="stroke-red" />,
    text: "Por favor, anexe a foto da lateral direita da bicicleta.",
  },
  "invalid-l-side": {
    icon: <AlertOctagon className="stroke-red" />,
    text: "Por favor, anexe a foto da lateral esquerda da bicicleta.",
  },
  error: {
    icon: <AlertOctagon className="stroke-red" />,
    text: "Não foi possível realizar a análise, por favor, tente novamente!",
  },
};
