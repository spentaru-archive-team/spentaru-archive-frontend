import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { CalendarDays, Edit, Eye, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function EventRow({
  index,
  event,
  statusStyles,
  onDetailClick,
  onEditClick,
  onDeleteClick,
}) {
  const eventDate = new Date(event.date);
  const option = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = eventDate.toLocaleDateString("id-ID", option);

  return (
    <TableRow className="hover:bg-muted/20">
      <TableCell className="font-medium text-foreground">{index}</TableCell>
      <TableCell className="text-foreground font-semibold">
        {event.title}
      </TableCell>
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
          {event.status === "ongoing"
            ? "Berlangsung"
            : event.status === "done" || event.status === "completed"
              ? "Selesai"
              : "Akan Datang"}
        </span>
      </TableCell>
      <TableCell>
        <span
          className={`flex gap-1 flex-col w-fit rounded-sm border px-2.5 py-1 text-xs font-semibold ${
            statusStyles[event.softfile_status]
          }`}
        >
          {event.softfile_status === "pending_upload"
            ? "Belum Diunggah"
            : "Sudah Diunggah"}
        </span>
        {event.softfile_status === "pending_upload" && (
          <Link
            to={`/archives`}
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
            onClick={() => onDetailClick?.(event)}
            type="button"
          >
            <Eye />
          </Button>
          <Button
            className="h-9 w-fit px-3 py-2 text-sm shadow-none"
            variant="secondary"
            size="sm"
            onClick={() => onEditClick?.(event)}
            type="button"
          >
            <Edit />
          </Button>
          <Button
            className="h-9 w-fit px-3 py-2 text-sm shadow-none"
            variant="destructive"
            size="sm"
            onClick={() => onDeleteClick?.(event)}
            type="button"
          >
            <Trash2 />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
