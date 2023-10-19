import { Button } from "@/components/button";

interface ActionsProps {
  to?: string;
  onStepCompletion: () => void;
}

export function Actions({ to = "/registro", onStepCompletion }: ActionsProps) {
  return (
    <>
      <Button href={to} type="outline">
        Voltar
      </Button>

      <Button onClick={onStepCompletion} type="solid">
        Finalizar
      </Button>
    </>
  );
}
