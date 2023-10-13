"use client";

import { useState, ChangeEvent } from "react";
import clsx from "clsx";
import { Plus } from "lucide-react";

import { useFormStorage, Accessory } from "@/hooks/useFormStorage";

import { Select } from "@/components/form/select";
import { Input } from "@/components/form/input";
import { DialogAccessory } from "@/components/radix/dialog";

import { selectAccessory } from "@/constants/selectData";
import { inputAccessoryLabels } from "@/constants/inputsTypes";

interface AccessoryErrorProps {
  brand: string;
  model: string;
  price: string;
}

export function Accessory() {
  const { accessory, updateOrAddAccessoryData, deleteAccessory, setSelectedAccessory, selectedAccessory } = useFormStorage();

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"add" | "edit" | null>(null);
  const [openSelectAccessory, setOpenSelectAccessory] = useState(false);
  const [selectedAccessoryType, setSelectedAccessoryType] = useState("");

  const [accessorySelectAlert, setAccessorySelectAlert] = useState(false);
  const [accessoryFieldsAlert, setAccessoryFieldsAlert] = useState<AccessoryErrorProps>({
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

  const [newAccessory, setNewAccessory] = useState<Accessory>(emptyAccessoryValues);

  function handleAccessorySelectChange(newValue: string) {
    if (selectedAccessory !== null) {
      setSelectedAccessory({
        ...selectedAccessory,
        type: newValue,
      });
    } else {
      setSelectedAccessoryType(newValue);
    }
  }

  function handleAccessorySelect() {
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
      [name]: +value <= 0 ? "Insira um valor válido" : !value ? "Campo obrigatório" : "",
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
      price: +accessory.price.value <= 0 ? "Insira um valor válido" : !accessory.price.value ? "Campo obrigatório" : "",
    };

    setAccessoryFieldsAlert(updatedAlerts);

    return accessory.brand.value === "" || accessory.model.value === "" || accessory.price.value === "" || +accessory.price.value <= 0;
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
        updateOrAddAccessoryData(newBikeAccessory, false);

        setNewAccessory(emptyAccessoryValues);
        setSelectedAccessoryType("");
        setOpenDialog(false);
      }
    }
  }

  function handleDeleteAccessory() {
    deleteAccessory(selectedAccessory);
    setOpenDialog(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-medium">Acessórios</h2>

      {accessory.map((item) => (
        <div
          key={item.model.id}
          className="group flex items-center justify-between h-14 w-full px-3 border-2 border-gray-light rounded text-lg outline-none transition"
        >
          <span>{item.type}</span>
          <button
            onClick={() => openAccessoryDialog(item)}
            className="px-4 py-1 rounded-md bg-primary text-base text-white outline-none hover:bg-primary-dark focus:bg-primary-dark"
          >
            Editar
          </button>
        </div>
      ))}

      <button
        onClick={() => openAccessoryDialog(null)}
        className={clsx(
          "flex items-center justify-between w-full p-3 border-2 border-gray-light rounded outline-none transition",
          "text-left text-lg",
          "hover:bg-primary-light focus:bg-primary-light",
        )}
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
              onOpenChange={handleAccessorySelect}
              onValueChange={handleAccessorySelectChange}
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
                  error={accessoryFieldsAlert[input.id as keyof AccessoryErrorProps]}
                  required
                />
              ) : null;
            })}
          </>
        ) : (
          <>
            <Select
              open={openSelectAccessory}
              onOpenChange={handleAccessorySelect}
              onValueChange={handleAccessorySelectChange}
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
                  error={accessoryFieldsAlert[input.id as keyof AccessoryErrorProps]}
                  required
                />
              ) : null;
            })}
          </>
        )}
      </DialogAccessory>
    </div>
  );
}
