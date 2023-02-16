import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Paypal() {
  const { cartItems } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: cartItems?.reduce((a, b) => a + b.qty * b.price, 0), // Can also reference a variable or function
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(function (orderData) {
            axios
              .post(
                "/api/users/cart/cash-order",
                { paymentInfo: orderData, method: "paypal" },
                { headers: { Authorization: token } }
              )
              .then((response) => console.log(response));
            console.log(
              "Capture result",
              orderData,
              JSON.stringify(orderData, null, 2)
            );
            const transaction =
              orderData.purchase_units[0].payments.captures[0];
            alert(
              `Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`
            );
          });
        },
      })
      .render("#paypal-button-container");
  }, []);
  return <div id="paypal-button-container"></div>;
}

export default Paypal;
