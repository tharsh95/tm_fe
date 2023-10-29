import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  DialogActions,
  FormHelperText,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./TaskTable.css";
import axios from "axios";

const columns = [
  { id: "title", label: "Title" },
  { id: "description", label: "Description" },
  { id: "link", label: "Link" },
  { id: "status", label: "Status" },
  { id: "assignee", label: "Assignee" },
  { id: "duedate", label: "Due Date" },
  { id: "delete", label: "Delete" },
  { id: "edit", label: "Edit" },
];

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  title: Yup.string().required("Title is required"),
  assignee: Yup.string().required("Assignee is required"),
  link: Yup.string().required("Link is required"),
});

const TaskTable = ({ tasks, setTasks }) => {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const handleDelete = (taskId) => {};
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const fetchTasks = async () => {
    const url = "http://localhost:3000/tasks";
    const { data } = await axios.get(url);
    setData(data.data);
  };
  const fetchUsers = async () => {
    const url = "http://localhost:3000/login/list";
    const {
      data: { data },
    } = await axios.get(url);

    setUsers(data);
  };
  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);
  const initialValues = {
    description: "",
    title: "",
    status: "Backlog",
    assignee: null,
    link: "",
    // duedate: selectedDate,
  };

  const handleSubmit = async (values, { resetForm }) => {
    const url = "http://localhost:3000/tasks";
    const {
      data: { data },
    } = await axios.post(url, values);
    setData(data.data);
    resetForm(initialValues);
  };
  const handleFilterBy = (e) => {
    console.log(e.target.value);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleForm}
            style={{ marginBottom: "20px" }}
          >
            {showForm ? "Hide Form" : "Show Form"}
          </Button>
        </Grid>
        <Grid item xs={12} md={6} justifyContent="space-around">
          <FormControl variant="outlined" sx={{ width: "200px" }}>
            <InputLabel htmlFor="status">Status</InputLabel>
            <Select name="status" label="Status" onChange={handleFilterBy}>
              <MenuItem value="backlog">Backlog</MenuItem>
              <MenuItem value="assignee">On Hold</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ width: "200px" }}>
            <InputLabel htmlFor="assignee">Filter</InputLabel>
            <Select name="assignee" label="Filter">
              <MenuItem value="Backlog">Backlog</MenuItem>
              <MenuItem value="WIP">WIP</MenuItem>
              <MenuItem value="On Hold">On Hold</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Dialog open={showForm} onClose={toggleForm}>
          <DialogTitle>Add Task</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={handleSubmit}
            >
              <Form>
                <Grid container spacing={2}>
                  {columns.map(
                    (column) =>
                      column.id === "delete" ||
                      column.id === "status" ||
                      column.id === "duedate" ||
                      column.id === "edit" || (
                        <Grid item xs={12} sm={6} key={column.id}>
                          <div className="table-cell">
                            {column.id === "assignee" ? (
                              <Field name="assignee">
                                {({ field, form }) => (
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor="assigne  e">
                                      Assignee
                                    </InputLabel>
                                    <Select
                                      {...field}
                                      inputProps={{
                                        id: "assignee",
                                      }}
                                      error={
                                        form.touched.assignee &&
                                        form.errors.assignee
                                      }
                                    >
                                      <MenuItem value="">
                                        Select a Assignee
                                      </MenuItem>
                                      {users.map((user) => (
                                        <MenuItem value={user.id}>
                                          {user.name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                    {form.touched.assignee &&
                                      form.errors.assignee && (
                                        <FormHelperText error>
                                          {form.errors.assignee}
                                        </FormHelperText>
                                      )}
                                  </FormControl>
                                )}
                              </Field>
                            ) : (
                              <Field name={column.id}>
                                {({ field, form }) => (
                                  <TextField
                                    fullWidth
                                    label={column.label}
                                    {...field}
                                    error={
                                      form.touched[column.id] &&
                                      form.errors[column.id]
                                    }
                                    helperText={
                                      <ErrorMessage name={column.id} />
                                    }
                                  />
                                )}
                              </Field>
                            )}
                          </div>
                        </Grid>
                      )
                  )}
                  <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="primary" type="submit">
                      Add Task
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </DialogContent>
        </Dialog>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((task) => (
                  <TableRow key={task.id} className="table-row">
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        className="table-cell"
                        data-label={column.label}
                      >
                        {task[column.id] && column.id === "link" && (
                          <a
                            href={task[column.id]}
                            style={{ textDecoration: "none" }}
                            target="_blank"
                          >
                            Ref Link
                          </a>
                        )}
                        {column.id === "delete" && (
                          <IconButton
                            color="secondary"
                            onClick={() => handleDelete(task.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                        {column.id === "edit" && (
                          <IconButton
                            color="secondary"
                            onClick={() => handleDelete(task.id)}
                          >
                            <EditIcon />
                          </IconButton>
                        )}

                        {column.id === "link" || <>{task[column.id]}</>}
                        {column.id === "assignee" && task.login.name}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {/* <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Select a Date</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container m={1}>
                <Grid item xs={12}>
                  <MobileDatePicker
                    label="Date mobile"
                    inputFormat="DD/MM/YYYY"
                    name="duedate"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog> */}
      </Grid>
    </>
  );
};

export default TaskTable;
