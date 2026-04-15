import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import EventRow from "./EventRow";

export default function EventTable({ events, statusStyles }) {
  return (
    <div className="overflow-hidden rounded-sm border border-border/80 bg-white">
      <Table className="lg:overflow-x-hidden min-w-280 text-sm text-muted-foreground">
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
          {events.map((event) => (
            <EventRow key={event.id} event={event} statusStyles={statusStyles} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
