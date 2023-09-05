"use client";

import { Banner } from "@/components/Banner";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Dialog } from "@/components/Dialog";
import { Actions } from "@/patterns/Actions";

import { inputBikeLabels } from "@/constants/inputsTypes";
import { selectAccessory, selectBike } from "@/constants/selectData";

export default function Bike() {
  function handleAddAccessory() {}

  function handleBikeData() {}

  return (
    <>
      <Banner
        title="Sua bike"
        text="Preencha o formulário abaixo com as informações da sua bike."
      />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Select data={selectBike} />

          {inputBikeLabels.map((input) => (
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
          <h2 className="text-xl font-medium">Acessórios</h2>

          <Dialog
            onClick={handleAddAccessory}
            triggerText="Adicionar acessório"
            title="Adicionar acessório"
          >
            <Select data={selectAccessory} />

            <Input type="text" id="brand" label="Marca" error="" required />
            <Input type="text" id="model" label="Modelo" error="" required />
            <Input type="number" id="value" label="Valor" error="" required />
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Actions onStepCompletion={handleBikeData} />
      </div>
    </>
  );
}