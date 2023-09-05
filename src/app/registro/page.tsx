import { StepCard } from "@/components/StepCard";
import { Banner } from "@/components/Banner";
import { CheckBox } from "@/components/CheckBox";
import { CustomButton } from "@/components/CustomButton";

export default function Registro() {
  return (
    <>
      <Banner
        title="Vamos lá!"
        text="Complete todas as etapas abaixo para realizar a contratação do seguro para a sua bike."
      />

      <div className="space-y-5">
        <StepCard to="dados" completed={true} title="Dados cadastrais" />
        <StepCard to="bike" completed={false} title="Sua bike" />
        <StepCard to="planos" completed={false} title="Escolha de plano" />
        <StepCard to="fotos" completed={false} title="Envio de fotos" />
      </div>

      <div className="space-y-4">
        <CheckBox />

        <CustomButton href="/feedback" type="solid" additionalClass="py-3">
          Enviar
        </CustomButton>
      </div>
    </>
  );
}
