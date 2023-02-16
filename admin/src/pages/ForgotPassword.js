import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAdmin, reset } from "../redux/features/authSlice";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { loading, forgotSuccess, forgotError } = useSelector(
    (state) => state.auth
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAdmin(email));
    dispatch(reset());
  };
  useEffect(() => {
    if (forgotSuccess && !forgotError) {
      navigate("/");
      dispatch(reset());
    }
  }, [forgotSuccess, forgotError, navigate, dispatch]);
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Forgot password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Addresse Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {forgotSuccess && <div className="success">{forgotSuccess}</div>}
          {forgotError && <div className="error">{forgotError}</div>}
          <button type="submit">{loading ? "Loading" : "Send"}</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
