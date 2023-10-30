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
import { SnackbarProvider, enqueueSnackbar } from "notistack";

import { useUserContext } from "../Contexts/userContext"; // Import the useUserContext hook
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./TaskTable.css";
import axios from "axios";
import EditForm from "./EditForm";

const columns = [
  { id: "id", label: "Id" },
  { id: "title", label: "Title" },
  { id: "description", label: "Description" },
  { id: "link", label: "Link" },
  { id: "status", label: "Status" },
  { id: "assignee", label: "Assignee" },
  //   { id: "duedate", label: "Due Date" },
  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete" },
];

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  title: Yup.string().required("Title is required"),
  //   assignee: Yup.string().required("Assignee is required"),
  status: Yup.string().required("Status is required"),
  link: Yup.string().required("Link is required"),
});

const TaskTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [flaf, setFlag] = useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [editData, setEditData] = useState(null);
  const { user, setUser } = useUserContext();

  const handleEdit = (taskId) => {
    const taskToEdit = data.find((task) => task.id === taskId);
    const { login, ...taskToEditWithoutLogin } = taskToEdit;

    setEditData(taskToEditWithoutLogin);
    toggleEditForm();
  };
  const handleDelete = async (taskId) => {
    const url = `http://localhost:3000/tasks/${taskId}`;
    const { data } = await axios.post(url, {
      user: user?.name,
      role: user?.role,
    });
    console.log(data, "delete");
    if (data.status === "success") {
      setData(data.data.data);
    } else {
      enqueueSnackbar(data.message, { variant: "error" });
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const toggleEditForm = (data, type) => {
    setShowEditForm(!showEditForm);
  };

  const fetchTasks = async () => {
    const url = "http://localhost:3000/tasks";
    const { data } = await axios.get(url);
    setData(data.data);
  };
  const handleFilterChange = (e) => {
    console.log(e.target.value);
    if (e.target.value !== "All") {
      const fdata = data.filter((el) => el.status === e.target.value);
      console.log(fdata);
      setData(fdata);
    } else {
      setFlag(!flag);
    }
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
    console.log(url);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleForm}
            style={{ marginBottom: "20px" }}
          >
Add Task
          </Button>
        </Grid>
        <Grid item xs={12} md={6} justifyContent="space-around">
          <FormControl variant="outlined" sx={{ width: "200px",backgroundColor:'white' }}>
            <InputLabel htmlFor="assignee">Filter by status</InputLabel>
            <Select
              name="assignee"
              label="Filter"
              onChange={handleFilterChange}
            >
              <MenuItem value="All">All</MenuItem>
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
                      column.id === "id" ||
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
                            color="primary"
                            onClick={() => handleDelete(task.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                        {column.id === "edit" && (
                          <IconButton
                            color="primary"
                            onClick={() => handleEdit(task.id)}
                          >
                            <EditIcon />
                          </IconButton>
                        )}

                        {column.id === "link" || <>{task[column.id]}</>}
                        {column.id === "assignee" && task?.login?.name}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <EditForm
            showEditForm={showEditForm}
            toggleEditForm={toggleEditForm}
            editData={editData}
            columns={columns}
            users={users}
            validationSchema={validationSchema}
            handleDelete={handleDelete}
          />
        </Grid>
        <SnackbarProvider />
      </Grid>
    </>
  );
};

export default TaskTable;
