import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function StorageRuleTableSkeleton({ rows = 5 }) {
  return (
    <div className="overflow-hidden rounded-sm border border-border/80 bg-white">
      <Table className="text-sm text-muted-foreground">
        <TableHeader className="bg-muted/35">
          <TableRow className="hover:bg-muted/35">
            <TableHead>No</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Subkategori</TableHead>
            <TableHead>Lemari</TableHead>
            <TableHead>Prioritas</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {[...Array(rows)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-28" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-10" />
              </TableCell>
              <TableCell className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded-sm" />
                <Skeleton className="h-8 w-8 rounded-sm" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
