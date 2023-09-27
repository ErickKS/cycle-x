"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRegister } from "@/hooks/useRegister";

import { StepCard } from "@/components/StepCard";
import { Banner } from "@/components/Banner";
import { CheckBox } from "@/components/CheckBox";
import { CustomButton } from "@/components/CustomButton";

export default function Registro() {
  const { user, address, bike, plan, photos } = useRegister();

  const router = useRouter();

  const [stepAlert, setStepAlert] = useState({
    user: false,
    bike: false,
    plan: false,
    photos: false,
  });
  const [termsCheck, setTermsCheck] = useState(false);
  const [termsAlert, setTermsAlert] = useState(false);

  const isValidUser = Object.values(user).every((value) => !!value);

  const isValidAddress = Object.keys(address)
    .filter((value) => value !== "comp")
    .every((value) => !!value);

  const isValidBike = Object.values(bike).every((value) => !!value);

  const isValidPlan = Object.values(plan).every((value) => !!value);

  const isValidPhotos = Object.values(photos).every(
    (photo) => photo.status === "valid",
  );

  const isCompletedUserStep = isValidUser && isValidAddress;
  const isCompletedBikeStep = isValidBike;
  const isCompletedPlanStep = isValidPlan;
  const isCompletedPhotosStep = isValidPhotos;

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
    if (!isCompletedUserStep) handleStepsAlerts("user");
    if (!isCompletedBikeStep) handleStepsAlerts("bike");
    if (!isCompletedPlanStep) handleStepsAlerts("plan");
    if (!isCompletedPhotosStep) handleStepsAlerts("photos");

    if (!termsCheck) {
      setTermsAlert(true);
    }

    if (
      termsCheck &&
      isCompletedUserStep &&
      isCompletedBikeStep &&
      isCompletedPlanStep &&
      isCompletedPhotosStep
    ) {
      router.push("/feedback");
    }
  }

  return (
    <>
      <Banner
        title="Vamos lá!"
        text="Complete todas as etapas abaixo para realizar a contratação do seguro para a sua bike."
      />

      <div className="space-y-4">
        <StepCard
          to="dados"
          completed={isCompletedUserStep}
          title="Dados cadastrais"
          alert={stepAlert.user}
        />
        <StepCard
          to="bike"
          completed={isCompletedBikeStep}
          title="Sua bike"
          alert={stepAlert.bike}
        />
        <StepCard
          to="planos"
          completed={isCompletedPlanStep}
          title="Escolha de plano"
          alert={stepAlert.plan}
        />
        <StepCard
          to="fotos"
          completed={isCompletedPhotosStep}
          title="Envio de fotos"
          alert={stepAlert.photos}
        />
      </div>

      <div className="space-y-4">
        <CheckBox
          checked={termsCheck}
          alert={termsAlert}
          onCheckedChange={handleTerms}
        />

        <CustomButton
          type="solid"
          onClick={handleRegistration}
          additionalClass="w-full py-3"
        >
          Enviar
        </CustomButton>
      </div>
    </>
  );
}
