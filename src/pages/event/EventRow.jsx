import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { CalendarDays, Edit, Eye, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function EventRow({ event, statusStyles }) {
  const eventDate = new Date(event.date);
  const option = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = eventDate.toLocaleDateString("id-ID", option);
  
  return (
    <TableRow className="hover:bg-muted/20">
      <TableCell className="font-medium text-foreground">{event.id}</TableCell>
      <TableCell className='text-foreground font-semibold'>{event.title}</TableCell>
      <TableCell className="text-foreground max-w-24 whitespace-pre-wrap">
        {event.user.name}
      </TableCell>
      <TableCell className="text-foreground">{formattedDate}</TableCell>
      <TableCell>
        <span
          className={`inline-flex rounded-sm border px-2.5 py-1 text-xs font-semibold ${
            statusStyles[event.status]
          }`}
        >
          {event.status === "upcoming"
            ? "Akan Datang"
            : event.status === "ongoing"
              ? "Berlangsung"
              : "Selesai"}
        </span>
      </TableCell>
      <TableCell>
        <span
          className={`flex gap-1 flex-col w-fit rounded-sm border px-2.5 py-1 text-xs font-semibold ${
            statusStyles[event.status_upload]
          }`}
        >
          {event.status_upload === "pending_upload"
            ? "Belum Diunggah"
            : "Sudah Diunggah"}
        </span>
        {event.status_upload === "pending_upload" && (
          <Link
            to={`/event/${event.id}/upload`}
            className="text-xs! ml-2 hover:underline text-muted-foreground"
          >
            Upload Arsip
          </Link>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
            variant="outline"
          >
            <Eye />
          </Button>
          <Button
            className="h-9 w-fit px-3 py-2 text-sm shadow-none"
            variant="secondary"
            size="sm"
          >
            <Edit />
          </Button>
          <Button
            className="h-9 w-fit px-3 py-2 text-sm shadow-none"
            variant="destructive"
            size="sm"
          >
            <Trash2 />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
