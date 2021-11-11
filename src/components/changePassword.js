import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as YUP from "yup";

const schema = YUP.object().shape({
    password: YUP.string().min(6, "password should contain 6 characters"),
});

function ChangePassword() {
    const history = useHistory();
    const { userid, token } = useParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [match, setMatch] = useState(false);
    const [button, setButton] = useState(true);
    const [main, setMain] = useState(false);
    const [temp, setTemp] = useState(true);

    //to handle change
    const handleChange = ({ target: { name, value } }) => {
        if (name === "password") {
            setPassword(value);
            if (confirmPassword === value) {
                setButton(false);
            } else {
                setButton(true);
            }
        }
        if (name === "confirmPassword") {
            setConfirmPassword(value);
            if (password !== value) setMatch(true);
            else setMatch(false);
            if (password === value) setButton(false);
            else setButton(true);
        }
        if (value.length === 0) setButton(true);
    };

    const checkLink = async () => {
        try {
await axios.get(`https://password-reset-backend.herokuapp.com/users/forgot-password/${userid}/${token}`);
setTemp(false);
setMain(true);
        } catch (err) {
            setTemp(true);
            setMain(true);
        }
    };
    console.log(temp);
    useEffect(() => {
        checkLink();
    });

    const resetPassword = async () => {
        try {
            const link = await axios.post( `https://password-reset-backend.herokuapp.com/users/forgot-password/${userid}/${token}`, {
                password: password,
                confirmPassword: confirmPassword,
            });
            console.log(link);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            {main ? (
                <>
                    {temp ? (
                        <div>
                            <h2>Your Link is Broken</h2>
                        </div>
                    ) : (
                        <Card>
                            <Card.Header>
                                <h4 className="text-center">Reset Password</h4>
                            </Card.Header>
                            <Card.Body>
                                <Formik
                                    initialValues={{
                                        password: "",
                                        confirmPassword: "",
                                    }}
                                    validationSchema = {schema}
                                    onSubmit={async (values, { resetForm }) => {
                                        const reset = await resetPassword();
                                        if (reset) {
                                            history.push("/password-reset");
                                        }
                                    }}
                                >
                                    {() => {
                                        return (
                                            <Form>
                                                <div>
                                                    {/* password*/}
                                                    <div>
                                                        <label>Password</label>
                                                        <Field
                                                            className="form-control"
                                                            type="password"
                                                            name="password"
                                                            component="input"
                                                            value={password}
                                                            onChange={handleChange}
                                                        ></Field>
                                                    
                                                <div>
                                                    <ErrorMessage name="password" />
                                                </div>
                                                </div>
                                                {/* confirm password*/}
                                                <div className="mt-3">
                                                    <label>Confirm Password</label>
                                                    <Field
                                                    className="form-control"
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={confirmPassword}
                                                    component="input"
                                                    onChange={handleChange}
                                                    ></Field>
                                                    {match ? (
                                                        <div>Password Should Match</div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                </div>
                                                <div className="mt-3 d-flex justify-content-center">
                                                    <button className="btn btn-primary" disabled={button} type="submit">Submit</button>
                                                </div>
                                            </Form>
                                        );
                                    }}
                                </Formik>
                            </Card.Body>
                        </Card>
                    )}
                </>

            ) : (
                <></>
            )}
        </div>
    );
}

export default ChangePassword;