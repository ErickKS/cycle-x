"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

import { useStepsCheck } from "@/hooks/useStepsCheck";

import { Copyright } from "@/components/layout/copyright";

export default function Feedback() {
  const { isValid } = useStepsCheck()
  const router = useRouter();

  useEffect(() => {
    if (!isValid) {
      alert("Você não preencheu as etapas da contração. Retorne e siga as instruções corretamente.");
      router.push("/");
    }
  }, [isValid, router]);

  return (
    <div className="flex max-w-[498px] justify-center sm:flex-col sm:gap-4">
      <div className="absolute inset-0 -top-8 h-[150px] w-full rounded-[30px] bg-blue sm:hidden" />

      <div className="flex flex-col gap-4 rounded-xl px-6 pb-10 pt-16 sm:gap-10 sm:bg-white sm:p-8 sm:pt-16 sm:shadow-main">
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8 rounded-md bg-white p-5 shadow-main sm:absolute sm:-top-[114px]">
            <Image src={"/logo-single.svg"} width={56} height={56} alt="" />
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold">Parabéns, estamos quase lá!</h1>
            <p className="text-lg">
              Em breve, você receberá um <b>e-mail</b> contendo os resultados da contratação do seguro de sua bike.
            </p>
          </div>
        </div>

        <Image src={"/bot.gif"} blurDataURL={"/bot.gif"} width={244} height={244} placeholder="blur" alt="robot gif" className="mx-auto" />

        <a href="/" className="flex items-center justify-center w-fit mx-auto mt-auto mb-10 py-2 px-12 rounded text-center text-lg font-semibold outline-none transition sm:mb-0 bg-primary text-white hover:bg-primary-dark focus:bg-primary-dark">
          Sair
        </a>
      </div>

      <div className="mx-auto">
        <Copyright />
      </div>
    </div>
  );
}
