"use client";

import { Banner } from "@/components/Banner";
import { Input } from "@/components/Input";
import { Dialog } from "@/components/Dialog";
import { Actions } from "@/patterns/Actions";

import { inputDadosLabels, inputAddressLabels } from "@/constants/inputsTypes";

export default function Dados() {
  function handleClientDocs() {}

  function handleAddAddress() {}

  return (
    <>
      <Banner
        title="Formulário de cadastro"
        text="Preencha o formulário a seguir com seus dados pessoais."
      />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          {inputDadosLabels.map((input) => (
            <Input
              type={input.type}
              id={input.id}
              key={input.id}
              label={input.label}
              error={input.error}
              required
            />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium">Endereço</h2>

          <Dialog
            onClick={handleAddAddress}
            triggerText="Adicionar endereço"
            title="Endereço"
          >
            {inputAddressLabels.map((input) => (
              <Input
                type={input.type}
                id={input.id}
                key={input.id}
                label={input.label}
                error={input.error}
                required={input.id !== "comp"}
              />
            ))}
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Actions onStepCompletion={handleClientDocs} />
      </div>
    </>
  );
}
