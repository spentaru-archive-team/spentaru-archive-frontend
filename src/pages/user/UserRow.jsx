import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, KeyRound, Trash2, UserRoundCheck } from "lucide-react";
import React from "react";

export default function UserRow({ user, roleStyles }) {
  return (
    <TableRow className="hover:bg-muted/20">
      <TableCell className="font-medium text-foreground">{user.id}</TableCell>
      <TableCell>
        <div className="min-w-44">
          <p className="font-semibold text-foreground whitespace-normal">
            {user.name}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </div>
      </TableCell>
      <TableCell className="text-foreground">
        <span
          className={`inline-flex rounded-sm border px-2.5 py-1 text-xs font-semibold ${
            roleStyles[user.role]
          }`}
        >
          {user.role}
        </span>
      </TableCell>
      <TableCell className="text-foreground">{user.last_login_at ?? "-"}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Reset Password"
                className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
              >
                <KeyRound />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset Password</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Edit User"
                className="h-9 w-fit px-3 py-2 text-sm shadow-none"
                variant="secondary"
                size="sm"
              >
                <Edit />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit User</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Delete User"
                className="h-9 w-fit px-3 py-2 text-sm shadow-none"
                variant="destructive"
                size="sm"
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hapus User</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  );
}
