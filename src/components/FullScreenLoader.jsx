import { Skeleton } from "@/components/ui/skeleton";

export default function FullScreenLoader() {
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center">
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-4 w-60" />
    </div>
  );
}
