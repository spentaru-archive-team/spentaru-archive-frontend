import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, Trash2, Archive, Layers } from "lucide-react";
import React from "react";

export default function PhysicalLocationCard({ cabinet }) {
  return (
    <Card className="py-0 rounded-sm border border-border/80 bg-white shadow-none ring-0 overflow-hidden transition-all hover:border-primary/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-3 border-b border-border/50 bg-muted/10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-primary/12 bg-primary/6 text-primary">
            <Archive size={18} />
          </div>
          <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
            Lemari {cabinet.cabinet_number} - {cabinet.name}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {cabinet.racks.length > 0 ? (
          <div className="space-y-3">
            {cabinet.racks.map((rack) => {
              const usagePercent = Math.round(
                (rack.used_capacity / rack.capacity) * 100,
              );
              const isFull = usagePercent >= 100;
              const isHigh = usagePercent >= 80;

              return (
                <div key={rack.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-medium">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Layers size={12} className="text-primary/70" />
                      <span>Rak {rack.rack_number}</span>
                    </div>
                    <span
                      className={
                        isFull
                          ? "text-destructive"
                          : isHigh
                            ? "text-orange-500"
                            : "text-primary font-semibold"
                      }
                    >
                      {rack.used_capacity}/{rack.capacity}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull
                          ? "bg-destructive"
                          : isHigh
                            ? "bg-orange-500"
                            : "bg-primary"
                      }`}
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <p className="text-xs text-muted-foreground italic">
              Belum ada rak
            </p>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Edit Physical Location"
                className="w-1/2 border-none py-0"
                variant="secondary"
                size="sm"
              >
                <Edit size={16} />
                
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Lokasi</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Delete Physical Location"
                className="w-1/2 border-none py-0"
                variant="destructive"
                size="sm"
              >
                <Trash2 size={16} />
                
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hapus Lokasi</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
}
