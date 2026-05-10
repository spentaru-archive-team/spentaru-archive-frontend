import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, KeyRound, Trash2 } from "lucide-react";
import React from "react";

export default function UserRow({
  index,
  user,
  roleStyles,
  onDeleteClick,
  onEditClick,
  onResetPasswordClick,
}) {
  return (
    <TableRow className="hover:bg-muted/20">
      <TableCell className="font-medium text-foreground">{index}</TableCell>
      <TableCell>
        <p className="font-semibold text-foreground whitespace-normal">
          {user.name}
        </p>
      </TableCell>
      <TableCell className="text-foreground">{user.subject}</TableCell>
      <TableCell className="text-foreground">{user.position}</TableCell>
      <TableCell className="text-foreground">{user.username}</TableCell>
      <TableCell className="text-foreground">
        <span
          className={`inline-flex rounded-sm border px-2.5 py-1 text-xs font-semibold ${
            roleStyles[user.role]
          }`}
        >
          {user.role}
        </span>
      </TableCell>
      <TableCell className="text-foreground">
        {user.last_login_at ?? "-"}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Reset Password"
                className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
                onClick={() => onResetPasswordClick(user)}
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
                onClick={() => onEditClick(user)}
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
                onClick={() => onDeleteClick(user)}
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
