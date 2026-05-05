import {
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import EventRow from "./EventRow";

export default function EventTable({
  events,
  statusStyles,
  onDetailClick,
  onEditClick,
  onDeleteClick,
  getNumRows,
}) {
  return (
    <div className="overflow-hidden rounded-sm border border-border/80 bg-white">
      <Table className="lg:overflow-x-hidden text-sm text-muted-foreground">
        <TableHeader className="bg-muted/35">
          <TableRow className="hover:bg-muted/35">
            <TableHead>No</TableHead>
            <TableHead>Judul Event</TableHead>
            <TableHead>Penanggung Jawab</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Status Upload</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {events?.data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground">
                Event tidak ditemukan.
              </TableCell>
            </TableRow>
          ) : (
            events?.data?.map((event, index) => (
              <EventRow
                index={getNumRows(index)}
                key={event.id}
                event={event}
                statusStyles={statusStyles}
                onDetailClick={onDetailClick}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
