import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewOrder } from "../redux/features/orderSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    method: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, phoneNumber, method } = userInfo;
    if (fullName && email && phoneNumber && method) {
      if (method === "cod") {
        dispatch(
          createNewOrder({ paymentInfo: userInfo, method: "cod", token })
        );
        navigate("/orders");
      }
      if (method === "paypal") navigate("/paypal");
    }
  };
  return (
    <div className="checkout">
      <div className="container">
        <h1>Checkout</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={userInfo.fullName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, fullName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={userInfo.phoneNumber}
            onChange={(e) =>
              setUserInfo({ ...userInfo, phoneNumber: e.target.value })
            }
          />
          <div>
            <select
              onChange={(e) =>
                setUserInfo({ ...userInfo, method: e.target.value })
              }
            >
              <option disabled selected>
                Payment Method
              </option>
              <option value="cod">COD</option>
              <option value="paypal">Paypal</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
