import Image from "next/image";

import { Copyright } from "@/components/Copyright";
import { CustomButton } from "@/components/CustomButton";

export default function Home() {
  return (
    <div className="flex max-w-[498px] justify-center sm:flex-col sm:gap-4">
      <div className="bg-blue absolute inset-0 -top-8 h-[200px] w-full rounded-[30px] sm:hidden" />

      <div className="sm:shadow-main flex flex-col rounded-xl px-6 pb-10 pt-28 sm:gap-10 sm:bg-white sm:p-8 sm:pt-16">
        <div className="relative z-10 flex flex-col items-center">
          <div className="shadow-main mb-8 rounded-md bg-white p-5 sm:absolute sm:-top-[114px]">
            <Image src={"/logo-single.svg"} width={56} height={56} alt="" />
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold">Bem vindo!</h1>
            <p className="text-lg">
              Você está na area de contratação de seguro de bikes.
            </p>
          </div>
        </div>

        <CustomButton
          href="/registro"
          type="solid"
          additionalClass="px-6 mx-auto mt-auto w-fit"
        >
          Começar contratação
        </CustomButton>
      </div>

      <div className="mx-auto">
        <Copyright />
      </div>
    </div>
  );
}
