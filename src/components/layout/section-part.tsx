"use client";

import Image from "next/image";
import { useState, ChangeEvent, useRef, KeyboardEvent } from "react";
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

  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const photoRef = useRef<HTMLImageElement | null>(null);

  const [openDialogPart, setOpenDialogPart] = useState(false);
  const [dialogType, setDialogType] = useState<"add" | "edit" | null>(null);

  const [photoAlertPart, setPhotoAlertPart] = useState(false);

  const [openSelectPart, setOpenSelectPart] = useState(false);
  const [selectValuePart, setSelectValuePart] = useState("");
  const [selectAlertPart, setSelectAlertPart] = useState(false);

  const emptyPartValues = {
    photo: { file: null, previewURL: "" },
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

  function handleLabelKeyDown(event: KeyboardEvent<HTMLLabelElement>) {
    if (event.key === "Enter" && inputFileRef.current) inputFileRef.current.click();
  }

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) return;

    setPhotoAlertPart(false);

    const file = files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    if (selectedPart !== null) {
      setSelectedPart({
        ...selectedPart,
        photo: { file, previewURL: url },
      });
    } else {
      photoRef.current?.setAttribute("src", url);
      photoRef.current?.setAttribute("fill", "true");
      photoRef.current?.removeAttribute("height");
      photoRef.current?.removeAttribute("width");
      photoRef.current?.nextElementSibling?.classList.add("none");

      setNewPart({
        ...newPart,
        photo: { file, previewURL: url },
      });
    }
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

  function getFieldValues(part: Part, field: "brand" | "model" | "price") {
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

      if (newPart.photo.file === null || newPart.photo.previewURL === null) {
        setPhotoAlertPart(true);
      }

      if (!isPartTypeSelected) {
        setSelectAlertPart(true);
      }

      if (!isAllPartFieldFilled && isPartTypeSelected) {
        const newBikePart = {
          ...newPart,
          type: selectValuePart,
        } as Part;
        updateOrAddPartData(newBikePart, false);

        photoRef.current?.setAttribute("src", "/svg/camera.svg");
        photoRef.current?.setAttribute("height", "48");
        photoRef.current?.setAttribute("width", "48");
        photoRef.current?.removeAttribute("fill");
        photoRef.current?.nextElementSibling?.classList.add("block");

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
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-medium">Foto da peça</h2>

              <label
                htmlFor="part"
                tabIndex={0}
                onKeyDown={handleLabelKeyDown}
                className={clsx(
                  "relative flex flex-col items-center justify-center gap-2 h-[112px] w-full px-2 py-2 border-2 rounded overflow-hidden cursor-pointer outline-none transition",
                  "hover:bg-primary-light focus:border-primary focus:bg-primary-light group-focus-within:bg-primary-light",
                  { "border-red": photoAlertPart },
                  { "border-gray-light": !photoAlertPart }
                )}
              >
                <Image src={selectedPart.photo.previewURL} alt="" fill className="object-cover" />
              </label>

              <input
                id="part"
                ref={inputFileRef}
                type="file"
                name="part"
                onChange={handleImageUpload}
                accept="image/*"
                capture="environment"
                className="invisible absolute inset-0 cursor-pointer opacity-0"
              />
            </div>

            <Select
              open={openSelectPart}
              onOpenChange={handleSelectState}
              onValueChange={handleSelectChange}
              value={selectedPart.type}
              data={selectAccessory}
            />

            {inputBikeItemsLabels.map((input) => {
              const field = input.id as "brand" | "model" | "price";
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
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-medium">Foto da peça</h2>

              <div className="group relative">
                <label
                  htmlFor="part"
                  tabIndex={1}
                  onKeyDown={handleLabelKeyDown}
                  className={clsx(
                    "relative flex flex-col items-center justify-center gap-2 h-[112px] w-full py-2 border-2 rounded overflow-hidden cursor-pointer outline-none",
                    "hover:bg-primary-light focus:border-primary focus:bg-primary-light group-focus-within:bg-primary-light",
                    { "border-red": photoAlertPart },
                    { "border-gray-light": !photoAlertPart }
                  )}
                >
                  <Image
                    ref={photoRef}
                    src={"/svg/camera.svg"}
                    blurDataURL={"/svg/camera.svg"}
                    height={48}
                    width={48}
                    placeholder="blur"
                    alt="h-auto w-auto rounded"
                  />

                  <span className="text-center font-medium">Clique para ativar a câmera</span>
                </label>

                <input
                  id="part"
                  ref={inputFileRef}
                  type="file"
                  name="part"
                  onChange={handleImageUpload}
                  accept="image/*"
                  capture="environment"
                  className="invisible absolute inset-0 cursor-pointer opacity-0"
                />
              </div>
            </div>

            <Select
              open={openSelectPart}
              onOpenChange={handleSelectState}
              onValueChange={handleSelectChange}
              value={selectValuePart}
              alert={selectAlertPart}
              data={selectAccessory}
            />

            {inputBikeItemsLabels.map((input) => {
              const field = input.id as "brand" | "model" | "price";
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
