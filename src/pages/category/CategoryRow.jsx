import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, FileText, Trash2 } from "lucide-react";
import React from "react";

export default function CategoryRow({ category, onEditClick, onDeleteClick, index }) {
  return (
    <>
      <TableRow className="hover:bg-muted/20">
        <TableCell className=" font-medium text-foreground">
          {index}
        </TableCell>
        <TableCell>
          <p className="font-semibold text-foreground whitespace-normal">
            {category.name}
          </p>
        </TableCell>
        <TableCell className="max-w-xs whitespace-pre-wrap text-foreground">
          {category.description}
        </TableCell>
        <TableCell className="whitespace-normal text-foreground">
          <ul className="grid grid-cols-1 w-fit gap-1">
            {category.subcategories?.map((subcat) => (
              <li
                key={subcat.id}
                className="flex items-center gap-1 rounded-md border border-border/80 bg-muted/50 px-2 py-1 text-xs"
              >
                <FileText className="h-3 w-3" />
                {subcat.name}
              </li>
            ))}
          </ul>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button
              className="h-9 w-fit px-3 py-2 text-sm shadow-none"
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => onEditClick?.(category)}
            >
              <Edit />
            </Button>
            <Button
              className="h-9 w-fit px-3 py-2 text-sm shadow-none"
              variant="destructive"
              size="sm"
              type="button"
              onClick={() => onDeleteClick?.(category)}
            >
              <Trash2 />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
