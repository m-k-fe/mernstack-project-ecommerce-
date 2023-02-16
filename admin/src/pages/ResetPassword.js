import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAdmin, reset } from "../redux/features/authSlice";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { token } = params;
  const [password, setPassword] = useState("");
  const { loading, resetSuccess, resetError } = useSelector(
    (state) => state.auth
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordAdmin({ password, token }));
    dispatch(reset());
  };
  useEffect(() => {
    if (resetSuccess && !resetError) {
      navigate("/");
      dispatch(reset());
    }
  }, [resetSuccess, resetError, navigate, dispatch]);
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Reset password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {resetSuccess && <div className="success">{resetSuccess}</div>}
          {resetError && <div className="error">{resetError}</div>}
          <button type="submit">{loading ? "Loading" : "Send"}</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
