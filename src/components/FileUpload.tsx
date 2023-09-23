import { ChangeEvent, useRef, KeyboardEvent } from "react";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  id: string;
  file: { name: string };
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDeleteFile: () => void;
  alert: boolean;
}

export function FileUpload({
  id,
  file,
  onChange,
  onDeleteFile,
  alert,
}: FileUploadProps) {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  function handleLabelKeyDown(event: KeyboardEvent<HTMLLabelElement>) {
    if (event.key === "Enter" && inputFileRef.current) {
      inputFileRef.current.click();
    }
  }

  function shortenFileName(fileName: string) {
    const maxLength = 15; // tamanho do nome

    if (fileName.length > maxLength) {
      const shortenedFileName = fileName.substring(0, maxLength);
      const finalFileName = shortenedFileName + "...";

      return <span>{finalFileName}</span>;
    }

    return <span>{fileName}</span>;
  }

  return (
    <div className="group relative flex flex-col gap-2">
      <label
        htmlFor={id}
        className={`flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 px-2 py-2 transition hover:bg-primary-light focus:bg-primary-light group-focus-within:bg-primary-light ${
          alert ? "border-red" : "border-primary"
        }`}
        tabIndex={1}
        onKeyDown={handleLabelKeyDown}
      >
        <Image src={`/bike-${id}.svg`} height={90} width={148.19} alt="" />

        <span className="text-center text-lg font-medium">
          Anexe o arquivo para envio
        </span>
      </label>

      <input
        type="file"
        name={id}
        id={id}
        onChange={onChange}
        className="invisible absolute inset-0 cursor-pointer opacity-0"
        ref={inputFileRef}
      />

      {file.name && (
        <div className="flex w-full items-center justify-between rounded bg-primary-light px-4 py-3">
          <span className="text-sm font-medium">
            {shortenFileName(file.name)}
          </span>

          <button onClick={onDeleteFile}>
            <Trash2 />
          </button>
        </div>
      )}
    </div>
  );
}
