import { CheckCircle2, ChevronRight, Circle } from "lucide-react";
import Link from "next/link";

interface StepCardProps {
  to: string;
  completed: boolean;
  title: string;
}

export function StepCard({ to, completed, title }: StepCardProps) {
  return (
    <Link
      href={`/registro/${to}`}
      className="flex items-center gap-3 rounded-md border-2 border-gray-light bg-[#FAFCF9] px-3 py-5 outline-none transition hover:border-primary focus:border-primary"
    >
      <div>
        {!completed ? (
          <Circle className="stroke-gray/90" />
        ) : (
          <CheckCircle2 className="stroke-green" />
        )}
      </div>

      <span className="w-full text-lg">{title}</span>

      <div>
        <ChevronRight className="stroke-gray/90" />
      </div>
    </Link>
  );
}
