import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
const axios = require("axios");

const LoginForm = () => {
  return (
    <div>
      <h1>Any place in your app!</h1>
      <Formik
        initialValues={{ name: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          // if (!values.email) {
          //   errors.email = "Required";
          // } else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          // ) {
          //   errors.email = "Invalid email address";
          // }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            const server = "http://localhost:3000/api";
            const url = server + "/trainers/login";
            // const response = await fetch(url, {
            //   method: "GET",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   //content:
            // });
            // axios
            //   .post(url, {
            //     username: values.name,
            //     password: values.password,
            //   })
            //   .then(function (response) {

            //     console.log(response);
            //   });
            let loginResponse = await axios.post(url, {
              username: values.name,
              password: values.password,
            });
            console.log(loginResponse);
            //alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="name" />
            {/* <ErrorMessage name="name" component="div" /> */}
            <ErrorMessage name="name">
              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>

            <Field type="password" name="password" />
            <ErrorMessage name="password">
              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
