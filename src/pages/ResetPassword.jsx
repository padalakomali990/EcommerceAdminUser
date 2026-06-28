import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function ResetPassword() {

  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {

      const res = await api.post(
        `/api/resetpassword/${token}`,
        {
          password: password,
          confirm_password: confirm
        }
      );

      alert(res.data.message);

    } catch (error) {
      alert(
        error.response?.data?.message
      );
    }
  }

  return (
    <div className="container mt-5">

      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="password"
          className="form-control mb-3"
          placeholder="New Password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e)=>
            setConfirm(e.target.value)
          }
        />

        <button className="btn btn-success">
          Reset Password
        </button>

      </form>

    </div>
  );
}

export default ResetPassword;