import Link from "next/link";
import { BanIcon, PlusCircleIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export const EmptyState = ({
  buttonText,
  description,
  href,
  title,
}: EmptyStateProps) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-2.5 rounded-md border-2 border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <BanIcon className="size-10 text-primary" />
      </div>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Link href={href} className={buttonVariants()}>
        <PlusCircleIcon className="size-4" />
        {buttonText}
      </Link>
    </div>
  );
};
