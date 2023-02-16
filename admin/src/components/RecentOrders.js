import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../redux/features/ordersSlice";

function RecentOrders() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);
  useEffect(() => {
    if (token) dispatch(getAllOrders(token));
  }, [token, dispatch]);
  return (
    <div className="recentOrders">
      <div className="cardHeader">
        <h2>Recent Orders</h2>
        <Link to="/admin/all-orders" className="btn">
          View All
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Price</td>
            <td>Payment</td>
            <td>Status</td>
          </tr>
        </thead>

        <tbody>
          {orders?.slice(0, 8).map((item) => (
            <tr key={item?._id}>
              <td>{item?._id}</td>
              <td>${item?.paymentIntent?.amount / 100}</td>
              <td>{item?.orderStatus === "Delivred" ? "Paid" : "Due"}</td>
              <td>
                <span
                  className={
                    item?.orderStatus === "Delivred"
                      ? "status delivred"
                      : item?.orderStatus === "Processing"
                      ? "status processing"
                      : item?.orderStatus === "Cancelled"
                      ? "status cancelled"
                      : ""
                  }
                >
                  {item?.orderStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentOrders;
