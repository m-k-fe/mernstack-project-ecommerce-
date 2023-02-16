import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../redux/features/ordersSlice";
import { CiEdit } from "react-icons/ci";

function AllOrders() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);
  useEffect(() => {
    if (token) dispatch(getAllOrders(token));
  }, [token, dispatch]);
  return (
    <div className="main">
      <div className="allOrders">
        <div className="cardHeader">
          <h2>All Orders</h2>
        </div>

        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Price</td>
              <td>Payment</td>
              <td>Status</td>
              <td>Edit Status</td>
            </tr>
          </thead>

          <tbody>
            {orders?.map((item) => (
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
                <td>
                  <Link to={`/admin/change-order-status/${item?._id}`}>
                    <CiEdit />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllOrders;
