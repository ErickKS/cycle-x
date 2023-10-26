"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCamera } from "@/hooks/useCamera";

import { Copyright } from "@/components/layout/copyright";
import { Button } from "@/components/button";
import { DialogAlert } from "@/components/radix/dialog";

export default function Home() {
  const { hasCamera, getCamera } = useCamera();
  const [cameraAlert, setCameraAlert] = useState(false);
  const router = useRouter();

  async function checkAccessToCamera() {
    if (!hasCamera) {
      getCamera();

      setCameraAlert(true);
      return;
    }

    router.push("/registro");
  }

  return (
    <>
      <main className="flex max-w-[498px] justify-center sm:flex-col sm:gap-4">
        <div className="absolute inset-0 -top-8 h-[200px] w-full rounded-[30px] bg-blue sm:hidden" />

        <div className="flex flex-col gap-4 rounded-xl px-6 pb-10 pt-28 sm:gap-10 sm:bg-white sm:p-8 sm:pt-16 sm:shadow-main">
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-8 rounded-md bg-white p-5 shadow-main sm:absolute sm:-top-[114px]">
              <Image src={"/logo-single.svg"} width={56} height={56} alt="logo" />
            </div>

            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold">Bem vindo!</h1>
              <p className="text-lg">Você está na area de contratação de seguro de bikes.</p>
            </div>
          </div>

          <Button onClick={checkAccessToCamera} type="solid" customStyles="w-fit px-6 mx-auto mt-auto mb-10 sm:mb-0">
            Começar contratação
          </Button>
        </div>

        <div className="mx-auto">
          <Copyright />
        </div>
      </main>

      {cameraAlert && <DialogAlert open={cameraAlert} setOpen={setCameraAlert} />}
    </>
  );
}
