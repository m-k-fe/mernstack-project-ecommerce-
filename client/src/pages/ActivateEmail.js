import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ActivateEmail() {
  const params = useParams();
  const { id } = params;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await axios({
          method: "post",
          url: "/api/auth/activation",
          data: {
            activateToken: id,
          },
          withCredentials: true,
        });
        setSuccess(response.data.message);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    sendRequest();
  }, []);
  return (
    <div className="activate-email-page">
      {error && (
        <div className="error">
          <h3>{error}</h3>
        </div>
      )}
      {success && (
        <div className="success">
          <h3>{success}</h3>
        </div>
      )}
    </div>
  );
}

export default ActivateEmail;
