import type { ReactNode } from "react";

export function PageHeader({ title, description, actions }: { title: string; description?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex min-w-0 flex-col justify-between gap-4 md:flex-row md:items-end">
      <div className="min-w-0 max-w-3xl md:flex-1">
        <h1 className="page-heading text-[25px] leading-tight sm:text-[30px]">{title}</h1>
        {description && <div className="mt-2 max-w-[72ch] text-[14px] leading-relaxed text-muted">{description}</div>}
      </div>
      {actions && <div className="flex min-w-0 max-w-full flex-wrap items-center gap-2 md:shrink-0">{actions}</div>}
    </div>
  );
}
