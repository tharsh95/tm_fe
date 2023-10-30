import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RestoreIcon from "@mui/icons-material/Restore";
import axios from "axios";

const Trash = () => {
  // Sample data for the table
  const [tableData, setTableData] = useState([]);
  // Add more rows as needed

  const handleRecover =async (id) => {
    const url = `http://localhost:3000/tasks/recover/${id}`;
    const {data}  =await axios.post(url);
    console.log(data)
    setTableData(data.data.data);
  };
  const fetchTasks = async () => {
    const url = "http://localhost:3000/tasks/trash";
    const { data } = await axios.get(url);
    setTableData(data.data);
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <>
      <Typography>Deleted Tasks </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assignee</TableCell>
              <TableCell>Deleted By</TableCell>
              <TableCell>Recover</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell><a href={row.link} target="_blank" style={{textDecoration:'none',color:'blue'}}>Link</a></TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.login.name}</TableCell>
                <TableCell>{row.deletedBy}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleRecover(row.id)}
                  >
                    <RestoreIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Trash;
