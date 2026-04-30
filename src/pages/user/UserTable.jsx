import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import UserRow from "./UserRow";

export default function UserTable({
  users,
  onDeleteClick,
  onEditClick,
  roleStyles,
  onResetPasswordClick,
}) {
  return (
    <div className="overflow-hidden rounded-sm border border-border/80 bg-white">
      <Table className="text-sm text-muted-foreground">
        <TableHeader className="bg-muted/35">
          <TableRow className="hover:bg-muted/35">
            <TableHead>No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Mata Pelajaran</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Login Terakhir</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {users?.data?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center text-muted-foreground"
              >
                User tidak ditemukan.
              </TableCell>
            </TableRow>
          ) : (
            users?.data?.map((user, index) => (
              <UserRow
                key={user.id}
                index={index}
                user={user}
                roleStyles={roleStyles}
                onDeleteClick={onDeleteClick}
                onEditClick={onEditClick}
                onResetPasswordClick={onResetPasswordClick}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
