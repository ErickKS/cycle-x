import { ReactNode } from "react";

interface BannerProps {
  children: ReactNode;
}

function BannerRoot({ children }: BannerProps) {
  return <div>{children}</div>;
}

function BannerTitle({ children }: BannerProps) {
  return <h1 className="text-3xl font-semibold sm:text-4xl">{children}</h1>;
}

function BannerText({ children }: BannerProps) {
  return <p className="mt-2 text-lg sm:text-xl">{children}</p>;
}

function BannerAlert({ children }: BannerProps) {
  return <span className="mt-1 text-sm font-semibold text-red leading-none">{children}</span>;
}

export const Banner = {
  Root: BannerRoot,
  Title: BannerTitle,
  Text: BannerText,
  Alert: BannerAlert,
};
