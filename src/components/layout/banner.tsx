interface BannerProps {
  title: string;
  description: string;
}

export function Banner({ title, description }: BannerProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
      <p className="text-lg sm:text-xl">{description}</p>
    </div>
  );
}
