import React, { useState } from "react";
import axios from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPassword() {

    const { token } = useParams();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        confirm_password: ""
    });

    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!formData.password || !formData.confirm_password) {
            alert("Please fill all fields");
            return;
        }

        try {

            setLoading(true);

            const res = await axios.post(
                `/api/resetpassword/${token}`,
                {
                    password: formData.password,
                    confirm_password: formData.confirm_password
                }
            );

            alert(res.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Reset password failed"
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <style>{`
        .reset-page{
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:#f1f5f9;
        }

        .reset-card{
          width:100%;
          max-width:500px;
          background:white;
          padding:40px;
          border-radius:20px;
          box-shadow:0 8px 20px rgba(0,0,0,0.1);
        }

        .reset-title{
          text-align:center;
          margin-bottom:30px;
          font-size:32px;
          font-weight:bold;
        }

        .form-control{
          width:100%;
          padding:12px;
          border:1px solid #ccc;
          border-radius:10px;
          margin-bottom:20px;
        }

        .reset-btn{
          width:100%;
          background:#0f172a;
          color:white;
          border:none;
          padding:14px;
          border-radius:10px;
          font-size:17px;
        }
      `}</style>

            <div className="reset-page">

                <div className="reset-card">

                    <h2 className="reset-title">
                        Reset Password
                    </h2>

                    <form onSubmit={handleSubmit}>

                        {/* New Password */}

                        <div style={{ position: "relative" }}>

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter New Password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            <span
                                style={{
                                    position: "absolute",
                                    right: "15px",
                                    top: "15px",
                                    cursor: "pointer"
                                }}
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />}
                            </span>

                        </div>

                        {/* Confirm Password */}

                        <div style={{ position: "relative" }}>

                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirm_password"
                                placeholder="Confirm Password"
                                className="form-control"
                                value={formData.confirm_password}
                                onChange={handleChange}
                            />

                            <span
                                style={{
                                    position: "absolute",
                                    right: "15px",
                                    top: "15px",
                                    cursor: "pointer"
                                }}
                                onClick={() =>
                                    setShowConfirm(!showConfirm)
                                }
                            >
                                {showConfirm
                                    ? <FaEyeSlash />
                                    : <FaEye />}
                            </span>

                        </div>

                        <button
                            type="submit"
                            className="reset-btn"
                        >
                            {loading
                                ? "Updating..."
                                : "Reset Password"}
                        </button>

                    </form>

                </div>

            </div>
        </>
    );
}

export default ResetPassword;