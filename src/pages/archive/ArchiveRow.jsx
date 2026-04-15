import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Edit, Eye, FileText, Trash2 } from "lucide-react";
import React from "react";

export default function ArchiveRow({ archive, statusStyles }) {
  return (
    <>
      <TableRow className="hover:bg-muted/20">
        <TableCell className=" font-medium text-foreground">
          {archive.row_num}
        </TableCell>
        <TableCell>
          <p className="font-semibold text-foreground whitespace-normal">
            {archive.title}
          </p>
        </TableCell>
        <TableCell className=" text-foreground">{archive.year}</TableCell>
        <TableCell className=" text-foreground">
          {archive.category_id}
        </TableCell>
        <TableCell className=" text-foreground">
          {archive.subcategory_id}
        </TableCell>
        <TableCell>
          <span
            className={`inline-flex rounded-sm border px-2.5 py-1 text-xs font-semibold ${
              statusStyles[archive.status]
            }`}
          >
            {archive.status === "pending_upload"
              ? "Menunggu Upload"
              : "Telah Upload"}
          </span>
        </TableCell>
        <TableCell>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80 hover:underline"
          >
            <FileText size={16} />
            Lihat File
          </a>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
                  variant="outline"
                >
                  <Eye />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Lihat Detail</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="h-9 w-fit px-3 py-2 text-sm shadow-none"
                  variant="secondary"
                >
                  <Edit />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Arsip</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="h-9 w-fit px-3 py-2 text-sm shadow-none"
                  variant="destructive"
                >
                  <Trash2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Hapus Arsip</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
