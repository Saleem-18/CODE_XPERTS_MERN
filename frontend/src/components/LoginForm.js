import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setServerError(null);
    try {
      const res = await api.post("/auth/login", values);
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";

      if (
        errorMessage.includes("Invalid credentials") ||
        errorMessage.includes("Unauthorized")
      ) {
        alert("Incorrect email or password, please try again!");
      }

      setServerError(errorMessage);
    }
    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            {serverError && <div className="server-error">{serverError}</div>}
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
      <div className="register-link">
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
