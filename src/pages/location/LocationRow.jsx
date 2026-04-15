import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, FileSearch, FileText, Trash2 } from "lucide-react";
import React from "react";

export default function LocationRow({ location }) {
  return (
    <>
      <TableRow key={location.id} className="hover:bg-muted/20">
        <TableCell className=" font-medium text-foreground">
          {location.id}
        </TableCell>
        <TableCell>
          <p className="font-semibold text-foreground whitespace-normal">
            {location.archive}
          </p>
        </TableCell>
        <TableCell className=" text-foreground">
          {location.cabinet}
        </TableCell>
        <TableCell className=" text-foreground">
          {location.rack}
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
    </>
  );
}
