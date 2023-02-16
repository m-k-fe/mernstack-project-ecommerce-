import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  changeOrderStatus,
  getOrder,
} from "../redux/features/ordersSlice";

function ChangeOrderStatus() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { order } = useSelector((state) => state.orders);
  const { id } = params;
  const [status, setStatus] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (status) {
      dispatch(changeOrderStatus({ id, status, token })).then(() =>
        dispatch(getAllOrders(token))
      );
      navigate("/admin");
    } else alert("You should select status");
  };
  useEffect(() => {
    if (id && token) dispatch(getOrder({ id, token }));
  }, [id, token, dispatch]);
  return (
    <div className="main">
      <div className="change-order">
        <h2>Change Order Status</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={order?.orderStatus} />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option selected disabled>
              Select Status
            </option>
            <option value="Delivred">Delivred</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Processing">Processing</option>
            <option value="Not Processed">Not Processed</option>
          </select>
          <input type="submit" value="Change" className="btn" />
        </form>
      </div>
    </div>
  );
}

export default ChangeOrderStatus;
