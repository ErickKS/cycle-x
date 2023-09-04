import { CustomButton } from "@/components/CustomButton";

interface ActionsProps {
  onStepCompletion: () => void;
}

export function Actions({ onStepCompletion }: ActionsProps) {
  return (
    <>
      <CustomButton href="/registro" type="outline" additionalClass="w-full">
        Voltar
      </CustomButton>

      <CustomButton
        onClick={onStepCompletion}
        type="solid"
        additionalClass="w-full"
      >
        Finalizar
      </CustomButton>
    </>
  );
}
