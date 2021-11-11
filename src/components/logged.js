import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { context } from "../App";

function Logged() {
    const [log] = useContext(context);

    return (
        <>
            {log ? (
                <div className="d-flex flex-column align-items-center mt-5">
                    <div>
                        <h1>Logged in Successfully!</h1>
                    </div>
                    <div>
                        <NavLink to="/login">Back to login</NavLink>
                    </div>
                </div>
            ) : (
                <></>
            )

            }
        </>
    );
}

export default Logged;