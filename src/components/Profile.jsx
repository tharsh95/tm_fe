import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import {
  CardContent,
  Button,
  TextField,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useUserContext } from "../Contexts/userContext";
import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { textAlign } from "@mui/system";

const MyCard = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { user, setUser } = useUserContext();
  const [tableData,setTableData]=useState([])
  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };
  const handleSavePassword = async () => {
    if (newPassword) {
      const url = "http://localhost:3000/login/changepwd";
      const data = await axios.patch(url, { newPassword, email: user?.email });
      setIsChangingPassword(false);
      setNewPassword("");
      enqueueSnackbar("Password Succesfully changed", { variant: "success" });
    }
  };
  const fetchTasks = async () => {
    const url = `http://localhost:3000/tasks/${user?.id}`;
    console.log(user)
    const { data } = await axios.get(url);
    setTableData(data)

  };
  useEffect(() => {
    fetchTasks();
  }, [user]);
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6">Name: {user?.name}</Typography>
          <Typography variant="body1">Email: {user?.email}</Typography>
          <Typography variant="body2">Role: {user?.role}</Typography>
          {isChangingPassword ? (
            <div>
              <Grid container justifyContent="flex-end">
                <TextField
                  label="New Password"
                  variant="outlined"
                  value={newPassword}
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSavePassword}
                >
                  Save Password
                </Button>
              </Grid>
            </div>
          ) : (
            <Grid container justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleChangePassword}
              >
                Change Password
              </Button>
            </Grid>
          )}
        </CardContent>
      </Card>
      <Typography variant="h4" style={{ margin: "16px 0" ,textAlign:'center'}}>
        {`${user?.name} Tasks`}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Status</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SnackbarProvider />
    </>
  );
};

export default MyCard;
