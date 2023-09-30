import Link from "next/link";
import { CheckCircle2, ChevronRight, Circle } from "lucide-react";

interface StepCardProps {
  to: string;
  completed: boolean;
  title: string;
  alert: boolean;
}

export function StepCard({ to, completed, title, alert }: StepCardProps) {
  return (
    <Link
      href={`/registro/${to}`}
      className={`flex items-center gap-3 px-3 py-5 rounded-md border-2 bg-[#FAFCF9] outline-none transition hover:border-primary focus:border-primary
        ${alert ? "border-red" : "border-gray-light"}
      `}
    >
      <div>
        {!completed ? <Circle className="stroke-gray/90" /> : <CheckCircle2 className="stroke-green" />}
      </div>

      <span className="w-full text-lg">{title}</span>

      <div>
        <ChevronRight className="stroke-gray/90" />
      </div>
    </Link>
  );
}
