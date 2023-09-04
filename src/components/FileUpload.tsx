"use client";

import { Trash2, UploadCloud } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface FileUploadProps {
  id: string;
}

interface FileProps {
  name: string;
  size: number;
  type: string;
}

export function FileUpload({ id }: FileUploadProps) {
  const [file, setFile] = useState<FileProps | null>(null);

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    setFile(e.target.files[0]);
  }

  function handleDeleteFileUploaded() {
    setFile(null);
  }

  return (
    <div className="group relative flex flex-col gap-2">
      <label
        htmlFor={id}
        className="border-primary hover:bg-primary-light focus:bg-primary-light group-focus-within:bg-primary-light flex h-[147px] w-full max-w-[434px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 px-2 transition"
      >
        <UploadCloud />

        <span className="text-center text-lg font-medium">
          Anexe o arquivo para envio
        </span>
      </label>

      <input
        type="file"
        name={id}
        id={id}
        className="invisible absolute inset-0 cursor-pointer opacity-0"
        onChange={handleFileUpload}
      />

      {file && (
        <div className="bg-primary-light flex w-full max-w-[434px] items-center justify-between rounded-lg px-4 py-3">
          <span className="text-sm font-medium">{file.name}</span>

          <button onClick={handleDeleteFileUploaded}>
            <Trash2 />
          </button>
        </div>
      )}
    </div>
  );
}
