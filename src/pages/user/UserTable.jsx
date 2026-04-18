import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import UserRow from "./UserRow";

export default function UserTable({ users, roleStyles }) {
  return (
    <div className="overflow-hidden rounded-sm border border-border/80 bg-white">
      <Table className="text-sm text-muted-foreground">
        <TableHeader className="bg-muted/35">
          <TableRow className="hover:bg-muted/35">
            <TableHead>No</TableHead>
            <TableHead>Nama User</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Login Terakhir</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {users?.data?.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              roleStyles={roleStyles}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
