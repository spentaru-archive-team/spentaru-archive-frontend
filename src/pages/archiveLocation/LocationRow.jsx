import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { STORAGE_URL } from "@/config/api";
import { Edit, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function LocationRow({
  index,
  location,
  onEditClick,
  onDeleteClick,
}) {
  const archiveTitle = location?.archive?.title || location?.archive || "-";
  const cabinetName = location?.cabinet?.name || location?.cabinet || "-";
  const rackName =
    location?.rack?.name || `Rak ${location?.rack?.rack_number || "-"}`;

  return (
    <>
      <TableRow className="hover:bg-muted/20">
        <TableCell className=" font-medium text-foreground">
          {index + 1}
        </TableCell>
        <TableCell>
          <Link
            to={`/archives/${location?.archive.id}/preview?file_url=${encodeURIComponent(location?.archive?.files?.file_url || "")}&file_name=${encodeURIComponent(location?.archive?.files?.file_name || "")}&title=${encodeURIComponent(location?.archive?.title || "")}`}
            state={{
              archiveId: location?.archive?.id,
              archiveTitle: location?.archive?.title || "",
              fileUrl: location?.archive?.files?.file_url || "",
              fileName: location?.archive?.files?.file_name || "",
              fileSourceUrl: `${STORAGE_URL}${location?.archive?.files?.file_url || ""}`,
            }}
            className="font-semibold text-foreground whitespace-normal hover:underline"
          >
            {archiveTitle}
          </Link>
        </TableCell>
        <TableCell className=" text-foreground">{cabinetName}</TableCell>
        <TableCell className=" text-foreground">{rackName}</TableCell>
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
