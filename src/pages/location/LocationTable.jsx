import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import LocationRow from "./LocationRow";

export default function LocationTable({ locations }) {
  return (
    <>
      <div className="overflow-hidden rounded-sm border border-border/80">
        <Table className="text-sm text-muted-foreground">
          <TableHeader className="bg-muted/35">
            <TableRow className="hover:bg-muted/35">
              <TableHead>No</TableHead>
              <TableHead>Arsip</TableHead>
              <TableHead>Lemari</TableHead>
              <TableHead>Rak</TableHead>
              <TableHead>Nomor Slot</TableHead>
              <TableHead>Kode Label</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {locations.map((location) => (
              <LocationRow location={location} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
