"use client";

 

import { Banner } from "@/components/Banner";
import { FileUpload } from "@/components/FileUpload";
import { Actions } from "@/patterns/Actions";

 

export default function Fotos() {
  function handleBikePhotos() {}

 

  return (
<>
<Banner
        title="Envie as fotos da bike"
        text="Tire ou anexe fotos da sua bike para nossa IA analisá-las."
      />

 

      <div className="flex flex-col gap-6">
<div className="space-y-1">
<h2 className="text-lg font-medium">Foto da dianteira</h2>
<FileUpload id="file" />
</div>
<div className="space-y-1">
<h2 className="text-lg font-medium">Foto da traseira</h2>
<FileUpload id="file2" />
</div>
<div className="space-y-1">
<h2 className="text-lg font-medium">Foto da lateral direita</h2>
<FileUpload id="file3" />
</div>
<div className="space-y-1">
<h2 className="text-lg font-medium">Foto da lateral esquerda</h2>
<FileUpload id="file4" />
</div>
<div className="space-y-1">
<h2 className="text-lg font-medium">Foto do número de série*</h2>
<FileUpload id="file5" />
</div>
</div>

 

      <div className="grid gap-4 sm:grid-cols-2">
<Actions onStepCompletion={handleBikePhotos} />
</div>
</>
  );
}