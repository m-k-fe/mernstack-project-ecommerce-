import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import ActivateEmail from "./pages/ActivateEmail";
import { getToken } from "./redux/features/authSlice";
import { getProducts } from "./redux/features/productsSlice";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Paypal from "./pages/Paypal";
import Orders from "./pages/Orders";
import Store from "./pages/Store";
import Profile from "./pages/Profile";
import "./App.css";
import EditProfile from "./pages/EditProfile";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getToken());
    dispatch(getProducts());
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route
              path="register"
              element={token ? <Navigate to="/" /> : <Register />}
            />
            <Route
              path="auth/active/:id"
              element={token ? <Navigate to="/" /> : <ActivateEmail />}
            />
            <Route
              path="login"
              element={token ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="forgot-password"
              element={token ? <Navigate to="/" /> : <ForgotPassword />}
            />
            <Route
              path="auth/reset/:id"
              element={token ? <Navigate to="/" /> : <ResetPassword />}
            />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route
              path="cart"
              element={token ? <Cart /> : <Navigate to="/login" />}
            />
            <Route
              path="checkout"
              element={token ? <Checkout /> : <Navigate to="/login" />}
            />
            <Route
              path="paypal"
              element={token ? <Paypal /> : <Navigate to="/login" />}
            />
            <Route
              path="orders"
              element={token ? <Orders /> : <Navigate to="/login" />}
            />
            <Route path="store" element={<Store />} />
            <Route
              path="profile"
              element={token ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="edit-profile"
              element={token ? <EditProfile /> : <Navigate to="/login" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
