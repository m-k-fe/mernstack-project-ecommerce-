import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addToCart,
  decreaseQty,
  clearCart,
  createUserCart,
} from "../redux/features/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const handleIncreaseQty = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseQty = (product) => {
    dispatch(decreaseQty(product));
  };
  const handleCheckout = () => {
    if (token) {
      dispatch(createUserCart({ cartItems, token }));
      navigate("/checkout");
    }
  };
  return (
    <div className="cart-page">
      <div className="container">
        {cartItems?.length == 0 ? (
          <div className="cart-empty">
            <p>Your Cart Is Currently Empty</p>
            <div className="start-shopping">
              <Link to="/store">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <table>
              <thead>
                <th>Product</th>
                <th>Title</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Price</th>
              </thead>
              <tbody>
                {cartItems?.map((item) => (
                  <tr>
                    <td>
                      <img src={item.img} alt={item._id} />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.size}</td>
                    <td>
                      <button onClick={() => handleIncreaseQty(item)}>+</button>
                      <span>{item.qty}</span>
                      <button onClick={() => handleDecreaseQty(item)}>-</button>
                    </td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-summary">
              <button
                className="clear-cart"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">
                    $ {cartItems?.reduce((a, b) => a + b.price * b.qty, 0)}
                  </span>
                </div>
                <p>Taxes And Shipping Calculated At Checkout</p>
                <button onClick={handleCheckout}>Checkout</button>
                <div className="continue-shopping">
                  <Link to="/store">
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
