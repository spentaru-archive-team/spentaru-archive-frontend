import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, KeyRound, Trash2 } from "lucide-react";
import React from "react";

export default function StorageRuleRow({ rule }) {
  return (
    <TableRow className="hover:bg-muted/20">
      <TableCell className="font-medium text-foreground">{rule.id}</TableCell>
      <TableCell>{rule.category}</TableCell>
      <TableCell>{rule.subcategory}</TableCell>
      <TableCell>{rule.cabinet}</TableCell>
      <TableCell>{rule.priority}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Edit Storage Rule"
                className="h-9 w-fit px-3 py-2 text-sm shadow-none"
                variant="secondary"
                size="sm"
              >
                <Edit />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Storage Rule</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Delete Storage Rule"
                className="h-9 w-fit px-3 py-2 text-sm shadow-none"
                variant="destructive"
                size="sm"
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hapus Storage Rule</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  );
}
