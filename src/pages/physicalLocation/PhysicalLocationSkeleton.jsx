import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PhysicalLocationSkeleton({ racks = 3 }) {
  return (
    <Card className="py-0 rounded-sm border border-border/80 bg-white shadow-none ring-0 overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-3 border-b border-border/50 bg-muted/10">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-sm" />
          <Skeleton className="h-4 w-40" />
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-4 space-y-4">
        {/* Rack List */}
        <div className="space-y-3">
          {[...Array(racks)].map((_, i) => (
            <div key={i} className="space-y-2">
              {/* Label + Capacity */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-12" />
              </div>

              {/* Progress Bar */}
              <Skeleton className="h-1.5 w-full rounded-full" />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-8 w-1/2 rounded-sm" />
          <Skeleton className="h-8 w-1/2 rounded-sm" />
        </div>
      </CardContent>
    </Card>
  );
}
