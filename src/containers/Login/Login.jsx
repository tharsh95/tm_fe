import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const Login = () => {
  const responseOutput = async (response) => {
    const url = "http://localhost:3000/login/verify";
    const { data } = await axios.post(url, { token: response.credential });
    if (data.status === "success") {
      enqueueSnackbar(data.message, { variant: "success" });
      localStorage.setItem("google", true);
      localStorage.setItem("token", response.credential);
      window.location.reload();
    } else {
      enqueueSnackbar(data.message, { variant: "error" });
    }
  };
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "741664764875-ocmpf433rr4350ss1qohtrd1l58i1ftj.apps.googleusercontent.com",
      callback: responseOutput,
    });
    google.accounts.id.renderButton(document.getElementById("sign"), {
      theme: "outline",
      borderRadius: "100px",
    });
  }, []);
  const handleLogin = async (values, { setSubmitting }) => {
    const url = "http://localhost:3000/login";
    const { data } = await axios.post(url, values);
    if (data.status === "success") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("google", false);
      enqueueSnackbar(data.message, { variant: "success" });
      window.location.reload();
    } else {
      enqueueSnackbar(data.message, { variant: "error" });
    }
    setSubmitting(false);
    // Don't forget to call setSubmitting(false) when your login operation is complete.
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Typography style={{ color: "black", fontSize: "1.5rem" }}>
        <strong>Get Started with Google</strong>
      </Typography>
      <div style={{ marginTop: "4rem" }} id="sign"></div>
      <Card style={{ marginTop: "2rem", width: "40vw" }}>
        <CardContent>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field name="email">
                  {({ field, form }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      error={form.touched.email && !!form.errors.email}
                      helperText={form.touched.email && form.errors.email}
                    />
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }) => (
                    <TextField
                      {...field}
                      label="Password"
                      fullWidth
                      type="password"
                      margin="normal"
                      variant="outlined"
                      error={form.touched.password && !!form.errors.password}
                      helperText={form.touched.password && form.errors.password}
                    />
                  )}
                </Field>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  Log In
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
      <SnackbarProvider />
    </Grid>
  );
};

export default Login;
