import React, { useState } from "react";
import axios from "../api";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const location = useLocation();

  const [role, setRole] = useState(
    location.state?.role || "user"
  );

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function showBootstrapToast(message, type = "success") {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const url =
        role === "admin"
          ? "/api/admin/login"
          : "/api/user/login";

      const payload = {
        email: formData.email,
        password: formData.password
      };

      console.log("Role =", role);
      console.log("URL =", url);

      // IMPORTANT FOR FLASK SESSION
      const res = await axios.post(
        url,
        payload,
        {
          withCredentials: true
        }
      );

      console.log("LOGIN RESPONSE =", res.data);

      showBootstrapToast(
        res.data.message || "Login Successful",
        "success"
      );

      // ADMIN LOGIN
      if (role === "admin") {

        const adminData = {
          adminid: res.data?.admin?.adminid,
          adminname: res.data?.admin?.adminname,
          adminemail: res.data?.admin?.adminemail
        };

        localStorage.setItem(
          "admin",
          JSON.stringify(adminData)
        );

        console.log(
          "Stored Admin:",
          localStorage.getItem("admin")
        );

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);

      }

      // USER LOGIN
      else {

        const userData = res.data?.user || res.data;

        localStorage.setItem(
          "user",
          JSON.stringify(userData)
        );

        console.log(
          "Stored User:",
          localStorage.getItem("user")
        );

        setTimeout(() => {
          navigate("/user-dashboard");
        }, 1000);
      }

    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      showBootstrapToast(
        error.response?.data?.message ||
        "Login Failed",
        "danger"
      );
    }
  }

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <style>{`
        .login-page{
          min-height:100vh;
          background:#f1f5f9;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:40px 20px;
        }

        .login-card{
          width:100%;
          max-width:500px;
          background:white;
          padding:40px;
          border-radius:20px;
          box-shadow:0 8px 20px rgba(0,0,0,0.1);
        }

        .login-title{
          text-align:center;
          font-size:38px;
          font-weight:bold;
          color:#0f172a;
          margin-bottom:35px;
        }

        .form-label{
          font-weight:600;
          color:#334155;
        }

        .form-control{
          border-radius:10px;
          padding:12px;
        }

        .login-btn{
          width:100%;
          background:#0f172a;
          color:white;
          border:none;
          padding:14px;
          border-radius:10px;
          font-size:18px;
          font-weight:600;
        }

        .login-btn:hover{
          background:#38bdf8;
        }

        .register-link{
          text-align:center;
          margin-top:20px;
          color:#64748b;
        }

        .register-link a{
          color:#38bdf8;
          text-decoration:none;
          font-weight:600;
        }

        .custom-toast{
          position:fixed;
          top:20px;
          right:20px;
          z-index:9999;
          min-width:320px;
          border-radius:12px;
        }
      `}</style>

      {showToast && (
        <div
          className={`toast show align-items-center text-white bg-${toastType} border-0 custom-toast`}
        >
          <div className="d-flex">
            <div className="toast-body">
              {toastMessage}
            </div>

            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      )}

      <div className="login-page">

        <div className="login-card">

          <h1 className="login-title">
            {role === "admin"
              ? "Admin Login"
              : "User Login"}
          </h1>

          <div className="mb-4">

            <label className="form-label d-block">
              Login As
            </label>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              />
              <label className="form-check-label">
                User
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              />
              <label className="form-check-label">
                Admin
              </label>
            </div>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label className="form-label">
                Email Address
              </label>

              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            <div className="mb-4">

              <label className="form-label">
                Password
              </label>

              <div className="input-group">

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <span
                  className="input-group-text bg-primary text-white"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword
                    ? <FaEyeSlash />
                    : <FaEye />}
                </span>

              </div>

            </div>

            <button
              type="submit"
              className="login-btn"
            >
              Login
            </button>

          </form>

          <div style={{ textAlign: "right", marginTop: "8px" }}>
            <Link
              to={
                role === "admin"
                  ? "/admin-forgot-password"
                  : "/forgot-password"
              }
            >
              Forgot Password?
            </Link>
          </div>

          <div className="register-link">
            Don’t have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </div>


        </div>
      </div>
    </>
  );
}

export default Login;