import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const dummyData = [
  { name: "John Doe", email: "johndoe@example.com", role: "Admin", password: "********" },
  { name: "Jane Smith", email: "janesmith@example.com", role: "User", password: "********" },
  { name: "Alice Johnson", email: "alice@example.com", role: "Moderator", password: "********" },
  // Add more dummy data as needed
];

function UserTable({data}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Password</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.password}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable;
