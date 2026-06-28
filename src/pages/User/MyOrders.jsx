import React, { useEffect, useState } from "react";
import axios from "../../api";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await axios.get("/api/myorders");

      setOrders(res.data.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // DOWNLOAD INVOICE FUNCTION
  async function downloadInvoice(orderid) {
    try {
      const response = await axios.get(
        `/api/invoice/${orderid}`,
        {
          responseType: "blob",
          withCredentials: true
        }
      );

      // create file URL
      const fileURL = window.URL.createObjectURL(
        new Blob([response.data])
      );

      // create download link
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute(
        "download",
        `invoice_${orderid}.pdf`
      );

      document.body.appendChild(link);
      link.click();
      link.remove();

      // cleanup
      window.URL.revokeObjectURL(fileURL);

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Invoice download failed");
    }
  }

  return (
    <div className="container mt-4">

      <h2>My Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="row">

          {orders.map((order) => (
            <div
              key={order.orderid}
              className="col-md-6 mb-3"
            >

              <div className="card p-3 shadow-sm">

                <h5>
                  Order ID: {order.orderid}
                </h5>

                <p>
                  Total: ₹
                  {order?.grand_total ||
                    order?.total ||
                    order?.amount ||
                    "N/A"}
                </p>

                <p>
                  Status: {order?.status || "Completed"}
                </p>

                <div className="row">

                  {/* VIEW DETAILS */}
                  <div className="col-4">
                    <button
                      className="btn btn-primary btn-sm mb-2"
                      onClick={() =>
                        navigate(
                          `/order/${order.orderid}`
                        )
                      }
                    >
                      View Details
                    </button>
                  </div>

                  {/* DOWNLOAD INVOICE */}
                  <div className="col-4">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        downloadInvoice(
                          order.orderid
                        )
                      }
                    >
                      Download Invoice
                    </button>
                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default MyOrders;