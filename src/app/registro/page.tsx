"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useFormStorageChecker } from "@/hooks/useFormStorageChecker";

import { Banner } from "@/components/layout/banner";
import { Checkbox } from "@/components/form/checkbox";
import { StepCard } from "@/components/step-card";
import { Button } from "@/components/button";

export default function Registro() {
  const validation = useFormStorageChecker();
  const router = useRouter();

  const [stepAlert, setStepAlert] = useState({ user: false, bike: false, plan: false, photos: false });
  const [termsCheck, setTermsCheck] = useState(false);
  const [termsAlert, setTermsAlert] = useState(false);

  // disable chat bot
  useEffect(() => {
    const chatbotScript = document.querySelector('script[src*="WatsonAssistantChatEntry.js"]');
    const chatbot = document.querySelector(".WatsonAssistantChatHost");

    if (chatbotScript && chatbot) {
      chatbotScript.remove();
      chatbot.remove();
    }
  }, []);

  function handleStepsAlerts(step: string) {
    setStepAlert((stepAlert) => ({
      ...stepAlert,
      [step]: true,
    }));
  }

  function handleTerms() {
    setTermsCheck(!termsCheck);
    setTermsAlert(false);
  }

  function handleRegistration() {
    if (!validation.userStep) handleStepsAlerts("user");
    if (!validation.bikeStep) handleStepsAlerts("bike");
    if (!validation.planStep) handleStepsAlerts("plan");
    if (!validation.photosStep) handleStepsAlerts("photos");

    if (!termsCheck) setTermsAlert(true);

    if (validation.isValid && termsCheck) router.push("/feedback");
  }

  return (
    <>
      <Banner.Root>
        <Banner.Title>Vamos lá!</Banner.Title>
        <Banner.Text>Complete todas as etapas abaixo para realizar a contratação do seguro para a sua bike.</Banner.Text>
      </Banner.Root>

      <div className="space-y-4">
        <StepCard to="dados" completed={validation.userStep} title="Dados cadastrais" alert={stepAlert.user} />
        <StepCard to="bike" completed={validation.bikeStep} title="Sua bike" alert={stepAlert.bike} />
        <StepCard to="planos" completed={validation.planStep} title="Escolha de plano" alert={stepAlert.plan} />
        <StepCard to="fotos" completed={validation.photosStep} title="Envio de fotos" alert={stepAlert.photos} />
      </div>

      <div className="space-y-4">
        <Checkbox checked={termsCheck} alert={termsAlert} onCheckedChange={handleTerms} />

        <Button type="solid" onClick={handleRegistration} customStyles="w-full py-3">
          Enviar
        </Button>
      </div>
    </>
  );
}
