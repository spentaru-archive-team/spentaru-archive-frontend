import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  const statItems = Array.from({ length: 4 });
  const activityItems = Array.from({ length: 4 });
  const notificationItems = Array.from({ length: 3 });

  return (
    <section className="space-y-6">
      <div className="space-y-3 p-7! sm:px-6">
        <Skeleton className="h-8 w-72 rounded-sm" />
        <Skeleton className="h-4 w-xl max-w-full rounded-sm" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statItems.map((_, index) => (
          <Card
            key={`stat-skeleton-${index}`}
            className="rounded-sm border border-border/80 bg-card py-0 ring-0"
          >
            <CardContent className="px-5 py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-28 rounded-sm" />
                  <Skeleton className="h-8 w-16 rounded-sm" />
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-primary/12 bg-primary/6 text-primary">
                  <Skeleton className="h-6 w-6 rounded-sm" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <Card className="rounded-sm border border-border/80 bg-card py-0 ring-0">
          <CardHeader className="gap-2 border-b border-border/70 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-2">
                <Skeleton className="h-6 w-40 rounded-sm" />
                <Skeleton className="h-4 w-72 rounded-sm" />
              </div>
              <Skeleton className="hidden h-6 w-20 rounded-sm sm:block" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-5 py-5">
            {activityItems.map((_, index) => (
              <div
                key={`activity-skeleton-${index}`}
                className="flex items-start justify-between gap-4 rounded-sm border border-border/80 bg-muted/20 px-4 py-3"
              >
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-[80%] rounded-sm" />
                  <Skeleton className="h-3 w-[55%] rounded-sm" />
                </div>
                <Skeleton className="h-3 w-14 shrink-0 rounded-sm" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-sm border border-border/80 bg-card py-0 ring-0">
          <CardHeader className="gap-2 border-b border-border/70 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-2">
                <Skeleton className="h-6 w-28 rounded-sm" />
                <Skeleton className="h-4 w-64 rounded-sm" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-5 py-5">
            {notificationItems.map((_, index) => (
              <div
                key={`notification-skeleton-${index}`}
                className="flex items-start justify-between gap-4 rounded-sm border border-warning/80 bg-warning px-4 py-3"
              >
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-[78%] rounded-sm" />
                  <Skeleton className="h-3 w-[50%] rounded-sm" />
                </div>
                <Skeleton className="h-3 w-14 shrink-0 rounded-sm" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
