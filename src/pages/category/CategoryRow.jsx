import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, FileSearch, FileText, Trash2 } from "lucide-react";
import React from "react";

export default function CategoryRow({ category, statusStyles }) {
  return (
    <>
      <TableRow key={category.id} className="hover:bg-muted/20">
        <TableCell className=" font-medium text-foreground">
          {category.id}
        </TableCell>
        <TableCell>
          <p className="font-semibold text-foreground whitespace-normal">
            {category.title}
          </p>
        </TableCell>
        <TableCell className=" text-foreground">{category.year}</TableCell>
        <TableCell className=" text-foreground">{category.category}</TableCell>
        <TableCell className=" text-foreground">
          {category.subcategory}
        </TableCell>
        <TableCell>
          <span
            className={`inline-flex rounded-sm border px-2.5 py-1 text-xs font-semibold ${
              statusStyles[category.status]
            }`}
          >
            {category.status === 'pending_upload' ? 'Menunggu Upload' : 'Telah Upload'}
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
            <Button
              variant="outline"
              className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
            >
              <FileSearch />
            </Button>
            <Button
              className="h-9 w-fit px-3 py-2 text-sm shadow-none"
              size="sm"
            >
              <Edit />
            </Button>
            <Button
              className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
              variant="secondary"
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
