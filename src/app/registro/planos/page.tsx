"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bike, Crown, Medal } from "lucide-react";

import { useFormStorage, Plan } from "@/hooks/useFormStorage";

import { Banner } from "@/components/layout/banner";
import { Actions } from "@/components/layout/actions";
import { Radio } from "@/components/form/radio";

export default function Planos() {
  const { plan, updateDataByStage } = useFormStorage();
  const router = useRouter();

  const [selectedPlan, setSelectedPlan] = useState(plan.name);
  const [alertPlan, setAlertPlan] = useState(false);

  function handleSelectedPlan() {
    if (!selectedPlan) {
      setAlertPlan(true);
      return;
    }

    const newPlanData = { name: selectedPlan };
    updateDataByStage("plan", newPlanData as Plan);

    router.push("/registro");
  }

  return (
    <>
      <Banner.Root>
        <Banner.Title>Escolha seu plano de seguro</Banner.Title>
        <Banner.Text>Selecione um dentre os três de nossos planos de seguros oferecidos para sua bike</Banner.Text>
      </Banner.Root>

      <div className="flex flex-col gap-4">
        <Radio.Root
          id="pedal-essencial"
          name="plans"
          icon={Bike}
          planValue={setSelectedPlan}
          checked={selectedPlan === "pedal-essencial"}
          alert={alertPlan}
          alertFunction={setAlertPlan}
        >
          <Radio.Title>Pedal Essencial</Radio.Title>

          <Radio.Description>O plano gratuito você pode experimentar um dos serviços essenciais oferecidos.</Radio.Description>
        </Radio.Root>

        <Radio.Root
          id="pedal-leve"
          name="plans"
          icon={Medal}
          planValue={setSelectedPlan}
          checked={selectedPlan === "pedal-leve"}
          alert={alertPlan}
          alertFunction={setAlertPlan}
        >
          <Radio.Title>Pedal Leve</Radio.Title>

          <Radio.Description>Para você que gosta de pedalar e está buscando um plano de serviços intermediário</Radio.Description>
        </Radio.Root>

        <Radio.Root
          id="pedal-elite"
          name="plans"
          icon={Crown}
          planValue={setSelectedPlan}
          checked={selectedPlan === "pedal-elite"}
          alert={alertPlan}
          alertFunction={setAlertPlan}
        >
          <Radio.Title>Pedal Elite</Radio.Title>

          <Radio.Description>Conte com diversos serviços capazes de elevar suas aventuras para o próximo nível.</Radio.Description>
        </Radio.Root>

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
