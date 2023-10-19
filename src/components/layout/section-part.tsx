"use client";

import { useState, ChangeEvent, useEffect } from "react";
import clsx from "clsx";
import { Plus } from "lucide-react";

import { useFormStorage, Part } from "@/hooks/useFormStorage";

import { Select } from "@/components/form/select";
import { Input } from "@/components/form/input";
import { DialogBikeItem } from "@/components/radix/dialog";

import { selectAccessory } from "@/constants/selectData";
import { inputBikeItemsLabels } from "@/constants/inputsTypes";

interface PartAlertProps {
  brand: string;
  model: string;
  price: string;
}

export function Part() {
  const { part, updateOrAddPartData, deletePart, setSelectedPart, selectedPart } = useFormStorage();

  const [openDialogPart, setOpenDialogPart] = useState(false);
  const [dialogType, setDialogType] = useState<"add" | "edit" | null>(null);

  const [openSelectPart, setOpenSelectPart] = useState(false);
  const [selectValuePart, setSelectValuePart] = useState("");
  const [selectAlertPart, setSelectAlertPart] = useState(false);

  const emptyPartValues = {
    type: "",
    brand: { id: "", value: "" },
    model: { id: "", value: "" },
    price: { id: "", value: "" },
  };
  const [newPart, setNewPart] = useState<Part>(emptyPartValues);

  const [partFieldsAlert, setPartFieldsAlert] = useState<PartAlertProps>({
    brand: "",
    model: "",
    price: "",
  });

  function handleOpenDialogPart(item: Part | null) {
    if (item) {
      setSelectedPart(item);
      setDialogType("edit");
    } else {
      setDialogType("add");
    }

    setOpenDialogPart(true);
  }

  function handleSelectState() {
    if (selectAlertPart) setSelectAlertPart(!selectAlertPart);
    setOpenSelectPart(!openSelectPart);
  }

  function handleSelectChange(newValue: string) {
    if (selectedPart !== null) {
      setSelectedPart({
        ...selectedPart,
        type: newValue,
      });
    } else {
      setSelectValuePart(newValue);
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, id } = event.target;

    if (selectedPart !== null) {
      setSelectedPart({
        ...selectedPart,
        [name]: { id: id, value: value },
      });
    } else {
      setNewPart({
        ...newPart,
        [name]: { id: id, value: value },
      });
    }

    const updatedAlerts = {
      ...partFieldsAlert,
      [name]: +value <= 0 ? "Insira um valor válido" : !value ? "Campo obrigatório" : "",
    };
    setPartFieldsAlert(updatedAlerts);
  }

  function getFieldValues(part: Part, field: keyof Part) {
    const fieldValue = part[field];

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

  function hasEmptyValues(part: Part) {
    const updatedAlerts = {
      brand: part.brand.value ? "" : "Campo obrigatório",
      model: part.model.value ? "" : "Campo obrigatório",
      price: +part.price.value <= 0 ? "Insira um valor válido" : !part.price.value ? "Campo obrigatório" : "",
    };

    setPartFieldsAlert(updatedAlerts);

    return part.brand.value === "" || part.model.value === "" || part.price.value === "" || +part.price.value <= 0;
  }

  function handleSaveChanges() {
    if (selectedPart !== null) {
      const isAllPartFieldFilled = hasEmptyValues(selectedPart);

      if (!isAllPartFieldFilled) {
        updateOrAddPartData(selectedPart, true);
        setOpenDialogPart(false);
      }
    } else {
      const isAllPartFieldFilled = hasEmptyValues(newPart);
      const isPartTypeSelected = selectValuePart !== "";

      if (!isPartTypeSelected) {
        setSelectAlertPart(true);
      }

      if (!isAllPartFieldFilled && isPartTypeSelected) {
        const newBikePart = {
          ...newPart,
          type: selectValuePart,
        } as Part;
        updateOrAddPartData(newBikePart, false);

        setNewPart(emptyPartValues);
        setSelectValuePart("");
        setOpenDialogPart(false);
      }
    }
  }

  function handleDelete() {
    deletePart(selectedPart);
    setOpenDialogPart(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-medium">Peças personalizadas</h2>

      {part.map((item) => (
        <div
          key={item.model.id}
          className="group flex items-center justify-between h-14 w-full px-3 border-2 border-gray-light rounded text-lg outline-none transition"
        >
          <span>{item.type}</span>
          <button
            onClick={() => handleOpenDialogPart(item)}
            className="px-4 py-1 rounded-md bg-primary text-base text-white outline-none hover:bg-primary-dark focus:bg-primary-dark"
          >
            Editar
          </button>
        </div>
      ))}

      <button
        onClick={() => handleOpenDialogPart(null)}
        className={clsx(
          "flex items-center justify-between w-full p-3 border-2 border-gray-light rounded outline-none transition",
          "text-left text-lg",
          "hover:bg-primary-light focus:bg-primary-light"
        )}
      >
        Adicionar peça
        <Plus />
      </button>

      <DialogBikeItem
        open={openDialogPart}
        setOpen={setOpenDialogPart}
        type={dialogType}
        title="peça"
        onSubmit={handleSaveChanges}
        onDelete={handleDelete}
      >
        {selectedPart ? (
          <>
            <Select
              open={openSelectPart}
              onOpenChange={handleSelectState}
              onValueChange={handleSelectChange}
              value={selectedPart.type}
              data={selectAccessory}
            />

            {inputBikeItemsLabels.map((input) => {
              const field = input.id as keyof Part;
              const fieldValues = getFieldValues(selectedPart, field);

              return newPart[field] !== undefined ? (
                <Input
                  type={input.type}
                  id={fieldValues.id}
                  name={input.id}
                  key={input.id}
                  label={input.label}
                  value={fieldValues.value}
                  onChange={handleInputChange}
                  error={partFieldsAlert[input.id as keyof PartAlertProps]}
                  required
                />
              ) : null;
            })}
          </>
        ) : (
          <>
            <Select
              open={openSelectPart}
              onOpenChange={handleSelectState}
              onValueChange={handleSelectChange}
              value={selectValuePart}
              alert={selectAlertPart}
              data={selectAccessory}
            />

            {inputBikeItemsLabels.map((input) => {
              const field = input.id as keyof Part;
              const uniqueId = Math.random().toString(36).substring(7);
              const fieldValues = getFieldValues(newPart, field);

              return newPart[field] !== undefined ? (
                <Input
                  type={input.type}
                  id={uniqueId}
                  name={input.id}
                  key={input.id}
                  label={input.label}
                  value={fieldValues.value}
                  onChange={handleInputChange}
                  error={partFieldsAlert[input.id as keyof PartAlertProps]}
                  required
                />
              ) : null;
            })}
          </>
        )}
      </DialogBikeItem>
    </div>
  );
}
