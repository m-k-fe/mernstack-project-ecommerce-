import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMessage } from "../redux/features/usersSlice";

function SingleMsg() {
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;
  const { token } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.users);
  console.log(message);
  const timestampParser = (num) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    let date = new Date(num).toLocaleDateString("en-US", options);
    return date.toString();
  };
  useEffect(() => {
    if (id && token) dispatch(getMessage({ id, token }));
  }, [id, token, dispatch]);
  return (
    <div className="main" style={{ margin: "20px" }}>
      <h3>Object: {message?.object}</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "30px",
          paddingRight: "30px",
        }}
      >
        <p>{message?.email}</p>
        <p>{timestampParser(message?.createdAt)}</p>
      </div>
      <div style={{ marginTop: "30px" }}>
        <p>{message?.msg}</p>
      </div>
    </div>
  );
}

export default SingleMsg;
