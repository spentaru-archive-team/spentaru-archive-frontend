import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import LocationRow from "./LocationRow";

export default function LocationTable({
  locations,
  onEditClick,
  onDeleteClick,
  getNumRows,
}) {
  return (
    <>
      <div className="overflow-hidden rounded-sm border border-border/80">
        <Table className="text-sm text-muted-foreground">
          <TableHeader className="bg-muted/35">
            <TableRow className="hover:bg-muted/35">
              <TableHead>No</TableHead>
              <TableHead>Judul Arsip</TableHead>
              <TableHead>Lemari</TableHead>
              <TableHead>Rak</TableHead>
              <TableHead>Nomor Slot</TableHead>
              <TableHead>Kode Label</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-card">
            {locations?.data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  Lokasi arsip tidak ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              locations?.data?.map((location, index) => (
                <LocationRow
                  index={getNumRows(index)}
                  key={location.id}
                  location={location}
                  onEditClick={onEditClick}
                  onDeleteClick={onDeleteClick}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
