import React from "react";
import { NavLink } from "react-router-dom";

export default function PasswordReset(){
    return (
        <div className="d-flex justify-content-center mt-5">
            <div>
            <h2>Password Changed Successfully</h2>
            </div>
            <div className="d-flex justify-content-center">
                <NavLink to="/login">Go to Login</NavLink>
            </div>
        </div>
    );
}