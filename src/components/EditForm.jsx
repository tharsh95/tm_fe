import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  FormHelperText,
  Button,
} from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";

import React from "react";
import axios from "axios";

const EditForm = ({
  showEditForm,
  toggleEditForm,
  editData,
  columns,
  users,
  validationSchema,
  handleDelete,
}) => {
  const handleUpdate = async (values) => {
    const { id, ...rest } = values;
    const url = `http://localhost:3000/tasks/${id}`;
    const { data } = await axios.patch(url, rest);
    window.location.reload()

    // toggleEditForm(data,'close');
  };
  return (
    <div>
      {" "}
      <Dialog open={showEditForm} onClose={toggleEditForm}>
        <DialogTitle>"Edit Task"</DialogTitle>
        {/* <div style={{ position: "absolute", top: 10, right: 20 }}>
          <IconButton color="primary" onClick={() => handleDelete(editData.id)}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        </div> */}
        <DialogContent>
          <Formik
            initialValues={editData}
            validationSchema={validationSchema}
            // enableReinitialize={true}
            onSubmit={handleUpdate}
          >
            <Form>
              <Grid container spacing={2}>
                {columns.map(
                  (column) =>
                    column.id === "id" ||
                    column.id === "delete" ||
                    column.id === "duedate" ||
                    column.id === "edit" || (
                      <Grid item xs={12} sm={6} key={column.id}>
                        <div className="table-cell">
                          {column.id === "assignee" ? (
                            <Field name="assignee">
                              {({ field, form }) => (
                                <FormControl fullWidth>
                                  <InputLabel htmlFor="assignee">
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
                                    // value={editData.logi}
                                  >

                                    {users.map((user) => (
                                      <MenuItem value={user.id} key={user.id}>
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
                          ) : column.id === "status" ? (
                            <Field name="status">
                              {({ field, form }) => (
                                <FormControl fullWidth>
                                  <InputLabel htmlFor="status">
                                    Status
                                  </InputLabel>
                                  <Select
                                    {...field}
                                    inputProps={{
                                      id: "assignee",
                                    }}
                                    error={
                                      form.touched.status && form.errors.status
                                    }
                                    // value={editData && editData.status}
                                  >
                                    {/* {users.map((user) => ( */}
                                    <MenuItem value="Backlog">Backlog</MenuItem>
                                    <MenuItem value="WIP">WIP</MenuItem>
                                    {/* ))} */}
                                  </Select>
                                  {form.touched.status &&
                                    form.errors.status && (
                                      <FormHelperText error>
                                        {form.errors.status}
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
                                  helperText={<ErrorMessage name={column.id} />}
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
                    {"Update Task"}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditForm;
