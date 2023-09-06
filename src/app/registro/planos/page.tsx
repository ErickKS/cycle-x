"use client";

import { Bike, Crown, Medal } from "lucide-react";

import { Banner } from "@/components/Banner";
import { CustomRadioSelect } from "@/components/CustomRadioSelect";
import { Actions } from "@/patterns/Actions";

export default function Planos() {
  function handleSelectedPlan() {}

  return (
    <>
      <Banner
        title="Escolha seu plano de seguro"
        text="Selecione um dentre os três de nossos planos de seguros oferecidos para sua bike"
      />

      <div className="flex flex-col gap-4">
        <CustomRadioSelect
          checked
          id="teste"
          icon={Bike}
          title="Pedal Essencial"
          text="O plano gratuito você pode experimentar um dos serviços essenciais oferecidos."
        />
        <CustomRadioSelect
          id="teste2"
          icon={Medal}
          title="Pedal Leve"
          text="Para você que gosta de pedalar e está buscando um plano de serviços intermediário"
        />
        <CustomRadioSelect
          id="teste3"
          icon={Crown}
          title="Pedal Elite"
          text="Conte com diversos serviços capazes de elevar suas aventuras para o próximo nível."
        />
        <a
          href="/"
          className="inline text-center font-medium text-primary underline outline-primary"
        >
          Saiba mais sobre nossos planos aqui!
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Actions onStepCompletion={handleSelectedPlan} />
      </div>
    </>
  );
}
