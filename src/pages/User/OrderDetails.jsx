import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function OrderDetails() {
  const { orderid } = useParams();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchOrder();
  }, []);

  async function fetchOrder() {
    try {
      const res = await axios.get(
        `https://ecomflask.duckdns.org/api/orders/${orderid}`,
        {
          withCredentials: true
        }
      );

      setOrder(res.data.order);
      setItems(res.data.items);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-4">

      <h2>Order Details</h2>

      {order && (
        <div className="card p-3 mb-3">

          <h5>Order ID: {order.orderid}</h5>
          <p>Total: ₹{order.total}</p>
          <p>Status: {order.status}</p>

        </div>
      )}

      <h4>Items</h4>

      <div className="row">
       {items.map((item, index) => (
  <div className="col-md-4 mb-3" key={index}>

    <div className="card p-2">

      <img
        src={item?.image_url || item?.image || "https://via.placeholder.com/150"}
        alt={item?.itemname || "Product"}
        className="img-fluid"
      />

      <h6>{item?.itemname || item?.name}</h6>

      <p>Qty: {item?.quantity}</p>

      <p>
        Price: ₹{item?.price || item?.amount || "N/A"}
      </p>

    </div>

  </div>
))}
      </div>

    </div>
  );
}

export default OrderDetails;