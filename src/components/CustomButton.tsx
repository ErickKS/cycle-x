import Link from "next/link";

interface CustomButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type: "solid" | "outline";
  additionalClass?: string;
}

export function CustomButton({
  href,
  onClick,
  children,
  type,
  additionalClass,
}: CustomButtonProps) {
  if (additionalClass === undefined) additionalClass = "";

  if (href) {
    return (
      <Link
        href={href}
        className={`
          flex items-center justify-center rounded py-2 text-center text-lg font-semibold outline-none transition
          ${
            type === "solid"
              ? "bg-primary text-white hover:bg-primary-dark focus:bg-primary-dark"
              : "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 focus:bg-primary/10"
          }
          ${additionalClass}
        `}
      >
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`
          flex items-center justify-center rounded py-2 text-center text-lg font-semibold outline-none transition
          ${
            type === "solid"
              ? "bg-primary text-white hover:bg-primary-dark focus:bg-primary-dark"
              : "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 focus:bg-primary/10"
          }
          ${additionalClass}
        `}
      >
        {children}
      </button>
    );
  }

  return null;
}
