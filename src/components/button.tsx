import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  type: "solid" | "outline";
  customStyles?: string;
  children: ReactNode;
}

export function Button({ href, onClick, children, type, customStyles }: ButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={clsx(
          "flex items-center justify-center rounded py-2 outline-none transition",
          "text-center text-lg font-semibold",
          {"bg-primary text-white hover:bg-primary-dark focus:bg-primary-dark": type === "solid"},
          {"border-2 border-primary bg-transparent text-primary hover:bg-primary/10 focus:bg-primary/10": type === "outline"},
          customStyles
        )}
      >
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={clsx(
          "flex items-center justify-center rounded py-2 outline-none transition",
          "text-center text-lg font-semibold",
          {"bg-primary text-white hover:bg-primary-dark focus:bg-primary-dark": type === "solid"},
          {"border-2 border-primary bg-transparent text-primary hover:bg-primary/10 focus:bg-primary/10": type === "outline"},
          customStyles
        )}
      >
        {children}
      </button>
    );
  }

  return null;
}
