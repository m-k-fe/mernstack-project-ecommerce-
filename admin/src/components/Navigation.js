import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineHome, HiOutlineUsers } from "react-icons/hi";
import { logOutAdmin } from "../redux/features/authSlice";
import { getAllMessages } from "../redux/features/usersSlice";
import { BsApple } from "react-icons/bs";
import { TbMessageCircle2 } from "react-icons/tb";
import { IoMdHelp, IoIosLogOut } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";

function Navigation() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.users);
  const handleLogOut = () => {
    dispatch(logOutAdmin(token));
    window.location = "/";
  };
  useEffect(() => {
    dispatch(getAllMessages(token));
  }, [token, dispatch]);
  return (
    <div className="container">
      <div className="navigation">
        <ul>
          <li>
            <a href="#">
              <span className="icon">
                <BsApple className="react-icon" />
              </span>
              <span className="title">Brand Name</span>
            </a>
          </li>

          <li>
            <a href="#">
              <span className="icon">
                <HiOutlineHome className="react-icon" />
              </span>
              <Link to="/admin" className="title">
                Dashboard
              </Link>
            </a>
          </li>

          <li>
            <a href="#">
              <span className="icon">
                <HiOutlineUsers className="react-icon" />
              </span>
              <Link to="/admin/all-customers" className="title">
                Customers
              </Link>
            </a>
          </li>

          <li>
            <a href="#">
              <span className="icon">
                <AiOutlineShoppingCart className="react-icon" />
              </span>
              <Link to="/admin/all-products" className="title">
                Products
              </Link>
            </a>
          </li>

          <li>
            <Link to="/admin/all-messages">
              <span className="icon">
                <TbMessageCircle2 className="react-icon" />
              </span>
              <span className="title">Messages</span>
              {messages?.length > 0 && (
                <span
                  className="badge"
                  style={{
                    position: "absolute",
                    fontSize: "10px",
                    display: "block",
                    backgroundColor: "red",
                    width: "15px",
                    height: "15px",
                    lineHeight: "15px",
                    textAlign: "center",
                    borderRadius: "50%",
                    top: "12px",
                    left: "35px",
                  }}
                >
                  {messages?.length}
                </span>
              )}
            </Link>
          </li>

          <li>
            <a href="#">
              <span className="icon">
                <IoMdHelp className="react-icon" />
              </span>
              <span className="title">Help</span>
            </a>
          </li>

          <li>
            <a href="#">
              <span className="icon">
                <FiSettings className="react-icon" />
              </span>
              <span className="title">Settings</span>
            </a>
          </li>

          <li onClick={handleLogOut}>
            <a href="#">
              <span className="icon">
                <IoIosLogOut className="react-icon" />
              </span>
              <span className="title">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
