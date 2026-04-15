import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import ArchiveRow from "./ArchiveRow";

export default function ArchiveTable({ archives, statusStyles }) {
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
              <TableHead>Status</TableHead>
              <TableHead>File Arsip</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {archives?.data?.map((archive) => (
              <ArchiveRow key={archive.id} archive={archive} statusStyles={statusStyles} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
