import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { STORAGE_URL } from "@/config/api";
import { Edit, Trash2 } from "lucide-react";
import React from "react";

export default function LocationRow({ location, onEditClick, onDeleteClick }) {
  const archiveTitle = location?.archive?.title || location?.archive || "-";
  const cabinetName = location?.cabinet?.name || location?.cabinet || "-";
  const rackName = location?.rack?.name || `Rak ${location?.rack?.rack_number || "-"}`;

  return (
    <>
      <TableRow className="hover:bg-muted/20">
        <TableCell className=" font-medium text-foreground">
          {location.id}
        </TableCell>
        <TableCell>
          <a href={`${STORAGE_URL}${location?.archive?.files?.file_url}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground whitespace-normal hover:underline">
            {archiveTitle}
          </a>
        </TableCell>
        <TableCell className=" text-foreground">
          {cabinetName}
        </TableCell>
        <TableCell className=" text-foreground">
          {rackName}
        </TableCell>
        <TableCell className=" text-foreground">
          {location.slot_number}
        </TableCell>
        <TableCell className=" text-foreground">
          {location.label_code}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button
              className="h-9 w-fit px-3 py-2 text-sm shadow-none"
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => onEditClick?.(location)}
            >
              <Edit />
            </Button>
            <Button
              className="h-9 w-fit px-3 py-2 text-sm shadow-none"
              variant="destructive"
              size="sm"
              type="button"
              onClick={() => onDeleteClick?.(location)}
            >
              <Trash2 />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
