import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "/api/auth/reset-password",
        { password },
        { headers: { Authorization: id } }
      );
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response.data.message);
    }
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
          <h3>Réinitialisez votre mot de passe</h3>
          <form onSubmit={handleFormSubmit}>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

export default ResetPassword;
