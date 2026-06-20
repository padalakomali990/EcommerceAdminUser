import React, { useEffect, useState } from "react";
import axios from "../../api";
import { useNavigate, useLocation } from "react-router-dom";

function UserProduce() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    { label: "All", value: "All" },
    { label: "Home Appliances", value: "home_appliences" },
    { label: "Grocery", value: "Grocery" },
    { label: "Fashion", value: "Fashion" },
    { label: "Electronics", value: "Electronics" },
    { label: "Sports", value: "Sports" },
    { label: "Toys", value: "Toys" },
  ];

  async function fetchProducts() {
    try {
      const res = await axios.get(
        "/api/products"
      );
      const data = res.data.products || res.data;
      setProducts(data);
      setFiltered(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function searchProducts() {

    if (!searchTerm.trim()) {
      fetchProducts();   // if empty, show all products again
      return;
    }

    try {

      setSearchLoading(true);

      const res = await axios.get(
        `/api/search?q=${searchTerm}`
      );

      console.log(res.data);

      if (res.data.status === "success") {

        setFiltered(res.data.items);

        setActiveCategory("All");
      }

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Search failed"
      );

    } finally {

      setSearchLoading(false);

    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) {
      setActiveCategory(cat);
      setFiltered(products.filter(p => p.category === cat));
    } else {
      setActiveCategory("All");
      setFiltered(products);
    }
  }, [location.search, products]);

  function filterByCategory(val) {
    setActiveCategory(val);
    if (val === "All") {
      setFiltered(products);
    } else {
      setFiltered(products.filter(p => p.category === val));
    }
  }

  async function addToCart(itemid) {
    console.log("----", itemid)
    try {
      const res = await axios.post(
        "/api/cart/add",
        { itemid, quantity: 1 },
      );
      alert(res.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to add item to cart"
      );
    }
  }

  if (loading) {
    return (
      <>
        <style>{`
          .up-loading {
            min-height: 100vh;
            background: #0f172a;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
          }
          .up-spinner {
            width: 48px;
            height: 48px;
            border: 4px solid rgba(56,189,248,0.2);
            border-top-color: #38bdf8;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
          .up-loading p { color: #94a3b8; font-size: 16px; }
        `}</style>
        <div className="up-loading">
          <div className="up-spinner"></div>
          <p>Loading products...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        .up-page {
          min-height: 100vh;
          background: #f8fafc;
          padding-bottom: 60px;
        }

        .up-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
          padding: 40px 20px 30px;
          text-align: center;
          color: white;
        }

        .up-hero h1 {
          font-size: 32px;
          font-weight: 800;
          color: #f8fafc;
          margin-bottom: 6px;
        }

        .up-hero p {
          color: #94a3b8;
          font-size: 15px;
          margin: 0;
        }

        .up-filter-bar {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          gap: 4px;
          overflow-x: auto;
          scrollbar-width: none;
          justify-content: center;
          flex-wrap: wrap;
          padding: 12px 20px;
        }

        .up-filter-bar::-webkit-scrollbar { display: none; }

        .up-cat-btn {
          border: 1.5px solid #e2e8f0;
          background: white;
          color: #475569;
          border-radius: 20px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .up-cat-btn:hover {
          border-color: #38bdf8;
          color: #0ea5e9;
        }

        .up-cat-btn.active {
          background: #0f172a;
          color: white;
          border-color: #0f172a;
        }

        .up-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px 16px 0;
        }

        .up-results-count {
          font-size: 13px;
          color: #94a3b8;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .up-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 22px;
        }

        .up-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
        }

        .up-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(15,23,42,0.12);
          border-color: #bae6fd;
        }

        .up-img-wrap {
          position: relative;
          overflow: hidden;
          background: #f1f5f9;
        }

        .up-img-wrap img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          transition: transform 0.35s ease;
        }

        .up-card:hover .up-img-wrap img {
          transform: scale(1.05);
        }

        .up-category-tag {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(15,23,42,0.75);
          color: #38bdf8;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
          backdrop-filter: blur(4px);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .up-card-body {
          padding: 18px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .up-item-name {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .up-price {
          font-size: 20px;
          font-weight: 800;
          color: #10b981;
          margin: 8px 0 16px;
        }

        .up-price span {
          font-size: 13px;
          font-weight: 500;
          color: #94a3b8;
          margin-left: 4px;
        }

        .up-btn-row {
          display: flex;
          gap: 8px;
          margin-top: auto;
        }

        .up-btn-cart {
          flex: 1;
          background: #f1f5f9;
          color: #0f172a;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          padding: 9px 10px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .up-btn-cart:hover {
          background: #0f172a;
          color: white;
          border-color: #0f172a;
        }

        .up-btn-buy {
          flex: 1;
          background: linear-gradient(135deg, #0ea5e9, #38bdf8);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 9px 10px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .up-btn-buy:hover {
          background: linear-gradient(135deg, #0284c7, #0ea5e9);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(14,165,233,0.4);
        }

        .up-empty {
          text-align: center;
          padding: 60px 20px;
          color: #94a3b8;
        }

        .up-empty-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .up-empty h3 {
          font-size: 20px;
          color: #475569;
          margin-bottom: 6px;
        }

        @media(max-width: 600px) {
          .up-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .up-hero h1 { font-size: 24px; }
          .up-img-wrap img { height: 160px; }
          .up-btn-row { flex-direction: column; }
        }
      `}</style>

      <div className="up-page">

        <div className="up-hero">
          <h1>🛍️ Shop with ShopEase</h1>
          <p>Discover great products at amazing prices</p>
        </div>

        <div className="up-filter-bar">
          {categories.map(cat => (
            <button
              key={cat.value}
              className={`up-cat-btn ${activeCategory === cat.value ? "active" : ""}`}
              onClick={() => filterByCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "20px",
            padding: "0 20px"
          }}
        >

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            style={{
              padding: "12px",
              width: "300px",
              borderRadius: "10px",
              border: "1px solid #ccc"
            }}
          />

          <button
            onClick={searchProducts}
            style={{
              padding: "12px 20px",
              background: "#0ea5e9",
              color: "white",
              border: "none",
              borderRadius: "10px" 
            }}
          >
            {searchLoading ? "Searching..." : "Search"}
          </button>

        </div>

        <div className="up-content">
          <p className="up-results-count">
            Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All"
              ? ` in "${categories.find(c => c.value === activeCategory)?.label || activeCategory}"`
              : ""}
          </p>

          {filtered.length === 0 ? (
            <div className="up-empty">
              <div className="up-empty-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try selecting a different category</p>
            </div>
          ) : (
            <div className="up-grid">
              {filtered.map((product) => (
                <div className="up-card" key={product.itemid}>

                  <div className="up-img-wrap">
                    <img
                      src={product.image}
                      alt={product.itemname}
                    />
                    {product.category && (
                      <span className="up-category-tag">
                        {product.category}
                      </span>
                    )}
                  </div>

                  <div className="up-card-body">
                    <h5 className="up-item-name" title={product.itemname}>
                      {product.itemname}
                    </h5>

                    <p className="up-price">
                      ₹{product.price}
                      <span>incl. taxes</span>
                    </p>

                    <div className="up-btn-row">
                      <button
                        className="up-btn-cart"
                        onClick={() => addToCart(product.itemid)}
                      >
                        🛒 Cart
                      </button>
                      <button
                        className="up-btn-buy"
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
          )}
        </div>

      </div>
    </>
  );
}

export default UserProduce;