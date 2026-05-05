import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArchivePreviewSkeleton() {
  return (
    <section className="mt-5 space-y-4">
      <div className="rounded-sm border border-border/80 bg-card p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-3 w-28 rounded-sm" />
            <Skeleton className="h-6 w-72 max-w-full rounded-sm" />
            <Skeleton className="h-4 w-36 rounded-sm" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-9 w-24 rounded-sm" />
            <Skeleton className="h-9 w-32 rounded-sm" />
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-border/80 bg-card p-3 md:p-4">
        <div className="min-h-[70vh] space-y-3 rounded-sm border border-border/80 bg-muted/10 p-3">
          <Skeleton className="h-4 w-44 rounded-sm" />
          <Skeleton className="h-[60vh] w-full rounded-sm" />
        </div>
      </div>

      <Skeleton className="h-4 w-40 rounded-sm" />
    </section>
  );
}
