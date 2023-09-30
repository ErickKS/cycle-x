import Image from "next/image";

export function Header() {
  return (
    <header className="flex">
      <Image src={"/logo.svg"} alt="logo" width={203} height={36} priority />
    </header>
  );
}
