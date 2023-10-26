"use client";

import { useRouter } from "next/navigation";

import { Banner } from "@/components/layout/banner";
import { Actions } from "@/components/layout/actions";
import { Accessory } from "@/components/layout/section-accessory";
import { Part } from "@/components/layout/section-part";

export default function Detalhes() {
  const router = useRouter();

  function handleParts() {
    router.push("/registro/bike");
  }

  return (
    <>
      <Banner.Root>
        <Banner.Title>Detalhes adicionais </Banner.Title>
        <Banner.Text>Informe sobre os acessórios ou peças personalizadas da sua bike.</Banner.Text>
        <Banner.Alert>Lembre-se de que a foto deve destacar o acessório/peça que está sendo adicionado.</Banner.Alert>
      </Banner.Root>

      <div className="flex flex-col gap-6">
        <Accessory />

        <Part />
      </div>

      <div className="grid gap-4 xs:grid-cols-2">
        <Actions to="/registro/bike" onStepCompletion={handleParts} />
      </div>
    </>
  );
}
