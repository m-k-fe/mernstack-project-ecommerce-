import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { addToCart } from "../redux/features/cartSlice";
import {
  addReview,
  getProduct,
  getProductReviews,
  getRelatedProducts,
} from "../redux/features/productsSlice";
import ReactStars from "react-rating-stars-component";

function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { token } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { product, relatedProducts } = useSelector((state) => state.products);
  const [qty, setQty] = useState(0);
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const handleAddToCart = () => {
    if (!token) alert("Veuillez connecter maintenant");
    else {
      dispatch(addToCart(product));
      navigate("/cart");
    }
  };
  const ratingChanged = (newRating) => {
    setStar(newRating);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment && id && token) {
      dispatch(
        addReview({ star, productId: product?._id, comment, token })
      ).then(() => dispatch(getProduct(product?._id)));
      setComment("");
      setStar(0);
    }
  };
  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(
      getRelatedProducts({ category: product?.category, id: product?._id })
    );
  }, [id, product?.category, product?._id]);
  return (
    <div className="product-details-page">
      <div className="container">
        <div className="details-content">
          <div className="details-img">
            <img src={product?.img} alt={product?._id} />
          </div>
          <div className="details-info">
            <div>
              <span>Title:</span>
              <h2>{product?.title}</h2>
            </div>
            <div>
              <span>Description:</span>
              <p>{product?.description}</p>
            </div>
            <div>
              <span>Size:</span>
              <p>{product?.size}</p>
            </div>
            <div>
              <span>Category:</span>
              <p>{product?.category}</p>
            </div>
            <div>
              <span>Brand:</span>
              <p style={{ textTransform: "capitalize" }}>{product?.brand}</p>
            </div>
            <div>
              <span>Price:</span>
              <p>{product?.price}$</p>
            </div>
            {product?.ratings?.length > 0 && (
              <div>
                <span>Reviews:</span>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <ReactStars
                    count={5}
                    size={24}
                    value={product?.totalrating}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <span style={{ color: "#777777" }}>
                    ({product?.ratings?.length}{" "}
                    {product?.ratings?.length > 1 ? "Reviews" : "Review"})
                  </span>
                </div>
              </div>
            )}
            <button onClick={handleAddToCart}>Ajouter au panier</button>
          </div>
        </div>
        <div className="reviews-container">
          <h2>Reviews</h2>
          {token && (
            <div className="add-review">
              <div>
                <h4>Write a review</h4>
                <ReactStars
                  count={5}
                  size={24}
                  value={4}
                  onChange={ratingChanged}
                  edit={true}
                  activeColor="#ffd700"
                />
                <form onSubmit={handleSubmit}>
                  <textarea
                    name=""
                    id=""
                    className="w-100 form-control"
                    cols="30"
                    rows="5"
                    placeholder="Comments"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <div>
                    <input type="submit" value="Submit Review" />
                  </div>
                </form>
              </div>
              <hr />
            </div>
          )}
          <div className="reviews-content">
            {product?.ratings?.map((item) => (
              <div className="review" key={item._id}>
                <div className="review-header">
                  <h5>{item.postedby.username}</h5>
                  <ReactStars
                    count={5}
                    size={24}
                    value={item.star}
                    edit={false}
                    activeColor="#ffd700"
                  />
                </div>
                <div className="review-body">
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="related-products">
          <h1>Related Products</h1>
          <div className="images">
            <ul>
              {relatedProducts?.slice(0, 3).map((item) => (
                <li className="car" key={item._id}>
                  <div>
                    <img src={item.img} alt={item._id} />
                  </div>
                  <Link to={`/product/${item._id}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
