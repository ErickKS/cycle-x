"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRegister } from "@/hooks/useRegister";

import { StepCard } from "@/components/StepCard";
import { Banner } from "@/components/Banner";
import { CheckBox } from "@/components/CheckBox";
import { CustomButton } from "@/components/CustomButton";

export default function Registro() {
  const { user, address, bike, plan, photos } = useRegister();

  const router = useRouter();

  const [disabledAttribute, setDisabledAttribute] = useState(true);
  const [termsCheck, setTermsCheck] = useState(false);

  const isValidUser = Object.values(user).every((value) => !!value);

  const isValidAddress = Object.keys(address)
    .filter((value) => value !== "comp")
    .every((value) => !!value);

  const isValidBike = Object.values(bike).every((value) => !!value);

  const isValidPlan = Object.values(plan).every((value) => !!value);

  const isValidPhotos = Object.values(photos).every((value) =>
    Object.values(value).every((value2) => !!value2),
  );

  const isCompletedDadosStep = isValidUser && isValidAddress;
  const isCompletedBikeStep = isValidBike;
  const isCompletedPlanStep = isValidPlan;
  const isCompletedPhotosStep = isValidPhotos;

  useEffect(() => {
    if (isCompletedDadosStep && isCompletedBikeStep && isCompletedPlanStep && isCompletedPhotosStep && termsCheck) {
      setDisabledAttribute(false);
    } else {
      setDisabledAttribute(true);
    }
  }, [isCompletedDadosStep, isCompletedBikeStep, isCompletedPlanStep, isCompletedPhotosStep, termsCheck,
  ]);

  function handleRegistration() {
    router.push("/feedback");
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
          completed={isCompletedDadosStep}
          title="Dados cadastrais"
        />
        <StepCard
          to="bike"
          completed={isCompletedBikeStep}
          title="Sua bike"
        />
        <StepCard
          to="planos"
          completed={isCompletedPlanStep}
          title="Escolha de plano"
        />
        <StepCard
          to="fotos"
          completed={isCompletedPhotosStep}
          title="Envio de fotos"
        />
      </div>

      <div className="space-y-4">
        <CheckBox
          checked={termsCheck}
          onCheckedChange={() => setTermsCheck(!termsCheck)}
        />

        <CustomButton
          type="solid"
          isDisabled={disabledAttribute}
          onClick={handleRegistration}
          additionalClass="w-full py-3"
        >
          Enviar
        </CustomButton>
      </div>
    </>
  );
}
