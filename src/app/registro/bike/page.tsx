"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { useValidate } from "@/hooks/useValidate";
import { useRegister } from "@/hooks/useRegister";
import { Accessory, Bike } from "@/contexts/RegisterContext";

import { Banner } from "@/components/Banner";
import { Select } from "@/components/Select";
import { Input } from "@/components/Input";
import { DialogAccessory } from "@/components/Dialog";
import { Actions } from "@/patterns/Actions";
import { inputAccessoryLabels, inputBikeLabels } from "@/constants/inputsTypes";
import { selectBike, selectAccessory } from "@/constants/selectData";

interface AccessoryErrorProps {
  brand: string;
  model: string;
  price: string;
}

export default function Bike() {
  const {
    bike,
    updateBikeData,
    accessory,
    updateOrAddAccessoryData,
    deleteAccessoryData,
    setSelectedAccessory,
    selectedAccessory,
  } = useRegister();
  const router = useRouter();

  // ========== BIKE
  const [openSelectBike, setOpenSelectBike] = useState(false);
  const [selectedBikeBrand, setSelectedBikeBrand] = useState<string>(
    bike.brand,
  );
  const [selectedBikeBrandAlert, setSelectedBikeBrandAlert] = useState(false);

  const validationBike = useValidate<Bike>({
    initialValues: bike,
    validate: (values) => {
      const errors: { [key: string]: string } = {
        model: "",
        year: "",
        chassi: "",
        price: "",
      };

      if (!values.model) errors.model = "Campo obrigatório";

      if (!values.year) {
        errors.year = "Campo obrigatório";
      } else if (+values.year < 1980) {
        errors.year = "Bicicleta muito antiga para a contratação.";
      } else if (+values.year > new Date().getFullYear()) {
        errors.year = "Por favor, insira um ano válido";
      }

      if (!values.chassi) errors.chassi = "Campo obrigatório";

      if (!values.price) {
        errors.price = "Campo obrigatório";
      } else if (+values.price < 2000) {
        errors.price = "O valor da bike precisa ser maior que R$2000";
      }

      return errors;
    },
  });

  function handleBikeSelectChange(value: string) {
    setSelectedBikeBrand(value);
  }

  function handleSelectBike() {
    if (selectedBikeBrandAlert)
      setSelectedBikeBrandAlert(!selectedBikeBrandAlert);
    setOpenSelectBike(!openSelectBike);
  }

  // ========== ACCESSORY
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"add" | "edit" | null>(null);
  const [openSelectAccessory, setOpenSelectAccessory] = useState(false);
  const [selectedAccessoryType, setSelectedAccessoryType] = useState("");

  const [accessorySelectAlert, setAccessorySelectAlert] = useState(false);
  const [accessoryFieldsAlert, setAccessoryFieldsAlert] =
    useState<AccessoryErrorProps>({
      brand: "",
      model: "",
      price: "",
    });

  const emptyAccessoryValues = {
    type: "",
    brand: { id: "", value: "" },
    model: { id: "", value: "" },
    price: { id: "", value: "" },
  };
  const [newAccessory, setNewAccessory] =
    useState<Accessory>(emptyAccessoryValues);

  function handleSelectAccessoryChange(newValue: string) {
    if (selectedAccessory !== null) {
      setSelectedAccessory({
        ...selectedAccessory,
        type: newValue,
      });
    } else {
      setSelectedAccessoryType(newValue);
    }
  }

  function handleSelectAccessory() {
    if (accessorySelectAlert) setAccessorySelectAlert(!accessorySelectAlert);
    setOpenSelectAccessory(!openSelectAccessory);
  }

  function handleAccessoryInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, id } = event.target;

    if (selectedAccessory !== null) {
      setSelectedAccessory({
        ...selectedAccessory,
        [name]: { id: id, value: value },
      });
    } else {
      setNewAccessory({
        ...newAccessory,
        [name]: { id: id, value: value },
      });
    }

    const updatedAlerts = {
      ...accessoryFieldsAlert,
      [name]: value ? "" : "Campo obrigatório",
    };
    setAccessoryFieldsAlert(updatedAlerts);
  }

  function openAccessoryDialog(item: Accessory | null) {
    if (item) {
      setSelectedAccessory(item);
      setDialogType("edit");
    } else {
      setDialogType("add");
    }

    setOpenDialog(true);
  }

  function getFieldValues(accessory: Accessory, field: keyof Accessory) {
    const fieldValue = accessory[field];

    if (fieldValue && typeof fieldValue === "object") {
      return {
        id: fieldValue.id,
        value: fieldValue.value,
      };
    } else {
      return {
        id: "",
        value: fieldValue as string | number,
      };
    }
  }

  function hasEmptyValues(accessory: Accessory) {
    const updatedAlerts = {
      brand: accessory.brand.value ? "" : "Campo obrigatório",
      model: accessory.model.value ? "" : "Campo obrigatório",
      price: accessory.price.value ? "" : "Campo obrigatório",
    };

    setAccessoryFieldsAlert(updatedAlerts);

    return (
      accessory.brand.value === "" ||
      accessory.model.value === "" ||
      accessory.price.value === ""
    );
  }

  function handleSaveChanges() {
    if (selectedAccessory !== null) {
      const isAllAccessoryFieldFilled = hasEmptyValues(selectedAccessory);

      if (!isAllAccessoryFieldFilled) {
        updateOrAddAccessoryData(selectedAccessory, true);
        setOpenDialog(false);
      }
    } else {
      const isAllAccessoryFieldFilled = hasEmptyValues(newAccessory);
      const isAccessoryTypeSelected = selectedAccessoryType !== "";

      if (!isAccessoryTypeSelected) {
        setAccessorySelectAlert(true);
      }

      if (!isAllAccessoryFieldFilled && isAccessoryTypeSelected) {
        const newBikeAccessory = {
          ...newAccessory,
          type: selectedAccessoryType,
        } as Accessory;
        updateOrAddAccessoryData(newBikeAccessory);

        setNewAccessory(emptyAccessoryValues);
        setSelectedAccessoryType("");
        setOpenDialog(false);
      }
    }
  }

  function handleDeleteAccessory() {
    deleteAccessoryData(selectedAccessory);
    setOpenDialog(false);
  }

  // ========== SUBMIT STEP
  function handleBikeDocs() {
    const isValidBike = Object.values(validationBike.errors).every(
      (error) => !error,
    );

    if (!selectedBikeBrand) setSelectedBikeBrandAlert(true);
    if (!isValidBike) validationBike.handleSubmit();

    if (selectedBikeBrand && isValidBike) {
      const newUserData = {
        ...validationBike.values,
        brand: selectedBikeBrand,
      } as Bike;
      updateBikeData(newUserData);
      router.push("/registro");
    }
  }

  return (
    <>
      <Banner
        title="Sua bike"
        text="Preencha o formulário abaixo com as informações da sua bike."
      />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Select
            open={openSelectBike}
            onOpenChange={handleSelectBike}
            onValueChange={handleBikeSelectChange}
            value={selectedBikeBrand}
            alert={selectedBikeBrandAlert}
            data={selectBike}
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
                error={
                  validationBike.touched[field] && validationBike.errors[field]
                }
                required
              />
            ) : null;
          })}
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-medium">Acessórios</h2>

          {accessory.map((item) => (
            <div
              key={item.model.id}
              className="group flex h-14 w-full items-center justify-between rounded border-2 border-gray-light px-3 text-lg outline-none transition"
            >
              <span>{item.type}</span>
              <button
                className="rounded-md bg-primary px-4 py-1 text-base text-white outline-none hover:bg-primary-dark focus:bg-primary-dark"
                onClick={() => openAccessoryDialog(item)}
              >
                Editar
              </button>
            </div>
          ))}

          <button
            className="flex w-full items-center justify-between rounded border-2 border-gray-light p-3 text-left text-lg outline-none transition hover:bg-primary-light focus:bg-primary-light"
            onClick={() => openAccessoryDialog(null)}
          >
            Adicionar acessório
            <Plus />
          </button>

          <DialogAccessory
            open={openDialog}
            setOpen={setOpenDialog}
            type={dialogType}
            title="acessório"
            onSubmit={handleSaveChanges}
            onDelete={handleDeleteAccessory}
          >
            {selectedAccessory ? (
              <>
                <Select
                  open={openSelectAccessory}
                  onOpenChange={handleSelectAccessory}
                  onValueChange={handleSelectAccessoryChange}
                  value={selectedAccessory.type}
                  data={selectAccessory}
                />

                {inputAccessoryLabels.map((input) => {
                  const field = input.id as keyof Accessory;
                  const fieldValues = getFieldValues(selectedAccessory, field);

                  return newAccessory[field] !== undefined ? (
                    <Input
                      type={input.type}
                      id={fieldValues.id}
                      name={input.id}
                      key={input.id}
                      label={input.label}
                      value={fieldValues.value}
                      onChange={handleAccessoryInputChange}
                      error={
                        accessoryFieldsAlert[
                          input.id as keyof AccessoryErrorProps
                        ]
                      }
                      required
                    />
                  ) : null;
                })}
              </>
            ) : (
              <>
                <Select
                  open={openSelectAccessory}
                  onOpenChange={handleSelectAccessory}
                  onValueChange={handleSelectAccessoryChange}
                  value={selectedAccessoryType}
                  alert={accessorySelectAlert}
                  data={selectAccessory}
                />

                {inputAccessoryLabels.map((input) => {
                  const field = input.id as keyof Accessory;
                  const uniqueId = Math.random().toString(36).substring(7);
                  const fieldValues = getFieldValues(newAccessory, field);

                  return newAccessory[field] !== undefined ? (
                    <Input
                      type={input.type}
                      id={uniqueId}
                      name={input.id}
                      key={input.id}
                      label={input.label}
                      value={fieldValues.value}
                      onChange={handleAccessoryInputChange}
                      error={
                        accessoryFieldsAlert[
                          input.id as keyof AccessoryErrorProps
                        ]
                      }
                      required
                    />
                  ) : null;
                })}
              </>
            )}
          </DialogAccessory>
        </div>
      </div>

      <div className="xs:grid-cols-2 grid gap-4">
        <Actions onStepCompletion={handleBikeDocs} />
      </div>
    </>
  );
}
