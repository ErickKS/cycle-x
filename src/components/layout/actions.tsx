import { Button } from "@/components/button";

interface ActionsProps {
  onStepCompletion: () => void;
}

export function Actions({ onStepCompletion }: ActionsProps) {
  return (
    <>
      <Button href="/registro" type="outline">
        Voltar
      </Button>

      <Button onClick={onStepCompletion} type="solid">
        Finalizar
      </Button>
    </>
  );
}
