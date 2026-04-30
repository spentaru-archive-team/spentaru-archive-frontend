import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import StorageRuleRow from "./StorageRuleRow";

export default function StorageRuleTable({ storageRules }) {
  return (
    <div className="overflow-hidden rounded-sm border border-border/80 bg-white">
      <Table className="text-sm text-muted-foreground">
        <TableHeader className="bg-muted/35">
          <TableRow className="hover:bg-muted/35">
            <TableHead>No</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Subkategori</TableHead>
            <TableHead>Lemari</TableHead>
            <TableHead>Prioritas</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {storageRules?.data?.map((rule) => (
            <StorageRuleRow
              key={rule.id}
              rule={rule}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
