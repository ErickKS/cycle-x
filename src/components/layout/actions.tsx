import { Button } from "@/components/button";

interface ActionsProps {
  onStepCompletion: () => void;
}

export function Actions({ onStepCompletion }: ActionsProps) {
  return (
    <>
      <Button href="/registro" type="outline" additionalClass="w-full">
        Voltar
      </Button>

      <Button
        onClick={onStepCompletion}
        type="solid"
        additionalClass="w-full"
      >
        Finalizar
      </Button>
    </>
  );
}
