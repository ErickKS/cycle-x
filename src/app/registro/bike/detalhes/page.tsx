"use client";

import { Banner } from "@/components/layout/banner";
import { Actions } from "@/components/layout/actions";
import { Accessory } from "@/components/layout/section-accessory";
import { useRouter } from "next/navigation";

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
      </Banner.Root>

      <div className="flex flex-col gap-6">
        <Accessory />
      </div>

      <div className="grid gap-4 xs:grid-cols-2">
        <Actions to="/registro/bike" onStepCompletion={handleParts} />
      </div>
    </>
  );
}
