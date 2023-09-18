interface BannerProps {
  title: string;
  text: string;
}

export function Banner({ title, text }: BannerProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
      <p className="text-lg sm:text-xl">{text}</p>
    </div>
  );
}
