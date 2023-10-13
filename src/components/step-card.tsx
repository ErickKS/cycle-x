import Link from "next/link";
import clsx from "clsx";
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
      className={clsx(
        "flex items-center gap-3 px-3 py-5 border-2 rounded-md bg-[#FAFCF9] outline-none transition",
        "hover:border-primary focus:border-primary",
        {"border-red" : alert},
        {"border-gray-light" : !alert}
      )}
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
