import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import api from "../api";
import FileUploadField from "./FileUploadField";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [serverError, setServerError] = useState(null);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    skills: [""],
    image: null,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-zA-Z0-9]/, "Password must be alphanumeric")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    dob: Yup.date().required("Date of birth is required"),
    skills: Yup.array().of(Yup.string().required("Skill is required")),
    image: Yup.mixed().required("User image is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      formData.append("dob", values.dob);
      formData.append("skills", JSON.stringify(values.skills));
      console.log("values", values);
      if (values.image) {
        formData.append("image", values.image);
      }

      const res = await api.post(
        "/auth/register",
        formData,
        "POST",
        "multipart/form-data"
      );

      alert("Registration successful");
    } catch (error) {
      if (error.response?.data?.message === "User already exists") {
        alert("User already exists. Please use a different email.");
      } else {
        alert("Something went wrong. Please try again.");
      }
      setServerError(error.response?.data?.message || "Registration failed");
    }
    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <Field type="text" name="firstName" />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error"
              />
            </div>

            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <Field type="text" name="lastName" />
              <ErrorMessage name="lastName" component="div" className="error" />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </div>

            <div className="input-group">
              <label htmlFor="dob">Date of Birth</label>
              <Field type="date" name="dob" />
              <ErrorMessage name="dob" component="div" className="error" />
            </div>

            {/* Skills Field Array */}
            <div className="skills-group">
              <label>Skills</label>
              <FieldArray
                name="skills"
                render={(arrayHelpers) => (
                  <div>
                    {values.skills.map((skill, index) => (
                      <div key={index} className="skill-item">
                        <Field
                          name={`skills[${index}]`}
                          placeholder="Enter a skill"
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="remove-skill-btn"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => arrayHelpers.push("")}>
                      Add More Skills
                    </button>
                  </div>
                )}
              />
            </div>

            {/* Image upload */}
            <div className="input-group">
              <Field name="image" component={FileUploadField} />
              <ErrorMessage name="image" component="div" className="error" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn"
            >
              Register
            </button>
            <div className="login-link">
              <p>
                Already have an account? <Link to="/">Login here</Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
