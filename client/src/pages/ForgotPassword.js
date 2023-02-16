import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "/api/auth/forgot-password",
        data: {
          email,
        },
        withCredentials: true,
      });
      setSuccess(response.data.message);
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
          <h3>Mot de passe oublié</h3>
          <form onSubmit={handleFormSubmit}>
            <input
              type="email"
              placeholder="Adresse Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <input type="submit" value="Envoyer" />
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
