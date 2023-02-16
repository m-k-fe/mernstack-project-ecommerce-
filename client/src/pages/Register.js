import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confPassword: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confPassword } = user;
    try {
      const response = await axios({
        method: "post",
        url: "/api/auth/register",
        data: {
          username,
          email,
          password,
          confPassword,
        },
        withCredentials: true,
      });
      setSuccess(response.data.message);
      setUser({
        username: "",
        email: "",
        password: "",
        confPassword: "",
      });
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  useEffect(() => {
    if (success) {
      setError(false);
      navigate("/login");
    }
    if (error) setSuccess(false);
  }, [success, error]);
  return (
    <section id="contact">
      <div className="localisation_contact_div register">
        <div className="form_contact">
          <h3>S'inscrire</h3>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
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
            <input
              type="password"
              placeholder="Confirmer Le Mot De Passe"
              value={user.confPassword}
              onChange={(e) =>
                setUser({ ...user, confPassword: e.target.value })
              }
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
            <input type="submit" value="S'inscrire" />
            <Link to="/login" style={{ fontSize: "16px" }}>
              Vous avez un compte?
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
