import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosChatbubbles, IoIosCash } from "react-icons/io";
import { getAllProducts } from "../redux/features/productsSlice";

function Cards() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { products } = useSelector((state) => state.products);
  const { custommers } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <div className="cardBox">
      <div className="card">
        <div>
          <div className="numbers">
            {orders?.reduce((a, b) => a + b.products.length, 0)}
          </div>
          <div className="cardName">Sales</div>
        </div>

        <div className="iconBx">
          <AiOutlineShoppingCart className="react-icon" />
        </div>
      </div>

      <div className="card">
        <div>
          <div className="numbers">
            {products?.reduce((a, b) => a + b.ratings.length, 0)}
          </div>
          <div className="cardName">Comments</div>
        </div>

        <div className="iconBx">
          <IoIosChatbubbles className="react-icon" />
        </div>
      </div>

      <div className="card">
        <div>
          <div className="numbers">
            ${orders?.reduce((a, b) => a + b.paymentIntent.amount / 100, 0)}
          </div>
          <div className="cardName">Earning</div>
        </div>

        <div className="iconBx">
          <IoIosCash className="react-icon" />
        </div>
      </div>

      <div className="card">
        <div>
          <div className="numbers">{custommers?.length}</div>
          <div className="cardName">Customers</div>
        </div>

        <div className="iconBx">
          <AiOutlineUser className="react-icon" />
        </div>
      </div>
    </div>
  );
}

export default Cards;
