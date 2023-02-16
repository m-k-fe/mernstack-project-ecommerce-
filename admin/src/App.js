import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import { getAccessToken } from "./redux/features/authSlice";
import "./App.css";
import AllOrders from "./pages/AllOrders";
import ChangeOrderStatus from "./pages/ChangeOrderStatus";
import AllCustomers from "./pages/AllCustomers";
import ChangeUserRole from "./pages/ChangeUserRole";
import AllProducts from "./pages/AllProducts";
import CreateNewProduct from "./pages/CreateNewProduct";
import EditProduct from "./pages/EditProduct";
import AllMessages from "./pages/AllMessages";
import SingleProduct from "./pages/SingleProduct";
import SingleMsg from "./pages/SingleMsg";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAccessToken());
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/admin" /> : <Login />}
          />
          <Route
            path="/forgot-password"
            element={token ? <Navigate to="/admin" /> : <ForgotPassword />}
          />
          <Route
            path="/auth/reset/:token"
            element={token ? <Navigate to="/admin" /> : <ResetPassword />}
          />
          <Route
            path="/admin"
            element={token ? <MainLayout /> : <Navigate to="/" />}
          >
            <Route index element={<Dashboard />} />
            <Route path="all-orders" element={<AllOrders />} />
            <Route
              path="change-order-status/:id"
              element={<ChangeOrderStatus />}
            />
            <Route path="all-customers" element={<AllCustomers />} />
            <Route path="change-user-role/:id" element={<ChangeUserRole />} />
            <Route path="all-products" element={<AllProducts />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="create-new-product" element={<CreateNewProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="all-messages" element={<AllMessages />} />
            <Route path="message/:id" element={<SingleMsg />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
