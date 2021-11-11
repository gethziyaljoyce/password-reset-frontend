import React, { useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import * as YUP from "yup";

//for data validation
const schema = YUP.object().shape({
    name: YUP.string().required("Please enter your Name"),
    email: YUP.string().email().required("Please Enter your Email"),
    password: YUP.string()
        .min(6, "Password should contain atleast 6 characters")
        .required("Enter the Password"),
});

function Register() {
    const [info, setInfo] = useState("");

    //to create new account
    const createAccount = async (values) => {
        try {
            const data = await axios.post("https://password-reset-backend.herokuapp.com/users/register", {
                name: values.name,
                email: values.email,
                password: values.password,
            });
            console.log(data);
            setInfo("User Registered successfully")
        } catch (err) {
            console.log("Error", err);
        }
    }
    return (
        <div className="card-container d-flex justify-content-center mt-5">
            <Card style={{ width: "35rem" }}>
                <Card.Header className="text-center">
                    <h4>Create Account</h4>
                </Card.Header>
                <Card.Body>
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",
                        }}
                        validationSchema={schema}
                        onSubmit={(values, { resetForm }) => {
                            createAccount(values);
                            resetForm();
                        }}
                    >
                        {() => {
                            return (
                                <Form className="d-flex flex-column">
                                    {/* name */}
                                    <div className="mb-3">
                                        <label>Name</label>
                                        <Field
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            component="input"
                                        />
                                        <div>
                                            <ErrorMessage className="text-danger" name="name" />
                                        </div>
                                    </div>
                                    {/* email */}
                                    <div className="mb-3">
                                        <label>Email</label>
                                        <Field
                                            className="form-control"
                                            type="text"
                                            name="email"
                                            component="input"
                                        />
                                        <div>
                                            <ErrorMessage className="text-danger" name="email" />
                                        </div>
                                    </div>
                                    {/* password */}
                                    <div className="mb-3">
                                        <label>Password</label>
                                        <Field
                                            className="form-control"
                                            type="password"
                                            name="password"
                                            component="input"
                                        />
                                        <div>
                                            <ErrorMessage className="text-danger" name="password" />
                                        </div>
                                    </div>
                                    <div className="mt-2 d-flex justify-content-between">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        <NavLink to="/login">Go to Login</NavLink>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                    <div className="mt-3 text-center text-success">
                        <h3>{info}</h3>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Register;