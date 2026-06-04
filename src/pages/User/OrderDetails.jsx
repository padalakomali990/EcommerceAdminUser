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
          <p>Total: ₹{order.grand_total }</p>
          <p>Status:Paid</p>

        </div>
      )}

      <h4>Items</h4>

      <div className="row">
       {items.map((item, index) => (
  <div className="col-md-4 mb-3" key={index}>

    <div className="card p-2">

      <img
        src={item?.item_image || item?.item._image || "https://via.placeholder.com/150"}
        alt={item?.item_name || "Product"}
        className="img-fluid"
      />

      <h6>{item?.item_name || item?.item_name}</h6>

      <p>Qty: {item?.item_quantity}</p>

      <p>
        Price: ₹{item?.item_price || item?.subtotal || "N/A"}
      </p>

    </div>

  </div>
))}
      </div>

    </div>
  );
}

export default OrderDetails;