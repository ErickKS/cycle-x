import NextImage from "next/image";
import { useRef, ChangeEvent, KeyboardEvent } from "react";
import clsx from "clsx";

import { detect } from "../../utils/detect";

import { useFormStorage, Photos } from "@/hooks/useFormStorage";
import { detectionResultVerification } from "@/hooks/detectionResultVerification";

import { Status, statusOfValidation } from "@/constants/statusValidation";
import { SpinIcon } from "../spin-icon";

interface FileUploadProps {
  category: keyof Photos;
  requirement?: boolean;
  model: any;
}

export function FileUpload({ category, requirement, model }: FileUploadProps) {
  const { photos, updatePhotos } = useFormStorage();
  const selectedPhoto = photos[category];
  const selectedStatus = statusOfValidation[selectedPhoto.status as Status];

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  function handleProcessResult(status: string) {
    if (status === "invalid" || status === "valid" || status === "invalid-r-side" || status === "invalid-l-side") {
      updatePhotos(category, (prevPhoto) => ({
        ...prevPhoto,
        status: status,
      }));
    }

    if (status === "error") {
      updatePhotos(category, () => ({
        file: null,
        previewURL: "",
        status: status,
      }));
    }
  }

  function handleLabelKeyDown(event: KeyboardEvent<HTMLLabelElement>) {
    if (event.key === "Enter" && inputFileRef.current) inputFileRef.current.click();
  }

  async function processImage(file: File, side: string) {
    const bikeSide = `bike-${side}`;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      const result = await detect(img, model);
      const validation = detectionResultVerification(result);

      if (validation.state) {
        if (bikeSide !== validation.bikeSide) {
          if (bikeSide === "bike-right") handleProcessResult("invalid-r-side");
          if (bikeSide === "bike-left") handleProcessResult("invalid-l-side");
        } else {
          handleProcessResult("valid");
        }
      } else {
        handleProcessResult("invalid");
      }

      URL.revokeObjectURL(img.src);
    };
  }

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const { files, name } = event.target;

    if (!files) return;

    const file = files[0];

    if (!file) return;

    updatePhotos(category, (prevPhoto) => ({
      ...prevPhoto,
      previewURL: URL.createObjectURL(file),
      status: "validating",
    }));

    if (file && category !== "chassi") processImage(file, name);

    if (file && category === "chassi") {
      updatePhotos(category, (prevPhoto) => ({
        ...prevPhoto,
        file,
        status: "valid",
      }));
    }
  }

  return (
    <div className="group relative flex flex-col gap-2">
      <label
        htmlFor={category}
        tabIndex={1}
        onKeyDown={handleLabelKeyDown}
        data-valid={selectedPhoto.status === "valid"}
        data-invalid={selectedPhoto.status === "invalid"}
        className={clsx(
          "relative flex flex-col items-center justify-center gap-2 h-[160px] w-full px-2 py-2 border-2 rounded overflow-hidden cursor-pointer transition",
          "hover:bg-primary-light focus:bg-primary-light group-focus-within:bg-primary-light",
          "data-[invalid=true]:border-red data-[valid=true]:border-green",
          { "border-red": requirement },
          { "border-primary": !requirement }
        )}
      >
        {selectedPhoto.previewURL ? (
          <NextImage src={selectedPhoto.previewURL} alt="" fill className="object-cover" />
        ) : (
          <>
            <NextImage
              src={`/svg/bike-${category}.svg`}
              blurDataURL={`/svg/bike-${category}.svg`}
              height={90}
              width={148.19}
              placeholder="blur"
              alt=""
              className="w-auto h-auto"
            />

            <span className="text-center text-lg font-medium">Clique para ativar a câmera</span>
          </>
        )}
      </label>

      <input
        id={category}
        ref={inputFileRef}
        type="file"
        name={category}
        onChange={handleImageUpload}
        accept="image/*"
        capture="environment"
        className="invisible absolute inset-0 cursor-pointer opacity-0"
      />

      {selectedPhoto.status !== "waiting" && category !== "chassi" && (
        <div
          data-valid={selectedPhoto.status === "valid"}
          data-invalid={
            selectedPhoto.status === "invalid" ||
            selectedPhoto.status === "invalid-r-side" ||
            selectedPhoto.status === "invalid-l-side" ||
            selectedPhoto.status === "error"
          }
          className={clsx(
            "group grid grid-cols-[24px_1fr] items-center gap-2 w-full p-3 rounded border-2 border-transparent bg-primary-light transition",
            "data-[valid=true]:border-green data-[valid=true]:bg-[#CEE7DE]",
            "data-[invalid=true]:border-red data-[invalid=true]:bg-[#EABCC4]"
          )}
        >
          {selectedPhoto.status === "validating" ? <SpinIcon /> : selectedStatus.icon}

          <span className="text-sm font-medium group-data-[invalid=true]:text-red group-data-[valid=true]:text-green">
            {selectedStatus.text}
          </span>
        </div>
      )}
    </div>
  );
}
