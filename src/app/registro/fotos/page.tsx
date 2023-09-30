"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Photos } from "@/contexts/RegisterContext";
import { useRegister } from "@/hooks/useRegister";

import { Banner } from "@/components/layout/banner";
import { Actions } from "@/components/layout/actions";
import { FileUpload } from "@/components/file-upload";
import { Toast } from "@/components/toast";
import { DialogAlert } from "@/components/dialog";

import { uploadFilesComponents } from "@/constants/uploadFiles";

export default function Foto() {
  const { photos } = useRegister();

  const [cameraAlert, setCameraAlert] = useState(false);
  const [toastActive, setToastActive] = useState(false);
  const [validationClicked, setValidationClicked] = useState(false);

  const [uploadErrors, setUploadErrors] = useState(false);

  const router = useRouter();

  useEffect(() => {
    for (const category in photos) {
      if (photos[category as keyof Photos].errors >= 3) {
        setUploadErrors(true);
        break;
      }
    }
  }, [photos])

  useEffect(() => {
    checkAccessToCamera();
  }, []);

  async function checkAccessToCamera() {
    try {
      const mediaCamera = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      mediaCamera.getTracks().forEach((track) => track.stop());
    } catch {
      setCameraAlert(true);
    }
  }

  function handleToast() {
    setToastActive(false);
    setTimeout(() => setToastActive(true), 100);
  }

  function areAllPhotosAnnexed(photos: Photos): boolean {
    const isReadyToSave = Object.values(photos).every((photo) => photo.status === "valid");

    return isReadyToSave;
  }

  function handleBikePhotos() {
    setValidationClicked(true);
    const isAllPhotosAnnexed = areAllPhotosAnnexed(photos);

    if (!isAllPhotosAnnexed) handleToast();

    if (isAllPhotosAnnexed) router.push("/registro");
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <Banner
          title="Envie as fotos da bike"
          description="Tire as fotos da sua bike para nossa IA analisá-las."
        />

        <span className="text-sm font-semibold text-red">
          Lembre-se de tirar as fotos em um fundo neutro para facilitar a validação.
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {uploadFilesComponents.map(({ label, id }) => {
          const status = ["waiting", "invalid", "error"]
          const isNotValidStatus = status.includes(photos[id as keyof Photos].status);

          return (
            <div className="space-y-1" key={id}>
              <h2 className="text-lg font-medium">{label}</h2>

              <FileUpload
                category={id as keyof Photos}
                requirement={validationClicked && isNotValidStatus}
              />
            </div>
          );
        })}

        {uploadErrors && (
          <a href="#" className="inline text-center font-medium text-primary underline outline-primary" target="_blank">
            Não está conseguindo validar sua bike?
            <br />
            Clique aqui!
          </a>
        )}
      </div>

      <div className="grid gap-4 xs:grid-cols-2">
        <Actions onStepCompletion={handleBikePhotos} />
      </div>

      <div className="right-1/5 -translate-x-1/5 fixed top-0 pt-4 md:right-0">
        <Toast
          open={toastActive}
          onOpenChange={() => setToastActive(!toastActive)}
          alert={"Certifique-se de que todas as fotos estejam anexadas e/ou válidas."}
        />
      </div>

      {cameraAlert && <DialogAlert open={cameraAlert} block />}
    </>
  );
}
