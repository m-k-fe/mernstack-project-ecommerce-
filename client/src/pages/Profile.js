import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, uploadImage } from "../redux/features/usersSlice";
import { getOrders } from "../redux/features/orderSlice";

function Profile() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.users);
  const { orders } = useSelector((state) => state.order);
  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    if (token) {
      dispatch(getUserInfo(token));
      dispatch(getOrders(token));
    }
  }, [token, dispatch]);
  return (
    <div className="profile-page" style={{ marginBottom: "30px" }}>
      <div className="container">
        <h1>Profil d'utilisateur</h1>
        <section>
          <div>
            <img src={user?.image} alt={user?._id} />
          </div>
          <div className="info">
            <div>
              <span style={{ fontSize: "14px" }}>Username: </span>
              <p style={{ fontSize: "14px" }}>{user?.username}</p>
            </div>
            <div>
              <span style={{ fontSize: "14px" }}>Email: </span>
              <p style={{ fontSize: "14px" }}>{user?.email}</p>
            </div>
            <div>
              <span style={{ fontSize: "14px" }}>Role: </span>
              <p style={{ fontSize: "14px", textTransform: "capitalize" }}>
                {user?.role}
              </p>
            </div>
            <div>
              <span style={{ fontSize: "14px" }}>Orders: </span>
              <Link to="/orders" style={{ fontSize: "14px" }}>
                {orders?.length} orders
              </Link>
            </div>
            <div>
              <span style={{ fontSize: "14px" }}>Cart: </span>
              <Link to="/cart" style={{ fontSize: "14px" }}>
                {cartItems?.length} {cartItems?.length === 1 ? "item" : "items"}
              </Link>
            </div>
            <div>
              <Link
                to="/edit-profile"
                style={{ fontSize: "16px", textDecoration: "underline" }}
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
