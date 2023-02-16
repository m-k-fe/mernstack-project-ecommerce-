import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken, loginAdmin, reset } from "../redux/features/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });
  const { loading, loginSuccess, loginError } = useSelector(
    (state) => state.auth
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(user)).then(() => dispatch(getAccessToken()));
    dispatch(reset());
  };
  useEffect(() => {
    if (loginSuccess && !loginError) {
      navigate("/admin");
      dispatch(reset());
    }
  }, [loginSuccess, loginError, navigate, dispatch]);
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login admin</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Addresse Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {loginSuccess && <div className="success">{loginSuccess}</div>}
          {loginError && <div className="error">{loginError}</div>}
          <button type="submit">{loading ? "Loading" : "Se connecter"}</button>
          <Link to="/forgot-password">Forgot password</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
