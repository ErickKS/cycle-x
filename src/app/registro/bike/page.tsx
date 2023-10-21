"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";

import { useValidate } from "@/hooks/useValidate";
import { useFormStorage, Bike } from "@/hooks/useFormStorage";

import { Banner } from "@/components/layout/banner";
import { Actions } from "@/components/layout/actions";
import { Select } from "@/components/form/select";
import { Input } from "@/components/form/input";

import { inputBikeLabels } from "@/constants/inputsTypes";
import { selectBikeType, selectBikeBrand } from "@/constants/selectData";

export default function Bike() {
  const { bike, updateDataByStage } = useFormStorage();
  const router = useRouter();

  // ========== VALIDATIONS
  const validationBike = useValidate<Bike>({
    initialValues: bike,
    validate: (values) => {
      const errors: { [key: string]: string } = {
        model: "",
        chassi: "",
        price: "",
        usage: "",
      };

      if (!values.model) errors.model = "Campo obrigatório";

      if (!values.chassi) errors.chassi = "Campo obrigatório";

      if (!values.price) {
        errors.price = "Campo obrigatório";
      } else if (+values.price < 0) {
        errors.price = "Insira um valor válido";
      } else if (+values.price < 2000) {
        errors.price = "O valor da bike precisa ser maior que R$2000";
      } else if (+values.price > 100000) {
        errors.price = "O valor da bike precisa ser menor que R$100000";
      }

      if (!values.usage) {
        errors.usage = "Campo obrigatório";
      } else if (+values.usage < 0) {
        errors.usage = "Insira um valor válido";
      } else if (+values.usage > 3 && selectedBikeType === "Elétrica") {
        errors.usage = "Cobrimos bikes elétricas de até 3 anos de uso.";
      } else if (+values.usage > 8 && selectedBikeType === "Tradicional") {
        errors.usage = "Cobrimos bikes tradicionais de até 8 anos de uso.";
      }

      return errors;
    },
  });

  // ========== SELECT COMPONENTS
  const [openBikeSelectType, setOpenBikeSelectType] = useState(false);
  const [selectedBikeType, setSelectedBikeType] = useState<string>(bike.type);
  const [selectedBikeTypeAlert, setSelectedBikeTypeAlert] = useState(false);

  const [openBikeSelectBrand, setOpenBikeSelectBrand] = useState(false);
  const [selectedBikeBrand, setSelectedBikeBrand] = useState<string>(bike.brand);
  const [selectedBikeBrandAlert, setSelectedBikeBrandAlert] = useState(false);

  function handleBikeSelectChange(value: string, field: string) {
    if (field === "type") setSelectedBikeType(value);
    if (field === "brand") setSelectedBikeBrand(value);
  }

  function handleBikeSelectValidations() {
    if (selectedBikeType === "Elétrica" && +validationBike.values.usage > 3) {
      validationBike.touched.usage = true;
      validationBike.errors.usage = "Cobrimos bikes elétricas de até 3 anos de uso.";
    }
    if (selectedBikeType === "Tradicional" && +validationBike.values.usage > 8) {
      validationBike.touched.usage = true;
      validationBike.errors.usage = "Cobrimos bikes tradicional de até 8 anos de uso.";
    }
  }

  function handleBikeSelect(field: string) {
    if (field === "type") {
      if (selectedBikeTypeAlert) setSelectedBikeTypeAlert(!selectedBikeTypeAlert);
      setOpenBikeSelectType(!openBikeSelectType);
    }

    if (field === "brand") {
      if (selectedBikeBrandAlert) setSelectedBikeBrandAlert(!selectedBikeBrandAlert);
      setOpenBikeSelectBrand(!openBikeSelectBrand);
    }
  }

  // ========== SAVING CHANGES (DATA LOSS PREVENTION)
  function savingChanges() {
    const newBikeData = {
      ...validationBike.values,
      type: selectedBikeType,
      brand: selectedBikeBrand,
    } as Bike;

    updateDataByStage("bike", newBikeData);

    router.push("/registro/bike/detalhes");
  }

  // ========== SUBMIT STEP
  function handleBikeDocs() {
    if (!selectedBikeType) setSelectedBikeTypeAlert(true);
    if (!selectedBikeBrand) setSelectedBikeBrandAlert(true);

    handleBikeSelectValidations();

    const isValidBike = Object.values(validationBike.errors).every((error) => !error);

    if (!isValidBike) validationBike.handleSubmit();

    if (selectedBikeType && selectedBikeBrand && isValidBike) {
      const newBikeData = {
        ...validationBike.values,
        type: selectedBikeType,
        brand: selectedBikeBrand,
      } as Bike;

      updateDataByStage("bike", newBikeData);

      router.push("/registro");
    }
  }

  return (
    <>
      <Banner.Root>
        <Banner.Title>Sua bike</Banner.Title>
        <Banner.Text>Preencha o formulário abaixo com as informações da sua bike.</Banner.Text>
      </Banner.Root>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Select
            open={openBikeSelectType}
            onOpenChange={() => handleBikeSelect("type")}
            onValueChange={(value) => handleBikeSelectChange(value, "type")}
            value={selectedBikeType}
            alert={selectedBikeTypeAlert}
            data={selectBikeType}
          />

          <Select
            open={openBikeSelectBrand}
            onOpenChange={() => handleBikeSelect("brand")}
            onValueChange={(value) => handleBikeSelectChange(value, "brand")}
            value={selectedBikeBrand}
            alert={selectedBikeBrandAlert}
            data={selectBikeBrand}
          />

          {inputBikeLabels.map((input) => {
            const field = input.id as keyof Bike;

            return validationBike.values[field] !== undefined ? (
              <Input
                type={input.type}
                id={input.id}
                name={input.id}
                key={input.id}
                label={input.label}
                value={validationBike.values[field]}
                onChange={validationBike.handleChange}
                error={validationBike.touched[field] && validationBike.errors[field]}
                required
              />
            ) : null;
          })}
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">Possui acessórios ou peças personalizadas?</h2>

          <button
            onClick={savingChanges}
            className={clsx(
              "flex items-center justify-between w-full p-3 border-2 border-gray-light rounded outline-none transition",
              "text-left text-lg",
              "hover:bg-primary-light focus:bg-primary-light"
            )}
          >
            Personalizações
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="grid gap-4 xs:grid-cols-2">
        <Actions onStepCompletion={handleBikeDocs} />
      </div>
    </>
  );
}
