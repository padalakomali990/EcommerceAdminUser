import React, { useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";

function AdminForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await axios.post(
                "/api/admin/forgotpassword",
                {
                    email
                }
            );

            alert(res.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f8fafc"
            }}
        >

            <div
                style={{
                    width: "400px",
                    background: "white",
                    padding: "40px",
                    borderRadius: "15px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
                }}
            >

                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "30px"
                    }}
                >
                    Forgot Password
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "20px",
                            borderRadius: "10px",
                            border: "1px solid #ccc"
                        }}
                    />

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px",
                            background: "#0f172a",
                            color: "white",
                            border: "none",
                            borderRadius: "10px"
                        }}
                    >
                        {loading
                            ? "Sending..."
                            : "Send Reset Link"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AdminForgotPassword;