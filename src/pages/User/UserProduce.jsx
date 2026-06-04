import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserProduce() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  async function fetchProducts() {
    try {
      const res = await axios.get(
        "https://ecomflask.duckdns.org/api/products"
      );

      console.log(res.data);

      setProducts(res.data.products || res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function addToCart(itemid) {
    try {
      const res = await axios.post(
        "https://ecomflask.duckdns.org/api/cart/add",
        {
          itemid,
          quantity: 1
        },
        {
          withCredentials: true
        }
      );

      alert(res.data.message);
    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Failed to add item to cart"
      );
    }
  }

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Products...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <h1 className="mb-4 text-center">
        Products
      </h1>

      <div className="row">

        {products.map((product) => (

          <div
            className="col-md-4 mb-4"
            key={product.itemid}
          >
            <div className="card h-100 shadow-sm">

              <img
                src={product.image}
                alt={product.itemname}
                className="card-img-top"
                style={{
                  height: "250px",
                  objectFit: "cover"
                }}
              />

              <div className="card-body">

                <h5 className="card-title">
                  {product.itemname}
                </h5>

                <p className="card-text">
                  {product.category}
                </p>

                <h4 className="text-success">
                  ₹{product.price}
                </h4>

                <button
                  className="btn btn-primary w-100 mt-2"
                  onClick={() =>
                    addToCart(product.itemid)
                  }
                >
                  Add To Cart
                </button>
               <button
  className="btn btn-success w-100 mt-2"
  onClick={() =>
    navigate("/payment", {
      state: {
        itemid: product.itemid,
        quantity: 1
      }
    })
  }
>
  Buy Now
</button>

              </div>

            </div>
          </div>

        ))}

      </div>

    </div>
  );
}

export default UserProduce;