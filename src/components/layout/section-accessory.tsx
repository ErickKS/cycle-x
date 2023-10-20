"use client";

import Image from "next/image";
import { useState, ChangeEvent, useRef, KeyboardEvent } from "react";
import clsx from "clsx";
import { Plus } from "lucide-react";

import { useFormStorage, Accessory } from "@/hooks/useFormStorage";

import { Select } from "@/components/form/select";
import { Input } from "@/components/form/input";
import { DialogBikeItem } from "@/components/radix/dialog";

import { selectAccessory } from "@/constants/selectData";
import { inputBikeItemsLabels } from "@/constants/inputsTypes";

interface AccessoryAlertProps {
  brand: string;
  model: string;
  price: string;
}

export function Accessory() {
  const { accessory, updateOrAddAccessoryData, deleteAccessory, setSelectedAccessory, selectedAccessory } = useFormStorage();

  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const photoRef = useRef<HTMLImageElement | null>(null);

  const [openDialogAccessory, setOpenDialogAccessory] = useState(false);
  const [dialogType, setDialogType] = useState<"add" | "edit" | null>(null);

  const [photoAlertAccessory, setPhotoAlertAccessory] = useState(false);

  const [openSelectAccessory, setOpenSelectAccessory] = useState(false);
  const [selectAccessoryValue, setSelectAccessoryValue] = useState("");
  const [selectAccessoryAlert, setSelectAccessoryAlert] = useState(false);

  const emptyAccessoryValues = {
    photo: { file: null, previewURL: "" },
    type: "",
    brand: { id: "", value: "" },
    model: { id: "", value: "" },
    price: { id: "", value: "" },
  };
  const [newAccessory, setNewAccessory] = useState<Accessory>(emptyAccessoryValues);

  const [accessoryFieldsAlert, setAccessoryFieldsAlert] = useState<AccessoryAlertProps>({
    brand: "",
    model: "",
    price: "",
  });

  function handleOpenDialogAccessory(item: Accessory | null) {
    if (item) {
      setSelectedAccessory(item);
      setDialogType("edit");
    } else {
      setDialogType("add");
    }

    setOpenDialogAccessory(true);
  }

  function handleLabelKeyDown(event: KeyboardEvent<HTMLLabelElement>) {
    if (event.key === "Enter" && inputFileRef.current) inputFileRef.current.click();
  }

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) return;

    setPhotoAlertAccessory(false);

    const file = files[0];
    const url = URL.createObjectURL(file);

    if (selectedAccessory !== null) {
      setSelectedAccessory({
        ...selectedAccessory,
        photo: { file, previewURL: url },
      });
    } else {
      photoRef.current?.setAttribute("src", url);
      photoRef.current?.setAttribute("fill", "true");
      photoRef.current?.removeAttribute("height");
      photoRef.current?.removeAttribute("width");
      photoRef.current?.nextElementSibling?.classList.add("none");

      setNewAccessory({
        ...newAccessory,
        photo: { file, previewURL: url },
      });
    }
  }

  function handleSelectState() {
    if (selectAccessoryAlert) setSelectAccessoryAlert(!selectAccessoryAlert);
    setOpenSelectAccessory(!openSelectAccessory);
  }

  function handleSelectChange(newValue: string) {
    if (selectedAccessory !== null) {
      setSelectedAccessory({
        ...selectedAccessory,
        type: newValue,
      });
    } else {
      setSelectAccessoryValue(newValue);
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
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

  function getFieldValues(accessory: Accessory, field: "brand" | "model" | "price") {
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
        setOpenDialogAccessory(false);
      }
    } else {
      const isAllAccessoryFieldFilled = hasEmptyValues(newAccessory);
      const isAccessoryTypeSelected = selectAccessoryValue !== "";

      if (newAccessory.photo.file === null || newAccessory.photo.previewURL === null) {
        setPhotoAlertAccessory(true);
      }

      if (!isAccessoryTypeSelected) {
        setSelectAccessoryAlert(true);
      }

      if (!isAllAccessoryFieldFilled && isAccessoryTypeSelected) {
        const newBikeAccessory = {
          ...newAccessory,
          type: selectAccessoryValue,
        } as Accessory;
        updateOrAddAccessoryData(newBikeAccessory, false);

        photoRef.current?.setAttribute("src", "/camera.svg");
        photoRef.current?.setAttribute("height", "48");
        photoRef.current?.setAttribute("width", "48");
        photoRef.current?.removeAttribute("fill");
        photoRef.current?.nextElementSibling?.classList.add("block");

        setNewAccessory(emptyAccessoryValues);
        setSelectAccessoryValue("");
        setOpenDialogAccessory(false);
      }
    }
  }

  function handleDelete() {
    deleteAccessory(selectedAccessory);
    setOpenDialogAccessory(false);
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
            onClick={() => handleOpenDialogAccessory(item)}
            className="px-4 py-1 rounded-md bg-primary text-base text-white outline-none hover:bg-primary-dark focus:bg-primary-dark"
          >
            Editar
          </button>
        </div>
      ))}

      <button
        onClick={() => handleOpenDialogAccessory(null)}
        className={clsx(
          "flex items-center justify-between w-full p-3 border-2 border-gray-light rounded outline-none transition",
          "text-left text-lg",
          "hover:bg-primary-light focus:bg-primary-light"
        )}
      >
        Adicionar acessório
        <Plus />
      </button>

      <DialogBikeItem
        open={openDialogAccessory}
        setOpen={setOpenDialogAccessory}
        type={dialogType}
        title="acessório"
        onSubmit={handleSaveChanges}
        onDelete={handleDelete}
      >
        {selectedAccessory ? (
          <>
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-medium">Foto da peça</h2>

              <label
                htmlFor="accessory"
                tabIndex={0}
                onKeyDown={handleLabelKeyDown}
                className={clsx(
                  "relative flex flex-col items-center justify-center gap-2 h-[112px] w-full px-2 py-2 border-2 rounded overflow-hidden cursor-pointer outline-none transition",
                  "hover:bg-primary-light focus:border-primary focus:bg-primary-light group-focus-within:bg-primary-light",
                  { "border-red": photoAlertAccessory },
                  { "border-gray-light": !photoAlertAccessory }
                )}
              >
                <Image src={selectedAccessory.photo.previewURL} alt="" fill className="object-cover" />
              </label>

              <input
                id="accessory"
                ref={inputFileRef}
                type="file"
                name="accessory"
                onChange={handleImageUpload}
                accept="image/*"
                capture="environment"
                className="invisible absolute inset-0 cursor-pointer opacity-0"
              />
            </div>

            <Select
              open={openSelectAccessory}
              onOpenChange={handleSelectState}
              onValueChange={handleSelectChange}
              value={selectedAccessory.type}
              data={selectAccessory}
            />

            {inputBikeItemsLabels.map((input) => {
              const field = input.id as "brand" | "model" | "price";
              const fieldValues = getFieldValues(selectedAccessory, field);

              return newAccessory[field] !== undefined ? (
                <Input
                  type={input.type}
                  id={fieldValues.id}
                  name={input.id}
                  key={input.id}
                  label={input.label}
                  value={fieldValues.value}
                  onChange={handleInputChange}
                  error={accessoryFieldsAlert[input.id as keyof AccessoryAlertProps]}
                  required
                />
              ) : null;
            })}
          </>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-medium">Foto da peça</h2>

              <div className="group relative">
                <label
                  htmlFor="accessory"
                  tabIndex={1}
                  onKeyDown={handleLabelKeyDown}
                  className={clsx(
                    "relative flex flex-col items-center justify-center gap-2 h-[112px] w-full py-2 border-2 rounded overflow-hidden cursor-pointer outline-none",
                    "hover:bg-primary-light focus:border-primary focus:bg-primary-light group-focus-within:bg-primary-light",
                    { "border-red": photoAlertAccessory },
                    { "border-gray-light": !photoAlertAccessory }
                  )}
                >
                  <Image
                    ref={photoRef}
                    src={"/camera.svg"}
                    blurDataURL={"/camera.svg"}
                    height={48}
                    width={48}
                    placeholder="blur"
                    alt="h-auto w-auto rounded"
                  />

                  <span className="text-center font-medium">Clique para ativar a câmera</span>
                </label>

                <input
                  id="accessory"
                  ref={inputFileRef}
                  type="file"
                  name="accessory"
                  onChange={handleImageUpload}
                  accept="image/*"
                  capture="environment"
                  className="invisible absolute inset-0 cursor-pointer opacity-0"
                />
              </div>
            </div>

            <Select
              open={openSelectAccessory}
              onOpenChange={handleSelectState}
              onValueChange={handleSelectChange}
              value={selectAccessoryValue}
              alert={selectAccessoryAlert}
              data={selectAccessory}
            />

            {inputBikeItemsLabels.map((input) => {
              const field = input.id as "brand" | "model" | "price";
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
                  onChange={handleInputChange}
                  error={accessoryFieldsAlert[input.id as keyof AccessoryAlertProps]}
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
