import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import ArchiveRow from "./ArchiveRow";

export default function ArchiveTable({
  archives,
  statusStyles,
  onDetailClick,
  onEditClick,
  onDeleteClick,
}) {
  return (
    <>
      <div className="overflow-hidden rounded-sm border border-border/80">
        <Table className="text-sm text-muted-foreground">
          <TableHeader className="bg-muted/35">
            <TableRow className="hover:bg-muted/35">
              <TableHead>No</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Tahun</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Subkategori</TableHead>
              <TableHead>Status Retensi</TableHead>
              <TableHead>File Arsip</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {archives?.data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  Tidak ada arsip yang ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              archives?.data?.map((archive, index) => (
                <ArchiveRow
                  index={index}
                  key={archive.id}
                  archive={archive}
                  statusStyles={statusStyles}
                  onDetailClick={onDetailClick}
                  onEditClick={onEditClick}
                  onDeleteClick={onDeleteClick}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
