import Image from "next/image";

import { Copyright } from "@/components/Copyright";
import { CustomButton } from "@/components/CustomButton";

export default function Feedback() {
  return (
    <div className="flex max-w-[498px] justify-center sm:flex-col sm:gap-4">
      <div className="absolute inset-0 -top-8 h-[150px] w-full rounded-[30px] bg-blue sm:hidden" />

      <div className="flex flex-col rounded-xl px-6 pb-10 pt-16 sm:gap-10 sm:bg-white sm:p-8 sm:pt-16 sm:shadow-main">
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8 rounded-md bg-white p-5 shadow-main sm:absolute sm:-top-[114px]">
            <Image src={"/logo-single.svg"} width={56} height={56} alt="" />
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold">Parabéns, estamos quase lá! </h1>
            <p className="text-lg">
              Nossa IA está verificando as fotos de sua bike, aguarde o nosso retorno via <b>e-mail</b>.
            </p>
          </div>
        </div>

        <Image src={"/bot-gif.gif"} width={244} height={244} alt="robot gif" className="mx-auto mb-2 sm:mb-0" />

        <CustomButton href="/" type="solid" additionalClass="px-12 mx-auto mt-auto w-fit">
          Sair
        </CustomButton>
      </div>

      <div className="mx-auto">
        <Copyright />
      </div>
    </div>
  );
}
