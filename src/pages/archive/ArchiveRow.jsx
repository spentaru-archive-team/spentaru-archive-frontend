import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { STORAGE_URL } from "@/config/api";
import { useAuth } from "@/hooks/use-auth";
import { ArchiveX, Edit, Eye, FileEdit, FileText, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function ArchiveRow({
  index,
  archive,
  statusStyles,
  onDetailClick,
  onEditClick,
  onDeleteClick,
}) {
  const { user } = useAuth();
  return (
    <>
      <TableRow className="hover:bg-muted/20">
        <TableCell className=" font-medium text-foreground">{index}</TableCell>
        <TableCell>
          <p className="font-semibold text-foreground whitespace-normal">
            {archive.title}
          </p>
        </TableCell>
        <TableCell className=" text-foreground">{archive.year}</TableCell>
        <TableCell className=" text-foreground max-w-48 whitespace-pre-wrap">
          {archive.category.name}
        </TableCell>
        <TableCell className=" text-foreground">
          {archive.subcategory?.name || "-"}
        </TableCell>
        <TableCell>
          <span
            className={`inline-flex rounded-sm border px-2.5 py-1 text-xs font-semibold ${
              statusStyles[archive.retention_status]
            }`}
          >
            {archive.retention_status === "active"
              ? "Aktif"
              : archive.retention_status === "ready_for_destruction"
                ? "Siap Dihapus"
                : archive.retention_status === "destroyed"
                  ? "Dihapus"
                  : archive.retention_status === "retained"
                    ? "Ditahan"
                    : "-"}
          </span>
        </TableCell>
        <TableCell>
          {archive.files?.file_name ? (
            <Link
              to={`/archives/${archive.id}/preview?file_name=${encodeURIComponent(archive?.files?.file_name || "")}&title=${encodeURIComponent(archive?.title || "")}`}
              state={{
                archiveId: archive.id,
                archiveTitle: archive?.title || "",
                fileUrl: archive?.files?.file_url || "",
                fileName: archive?.files?.file_name || "",
                fileSourceUrl: `${STORAGE_URL}${archive?.files?.file_url || ""}`,
              }}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80 hover:underline"
            >
              <FileText size={16} />
              Lihat File
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Link
                to={`/archive/${archive.event_id}/upload`}
                className="hover:underline flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-muted-foreground/80"
              >
                <FileText size={16} />
                Upload File
              </Link>
            </span>
          )}
        </TableCell>
        <TableCell>
          {user?.role === "admin" ? (
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
                    variant="outline"
                    onClick={() => onDetailClick(archive)}
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
                    onClick={() => onEditClick(archive)}
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
                    onClick={() => onDeleteClick(archive)}
                  >
                    <Trash2 />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Hapus Arsip</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center gap-2 shrink-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
                    variant="outline"
                    onClick={() => onDetailClick(archive)}
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
                    onClick={() => onEditClick(archive)}
                  >
                    <Edit />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Arsip</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
