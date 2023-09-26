"use client";

import { useRouter } from "next/navigation";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Bike, Crown, Medal } from "lucide-react";

import { useRegister } from "@/hooks/useRegister";
import { Plan } from "@/contexts/RegisterContext";

import { Banner } from "@/components/Banner";
import { CustomRadioSelect } from "@/components/CustomRadioSelect";
import { Actions } from "@/patterns/Actions";

export default function Planos() {
  const { plan, updatePlanData } = useRegister();
  const [selectedPlan, setSelectedPlan] = useState<string>(plan.name);
  const [alertPlan, activeAlertPlan] = useState(false);

  const router = useRouter();

  function handleRadioChange(event: ChangeEvent<HTMLInputElement>) {
    if (alertPlan) activeAlertPlan(false);
    setSelectedPlan(event.target.value);
  }

  function handleRadioKeyPress(event: KeyboardEvent<HTMLLabelElement>) {
    const { currentTarget, key } = event;
    const input = currentTarget.querySelector("input");
    if (input && (key === " " || key === "Enter")) {
      setSelectedPlan(input.value);
    }
  }

  function handleRadioAlert() {
    activeAlertPlan(true);
  }

  function handleSelectedPlan() {
    if (!selectedPlan) handleRadioAlert();

    if (selectedPlan) {
      const newPlanData: Plan = { name: selectedPlan };
      updatePlanData(newPlanData);

      router.push("/registro");
    }
  }

  return (
    <>
      <Banner
        title="Escolha seu plano de seguro"
        text="Selecione um dentre os três de nossos planos de seguros oferecidos para sua bike"
      />

      <div className="flex flex-col gap-4">
        <CustomRadioSelect
          id="pedal-essencial"
          name="plans"
          icon={Bike}
          title="Pedal Essencial"
          text="O plano gratuito você pode experimentar um dos serviços essenciais oferecidos."
          onChange={handleRadioChange}
          onKeyDown={handleRadioKeyPress}
          checked={selectedPlan === "pedal-essencial"}
          alert={alertPlan}
        />
        <CustomRadioSelect
          id="pedal-leve"
          name="plans"
          icon={Medal}
          title="Pedal Leve"
          text="Para você que gosta de pedalar e está buscando um plano de serviços intermediário"
          onChange={handleRadioChange}
          onKeyDown={handleRadioKeyPress}
          checked={selectedPlan === "pedal-leve"}
          alert={alertPlan}
        />
        <CustomRadioSelect
          id="pedal-elite"
          name="plans"
          icon={Crown}
          title="Pedal Elite"
          text="Conte com diversos serviços capazes de elevar suas aventuras para o próximo nível."
          onChange={handleRadioChange}
          onKeyDown={handleRadioKeyPress}
          checked={selectedPlan === "pedal-elite"}
          alert={alertPlan}
        />

        <a
          href="https://www.portoseguro.com.br/conteudo/seguros/bike/"
          className="inline text-center font-medium text-primary underline outline-primary"
          target="_blank"
        >
          Saiba mais sobre nossos planos aqui!
        </a>
      </div>

      <div className="grid gap-4 xs:grid-cols-2">
        <Actions onStepCompletion={handleSelectedPlan} />
      </div>
    </>
  );
}
