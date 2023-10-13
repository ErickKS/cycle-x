import Image from "next/image";
import { useRef, ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import clsx from "clsx";
import { AlertOctagon, CheckCircle2 } from "lucide-react";

import { useFormStorage, Photos } from "@/hooks/useFormStorage";

import { SpinIcon } from "../spin-icon";

interface FileUploadProps {
  category: keyof Photos;
  requirement?: boolean;
}

type Status = "validating" | "valid" | "invalid" | "error";
const statusOfValidation: Record<Status, { icon: JSX.Element | null; text: string }> = {
  validating: {
    icon: null,
    text: "Validando...",
  },
  valid: {
    icon: <CheckCircle2 className="stroke-green" />,
    text: "Sucesso, a bicicleta foi validada!",
  },
  invalid: {
    icon: <AlertOctagon className="stroke-red" />,
    text: "Nenhuma bicicleta foi detectada, tente novamente!",
  },
  error: {
    icon: <AlertOctagon className="stroke-red" />,
    text: "Não foi possível realizar a análise, por favor, tente novamente!",
  },
};

export function FileUpload({ category, requirement }: FileUploadProps) {
  const { photos, updatePhotos } = useFormStorage();
  const selectedPhoto = photos[category];
  const selectedStatus = statusOfValidation[selectedPhoto.status as Status];

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  function loadImageBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  function handleProcessResult(status: string) {
    if (status === "invalid") {
      updatePhotos(category, (prevPhoto) => ({
        ...prevPhoto,
        status: status,
      }));
    }

    if (status === "error") {
      updatePhotos(category, (prevPhoto) => ({
        file: null,
        previewURL: "",
        status: status,
      }));
    }

    if (status === "valid") {
      updatePhotos(category, (prevPhoto) => ({
        ...prevPhoto,
        status: status,
      }));
    }
  }

  function handleLabelKeyDown(event: KeyboardEvent<HTMLLabelElement>) {
    if (event.key === "Enter" && inputFileRef.current) inputFileRef.current.click();
  }

  async function processImage(file: File) {
    const compressOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, compressOptions);
    const image = await loadImageBase64(compressedFile);

    try {
      const response = await axios.post("https://detect.roboflow.com/cycle-x/3", image, {
        params: {
          api_key: "9CKS54f235qhZTaHJylZ",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.data.predictions.length === 0) {
        handleProcessResult("invalid")
        return;
      }

      handleProcessResult("valid")
    } catch {
      handleProcessResult("error")
    }
  }

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) return;

    const file = files[0];

    updatePhotos(category, (prevPhoto) => ({
      ...prevPhoto,
      previewURL: URL.createObjectURL(file),
      status: "validating",
    }));

    if (file && category !== "chassi") processImage(file)

    if (file && category === "chassi") {
      updatePhotos(category, (prevPhoto) => ({
        ...prevPhoto,
        file,
        status: "valid",
      }));
    };
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
          {"border-red" : requirement},
          {"border-primary" : !requirement}
        )}
      >
        {selectedPhoto.previewURL ? (
          <Image src={selectedPhoto.previewURL} alt="" fill className="object-cover"/>
        ) : (
          <>
            <Image src={`/bike-${category}.svg`} blurDataURL={`/bike-${category}.svg`} height={90} width={148.19} placeholder="blur" alt="" className="w-auto h-auto" />

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
          data-invalid={selectedPhoto.status === "invalid" || selectedPhoto.status === "error"}
          className={clsx(
            "group grid grid-cols-[24px_1fr] items-center gap-2 w-full p-3 rounded border-2 border-transparent bg-primary-light transition",
            "data-[valid=true]:border-green data-[valid=true]:bg-[#CEE7DE]",
            "data-[invalid=true]:border-red data-[invalid=true]:bg-[#EABCC4]"
          )}
        >
          {selectedPhoto.status === "validating" ? (
            <SpinIcon/>
          ) : selectedStatus.icon}

          <span className="text-sm font-medium group-data-[invalid=true]:text-red group-data-[valid=true]:text-green">
            {selectedStatus.text}
          </span>
        </div>
      )}
    </div>
  );
}
