import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const handleLogOut = async () => {
    try {
      await axios({
        method: "post",
        url: "/api/auth/logout",
        withCredentials: true,
        headers: { Authorization: token },
      });
      window.location = "/login";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header>
      <div className="menu_toggle">
        <span></span>
      </div>

      <div className="logo">
        <Link to="/">
          <p>
            <span>Luxe</span>Phone
          </p>
        </Link>
      </div>
      <ul className="menu">
        <li>
          <Link to="/">Acceuil</Link>
        </li>
        <li>
          <Link to="/store">Store</Link>
        </li>
        {token && (
          <>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        )}
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      {token ? (
        <button className="login_btn" onClick={handleLogOut}>
          <a>LOGOUT</a>
        </button>
      ) : (
        <button className="login_btn">
          <Link to="/login">LOGIN</Link>
        </button>
      )}
    </header>
  );
}

export default Navbar;
