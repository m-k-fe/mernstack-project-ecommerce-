import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getToken, loginUser } from "../redux/features/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ setError, setSuccess, setUser, user })).then(() =>
      dispatch(getToken())
    );
  };
  useEffect(() => {
    if (success) {
      setError(false);
      navigate("/");
    }
    if (error) setSuccess(false);
  }, [success, error]);
  return (
    <section id="contact">
      <div className="localisation_contact_div register">
        <div className="form_contact">
          <h3>Se Connecter</h3>
          <form onSubmit={handleFormSubmit}>
            <input
              type="email"
              placeholder="Adresse Mail"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Mot De Passe"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            {error && (
              <div className="error">
                <p className="">{error}</p>
              </div>
            )}
            {success && (
              <div className="success">
                <p className="">{success}</p>
              </div>
            )}
            <input type="submit" value="Connecter" />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link to="/register" style={{ fontSize: "14px" }}>
                Vous n'avez un compte?
              </Link>
              <Link to="/forgot-password" style={{ fontSize: "14px" }}>
                Mot de passe oublié
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
