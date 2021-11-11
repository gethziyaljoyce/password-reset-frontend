import React,{ useState,useContext } from "react";
import { ErrorMessage,Field,Form,Formik } from "formik";
import axios from "axios";
import { Card } from "react-bootstrap";
import { useHistory,NavLink } from "react-router-dom";
import * as YUP from "yup";
import {context} from "../App";

//schema validation
const schema = YUP.object().shape({
    email: YUP.string().required("please enter your Email Id"),
    password: YUP.string().min(6,"Password should contain atleast 6 characters ").required("Please enter your password"),
});

function Login(){

const history = useHistory();

const [log,setLog] = useContext(context);
console.log(log);
const [confirm,setConfirm] = useState(false);

const loginAccount = async (values) =>{
    try{
const response = await axios.post("https://password-reset-backend.herokuapp.com/users/login",{
    email:values.email,
    password:values.password,
});
if(response.status === 200){
    window.localStorage.setItem("auth-token",response.data.token);
}
return true;
    }catch(err){
        setConfirm(true);
    }
};


return (
    <div className="d-flex justify-content-center mt-5">
        <Card>
            <Card.Header className="text-center"><h4>Login</h4></Card.Header>
            <Card.Body>
                <Formik
                initialValues={{
                    email:"",
                    password:"",
                }}
                validationSchema = {schema}
                onSubmit = { async (values) => {
                    let reset = await loginAccount(values);
                    if(reset){
                        setLog(true);
                        history.push("/logged");
                    }
                }}
                >
{()=>{
    return (
        <Form className="mb-3">
            {/* email */}
            <div className="mb-3">
                <label>Email</label>
                <Field
                className="form-control"
                type="text"
                name="email"
                component="input"
                ></Field>
                <div>
                    <ErrorMessage name="email"></ErrorMessage>
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
                ></Field>
                <div>
                    <ErrorMessage name="password"></ErrorMessage>
                </div>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">Login</button>
            </div>
            <div className="mt-3 d-flex justify-content-between">
                <NavLink to="/register">New User? Register</NavLink>
            </div>
            <div>
                <NavLink to="/forgot-password">Forgot Password?</NavLink>
            </div>
        </Form>
    );
}}
                </Formik>
                {confirm ? (
                    <div className="d-flex justify-content-center text-danger">
                        <h3>Email or Password is wrong</h3>
                    </div>
                ) : (
                    <></>
                )}
            </Card.Body>
        </Card>
    </div>
);
};

 export default Login;