import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import CategoryRow from "./CategoryRow";

export default function CategoryTable({ categories }) {
  return (
    <>
      <div className="overflow-hidden rounded-sm border border-border/80">
        <Table className="text-sm text-muted-foreground">
          <TableHeader className="bg-muted/35">
            <TableRow className="hover:bg-muted/35">
              <TableHead>No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Subkategori</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {categories?.data?.map((category) => (
              <CategoryRow category={category} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
