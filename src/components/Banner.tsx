interface BannerProps {
  title: string;
  text: string;
}

export function Banner({ title, text }: BannerProps) {
  return (
    <div className="space-y-3">
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="text-xl">{text}</p>
    </div>
  );
}
