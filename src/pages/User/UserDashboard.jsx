import React from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <>
      {/* BOOTSTRAP 5 */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <style>{`
        .dashboard-container{
          min-height:100vh;
          background:#f1f5f9;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:20px;
        }

        .dashboard-card{
          width:100%;
          max-width:700px;
          background:white;
          padding:40px;
          border-radius:20px;
          box-shadow:0 8px 20px rgba(0,0,0,0.1);
        }

        .dashboard-title{
          color:#0f172a;
          font-size:38px;
          font-weight:bold;
        }

        .welcome-text{
          color:#38bdf8;
          margin-top:20px;
          font-weight:600;
        }

        .user-info{
          color:#475569;
          font-size:18px;
          margin-bottom:10px;
        }

        .dashboard-btn{
          background:#0f172a;
          color:white;
          border:none;
          padding:12px 25px;
          border-radius:10px;
          font-size:17px;
          transition:0.3s;
        }

        .dashboard-btn:hover{
          background:#38bdf8;
        }

        @media(max-width:768px){

          .dashboard-card{
            padding:25px;
          }

          .dashboard-title{
            font-size:30px;
          }

          .user-info{
            font-size:16px;
          }

          .dashboard-btn{
            width:100%;
          }
        }
      `}</style>

      <div className="dashboard-container">

        <div className="dashboard-card">

          <h1 className="dashboard-title">
            User Dashboard
          </h1>

          <h3 className="welcome-text">
            Welcome {user?.username}
          </h3>

          <div className="mt-4">

            <p className="user-info">
              <strong>Email:</strong>{" "}
              {user?.useremail}
            </p>

            {/* <p className="user-info">
              <strong>Phone:</strong>{" "}
              {user?.userphone}
            </p>

            <p className="user-info">
              <strong>Gender:</strong>{" "}
              {user?.usergender}
            </p>

            <p className="user-info">
              <strong>Address:</strong>{" "}
              {user?.useraddress}
            </p> */}

          </div>

          <button
            className="dashboard-btn mt-4"
            onClick={() => navigate("/products")}
          >
            Browse Products
          </button>

        </div>

      </div>
    </>
  );
}

export default UserDashboard;