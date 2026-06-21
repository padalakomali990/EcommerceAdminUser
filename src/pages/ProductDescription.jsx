import React, { useEffect, useState } from "react";
import axios from "../api";
import { useParams } from "react-router-dom";


function ProductDescription() {

    const { itemid } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewFetchLoading, setReviewFetchLoading] = useState(true);

    async function fetchProduct() {
        try {

            const res = await axios.get(
                `/api/items/${itemid}`
            );

            if (res.data.status === "success") {
                setProduct(res.data.item);
            }

        } catch (error) {
            console.log(error);
            alert("Failed to load product");
        } finally {
            setLoading(false);
        }
    }

    async function submitReview() {

        if (!rating || !reviewText) {
            alert("Please enter rating and review");
            return;
        }

        try {

            setReviewLoading(true);

            const res = await axios.post(
                `/api/add-review/${itemid}`,
                {
                    rating: rating,
                    review_text: reviewText
                }
            );

            alert(res.data.message);

            setRating("");
            setReviewText("");

            fetchReviews();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to submit review"
            );

        } finally {
            setReviewLoading(false);
        }
    }

    async function fetchReviews() {

        try {

            const res = await axios.get(
                `/api/reviews/${itemid}`
            );

            if (res.data.status === "success") {
                setReviews(res.data.reviews);
            }

        } catch (error) {

            console.log(error);

        } finally {

            setReviewFetchLoading(false);

        }
    }

    useEffect(() => {
        fetchProduct();
        fetchReviews();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!product) {
        return <h2>Product not found</h2>;
    }

    return (
        <div style={{ padding: "40px" }}>

            <img
                src={product.image_url}
                alt={product.itemname}
                width="300"
            />

            <h1>{product.itemname}</h1>

            <h3>₹ {product.price}</h3>

            <p>
                <strong>Description:</strong>
                {product.item_desc}
            </p>

            <p>
                <strong>About:</strong>
                {product.item_about}
            </p>

            <p>
                <strong>Category:</strong>
                {product.category}
            </p>

            <p>
                <strong>Stock:</strong>
                {product.quantity}
            </p>

            <div
                style={{
                    marginTop: "40px",
                    border: "1px solid #ddd",
                    padding: "20px",
                    borderRadius: "10px"
                }}
            >

                <h2>Write a Review</h2>

                <div style={{ marginBottom: "15px" }}>

                    <label>Rating (1 to 5)</label>

                    <select
                        value={rating}
                        onChange={(e) =>
                            setRating(e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    >
                        <option value="">Select Rating</option>
                        <option value="1">1 ⭐</option>
                        <option value="2">2 ⭐⭐</option>
                        <option value="3">3 ⭐⭐⭐</option>
                        <option value="4">4 ⭐⭐⭐⭐</option>
                        <option value="5">5 ⭐⭐⭐⭐⭐</option>
                    </select>

                </div>

                <div style={{ marginBottom: "15px" }}>

                    <label>Review</label>

                    <textarea
                        rows="4"
                        value={reviewText}
                        onChange={(e) =>
                            setReviewText(e.target.value)
                        }
                        placeholder="Write your review..."
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    />

                </div>

                <button
                    onClick={submitReview}
                    style={{
                        background: "#0ea5e9",
                        color: "white",
                        border: "none",
                        padding: "12px 20px",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    {reviewLoading
                        ? "Submitting..."
                        : "Submit Review"}
                </button>

            </div>

            <div
                style={{
                    marginTop: "40px",
                    borderTop: "1px solid #ddd",
                    paddingTop: "20px"
                }}
            >

                <h2>Customer Reviews</h2>

                {reviewFetchLoading ? (

                    <p>Loading reviews...</p>

                ) : reviews.length === 0 ? (

                    <p>No reviews yet</p>

                ) : (

                    reviews.map((review, index) => (

                        <div
                            key={index}
                            style={{
                                border: "1px solid #eee",
                                padding: "15px",
                                borderRadius: "10px",
                                marginBottom: "15px",
                                background: "#fafafa"
                            }}
                        >

                            <h4>
                                {review.username || "Anonymous"}
                            </h4>

                            <p
                                style={{
                                    color: "#f59e0b",
                                    fontSize: "18px"
                                }}
                            >
                                {"⭐".repeat(review.rating)}
                            </p>

                            <p>
                                {review.r_text}
                            </p>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default ProductDescription;