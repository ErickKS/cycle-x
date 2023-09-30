import Image from "next/image";
import { useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { AlertOctagon, CheckCircle2 } from "lucide-react";

import { Photos } from "@/contexts/RegisterContext";
import { useRegister } from "@/hooks/useRegister";

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
  const { photos, setPhotos } = useRegister();
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

  useEffect(() => {
    if (photos[category].status === "validating") {
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        [category]: {
          file: null,
          previewURL: "",
          status: "waiting",
          errors: 0
        },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleProcessResult(status: string) {
    if (status === "invalid") {
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        [category]: {
          ...prevPhotos[category],
          status,
          errors: (selectedPhoto.errors) + 1
        },
      }));
    };

    if (status === "error") {
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        [category]: {
          ...prevPhotos[category],
          file: null,
          previewURL: "",
          status,
          errors: (selectedPhoto.errors) + 1
        },
      }));
    };

    if (status === "valid") {
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        [category]: {
          ...prevPhotos[category],
          status,
          errors: 0
        },
      }));
    };
  }

  function handleLabelKeyDown(event: KeyboardEvent<HTMLLabelElement>) {
    if (event.key === "Enter" && inputFileRef.current) {
      inputFileRef.current.click();
    }
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

    setPhotos((prevPhotos) => ({
      ...prevPhotos,
      [category]: {
        ...prevPhotos[category],
        file,
        previewURL: URL.createObjectURL(file),
        status: "validating"
      },
    }));

    if (file && category !== "chassi") processImage(file)

    if (file && category === "chassi") {
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        [category]: {
          ...prevPhotos[category],
          file,
          previewURL: URL.createObjectURL(file),
          status: "valid"
        },
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
        className={`relative flex flex-col items-center justify-center gap-2 h-[160px] w-full rounded border-2 px-2 py-2 overflow-hidden cursor-pointer transition hover:bg-primary-light focus:bg-primary-light group-focus-within:bg-primary-light data-[invalid=true]:border-red data-[valid=true]:border-green
          ${requirement ? "border-red" : "border-primary"}
        `}
      >
        {selectedPhoto.previewURL ? (
          <Image src={selectedPhoto.previewURL} fill alt="" className="object-cover"/>
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
          className="group grid w-full grid-cols-[24px_1fr] items-center gap-2 rounded border-2 border-transparent bg-primary-light p-3 transition data-[invalid=true]:border-red data-[valid=true]:border-green data-[invalid=true]:bg-[#EABCC4]  data-[valid=true]:bg-[#CEE7DE]"
        >
          {selectedPhoto.status === "validating" ? (
            <svg
              aria-hidden="true"
              role="status"
              className="mr-3 inline h-4 w-4 animate-spin text-primary-dark"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#FFFFFF"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          ) : selectedStatus.icon}

          <span className="text-sm font-medium group-data-[invalid=true]:text-red group-data-[valid=true]:text-green">
            {selectedStatus.text}
          </span>
        </div>
      )}
    </div>
  );
}
