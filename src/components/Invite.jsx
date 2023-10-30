import React, { useEffect, useState } from "react";
import {
  Card,
  Grid,
  CardContent,
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { useUserContext } from '../Contexts/userContext'; 
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import UserTable from "./UserTable";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string().required("Role is required"),
  password: Yup.string().required("Password is required"),
});

function HorizontalCard() {
  const [users, setUsers] = useState([]);
  const { user, setUser } = useUserContext(); 
console.log(user,'ok')
  const initialValues = {
    name: "",
    email: "",
    role: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const url = "http://localhost:3000/login/add";
    const { data } = await axios.post(url, values);

    if (data.status === "success") {
      setUsers(data.data);
      resetForm()
      enqueueSnackbar(data.message, { variant: "success" });
    } else {
      enqueueSnackbar(data.message, { variant: "error" });
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
    fetchUsers();
  }, []);
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Card>
          <CardContent>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <Field name="name">
                  {({ field, form }) => (
                    <TextField
                      label="Name"
                      {...field}
                      error={form.touched.name && form.errors.name}
                      helperText={<ErrorMessage name="name" />}
                    />
                  )}
                </Field>

                <Field name="email">
                  {({ field, form }) => (
                    <TextField
                      label="Email"
                      {...field}
                      error={form.touched.email && form.errors.email}
                      helperText={<ErrorMessage name="email" />}
                    />
                  )}
                </Field>

                <Field name="role">
                  {({ field, form }) => (
                    <FormControl style={{width:"13rem"}}>
                      <InputLabel htmlFor="role">Role</InputLabel>
                      <Select
                        {...field}
                        inputProps={{
                          id: "role",
                        }}
                        error={form.touched.role && form.errors.role}
                      >
                        <MenuItem value="">Select a role</MenuItem>
                        <MenuItem value="DEV">DEV</MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                        <MenuItem value="Tester">Tester</MenuItem>
                      </Select>
                      {form.touched.role && form.errors.role && (
                        <FormHelperText error>
                          {form.errors.role}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field, form }) => (
                    <TextField
                      label="Password"
                      type="password"
                      {...field}
                      error={form.touched.password && form.errors.password}
                      helperText={<ErrorMessage name="password" />}
                    />
                  )}
                </Field>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: ".5rem" ,marginLeft:"1rem"}}
                >
                  Add
                </Button>
              </Form>
            </Formik>
          </CardContent>
        </Card>
        <SnackbarProvider />
      </Grid>
      <Typography>
        <h2 style={{ textAlign: "center" }}>Users</h2>
      </Typography>
      <Grid container alignItems="center" justifyContent="center" mt={4}>
        <Grid item lg={10}>
          <UserTable data={users} />
        </Grid>
      </Grid>
    </>
  );
}

export default HorizontalCard;
