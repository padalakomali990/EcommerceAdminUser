import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function fetchCart() {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://ecomflask.duckdns.org/api/cart/view",
        { withCredentials: true }
      );

      setCartItems(res.data.cart_items || []);
      setSummary(res.data.summary);
      setMessage("");
    } catch (error) {
      setCartItems([]);
      setSummary(null);
      setMessage(error.response?.data?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  async function updateQuantity(itemid, quantity) {
    if (quantity <= 0) return;

    try {
      await axios.put(
        "https://ecomflask.duckdns.org/api/cart/update",
        { itemid, quantity },
        { withCredentials: true }
      );

      fetchCart();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  }

  async function removeItem(itemid) {
    try {
      await axios.delete(
        `https://ecomflask.duckdns.org/api/cart/remove/${itemid}`,
        { withCredentials: true }
      );

      fetchCart();
    } catch (error) {
      alert(error.response?.data?.message || "Remove failed");
    }
  }

  if (loading) return <h3 className="text-center mt-5">Loading Cart...</h3>;

  return (
    <div className="container py-5">
      <h2>Cart</h2>

      {message && <div className="alert alert-warning">{message}</div>}

      {cartItems.length > 0 && (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item.itemid}>
                  <td>{item.itemname}</td>
                  <td>₹{item.price}</td>

                  <td>
                    <button onClick={() => updateQuantity(item.itemid, item.quantity - 1)} className="btn btn-danger me-2">-</button>
                    {item.quantity}
                    <button onClick={() => updateQuantity(item.itemid, item.quantity + 1)}
                        className="btn btn-success ms-2">+</button>
                  </td>

                  <td>₹{item.total}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(item.itemid)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {summary && (
            <div className="card p-3">
              <h4>Grand Total: ₹{summary.grand_total}</h4>

              <button
                className="btn btn-primary w-100 mt-3"
                onClick={() =>
                  navigate("/payment", {
                    state: {
                      type: "cart"
                    }
                  })
                }
              >
                Proceed to Payment
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;