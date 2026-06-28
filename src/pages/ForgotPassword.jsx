import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await api.post(
                "/api/forgotpassword",
                { email }
            );

            alert(res.data.message);
            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            alert(
                error.response?.data?.message
            );
        }
    }

    return (
        <div className="container mt-5">

            <h2>Forgot Password</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <button className="btn btn-primary">
                    Send Reset Link
                </button>

            </form>

        </div>
    );
}

export default ForgotPassword;