"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

import { Copyright } from "@/components/Copyright";
import { CustomButton } from "@/components/CustomButton";
import { useRegister } from "@/hooks/useRegister";

export default function Feedback() {
  const { user, address, bike, plan, photos } = useRegister();

  const router = useRouter();

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

  useEffect(() => {
    if (
      !isCompletedUserStep ||
      !isCompletedBikeStep ||
      !isCompletedPlanStep ||
      !isCompletedPhotosStep
    ) {
      alert(
        "Você não preencheu as etapas da contração; por favor, retorne e siga as instruções corretamente.",
      );
      router.push("/");
    }
  }, []);

  return (
    <div className="flex max-w-[498px] justify-center sm:flex-col sm:gap-4">
      <div className="absolute inset-0 -top-8 h-[150px] w-full rounded-[30px] bg-blue sm:hidden" />

      <div className="flex flex-col gap-4 rounded-xl px-6 pb-10 pt-16 sm:gap-10 sm:bg-white sm:p-8 sm:pt-16 sm:shadow-main">
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8 rounded-md bg-white p-5 shadow-main sm:absolute sm:-top-[114px]">
            <Image src={"/logo-single.svg"} width={56} height={56} alt="" />
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold">
              Parabéns, estamos quase lá!
            </h1>
            <p className="text-lg">
              Em breve, você receberá um <b>e-mail</b> contendo os resultados da
              contratação do seguro de sua bike.
            </p>
          </div>
        </div>

        <Image
          src={"/bot-gif.gif"}
          width={244}
          height={244}
          alt="robot gif"
          className="mx-auto"
          priority
        />

        <CustomButton
          href="/"
          type="solid"
          additionalClass="px-12 mx-auto mt-auto mb-10 sm:mb-0 w-fit"
        >
          Sair
        </CustomButton>
      </div>

      <div className="mx-auto">
        <Copyright />
      </div>
    </div>
  );
}
