import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import StorageRuleRow from "./StorageRuleRow";

export default function StorageRuleTable({
  storageRules,
  onEditClick,
  onDeleteClick,
  getNumRows,
}) {
  return (
    <div className="overflow-hidden rounded-sm border border-border/80 bg-card">
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

        <TableBody className="bg-card">
          {storageRules?.data?.map((rule, index) => (
            <StorageRuleRow
              index={getNumRows(index)}
              key={rule.id}
              rule={rule}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
