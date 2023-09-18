"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import { useRegister } from "@/hooks/useRegister";
import { Photo, Photos } from "@/contexts/RegisterContext";

import { Banner } from "@/components/Banner";
import { FileUpload } from "@/components/FileUpload";
import { Actions } from "@/patterns/Actions";
import { uploadFilesComponents } from "@/constants/uploadFiles";

export default function Foto() {
  const { photos, updatePhotosData } = useRegister();
  const [validationClicked, setValidationClicked] = useState(false);

  const router = useRouter();

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const { files, name } = event.target;
    if (!files) return;

    const newPhotoData: Photo = {
      name: files[0].name,
      size: files[0].size,
      type: files[0].type,
    };

    updatePhotosData({
      ...photos,
      [name]: newPhotoData,
    });
  }

  function handleDeleteFileUploaded(photo: string) {
    const deletedPhoto: Photo = {
      name: "",
      size: "",
      type: "",
    };

    updatePhotosData({
      ...photos,
      [photo as keyof Photos]: deletedPhoto,
    });
  }

  function areAllPhotosFilled(photos: Photos): boolean {
    for (const key in photos) {
      const photo = photos[key as keyof Photos];
      if (!photo.name || !photo.size || !photo.type) {
        return false;
      }
    }
    return true;
  }

  function handleBikePhotos() {
    setValidationClicked(true);

    const isAllPhotosFilled = areAllPhotosFilled(photos);

    if (isAllPhotosFilled) router.push("/registro");
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <Banner
          title="Envie as fotos da bike"
          text="Tire ou anexe fotos da sua bike para nossa IA analisá-las."
        />

        <span className="text-sm font-semibold text-red">
          Lembre-se de tirar a foto da sua bike em um fundo neutro para
          facilitar a validação.
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {uploadFilesComponents.map(({ label, id }) => {
          return (
            <div className="space-y-1" key={id}>
              <h2 className="text-lg font-medium">{label}</h2>

              <FileUpload
                id={id}
                file={photos[id as keyof Photos]}
                onChange={handleFileChange}
                onDeleteFile={() => handleDeleteFileUploaded(id)}
                alert={
                  validationClicked && photos[id as keyof Photos].name === ""
                }
              />
            </div>
          );
        })}
      </div>

      <div className="xs:grid-cols-2 grid gap-4">
        <Actions onStepCompletion={handleBikePhotos} />
      </div>
    </>
  );
}
