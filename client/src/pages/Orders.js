import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../redux/features/orderSlice";
import { dateParser } from "../util";

function Orders() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);
  useEffect(() => {
    if (token) dispatch(getOrders(token));
  }, [token]);
  return (
    <div className="orders-page" style={{ marginBottom: "30px" }}>
      <div className="container">
        <div className="orderhistory-container">
          <div className="orderhistory-row">
            <div className="orderhistory-col">
              <h2 className="orderhistory-title">Order History</h2>
            </div>
          </div>
          <div className="orderhistory-row">
            <div className="orderhistory-col">
              <div className="tables">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer Name</th>
                      <th>Order Total</th>
                      <th>Method</th>
                      <th>Order Status</th>
                      <th>Order Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((item) => (
                      <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>
                          {item.paymentIntent.method === "cod"
                            ? item.paymentIntent.paymentInfo.fullName
                            : item.paymentIntent.paymentInfo?.payer?.name
                                ?.given_name +
                              " " +
                              item.paymentIntent.paymentInfo?.payer?.name
                                ?.surname}
                        </td>
                        <td>${item.paymentIntent.amount / 100}</td>
                        <td>{item.paymentIntent.method}</td>
                        <td>{item.orderStatus}</td>
                        <td>{dateParser(item.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
