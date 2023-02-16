import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { addToCart } from "../redux/features/cartSlice";

function Cars() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const handleAddToCart = (product) => {
    if (!token) alert("Veuillez connecter maintenant");
    else {
      dispatch(addToCart(product));
      navigate("/cart");
    }
  };
  return (
    <section id="cars">
      {location.pathname == "/" && <h1 className="section_title">phoneshop</h1>}
      <div className="images">
        <ul>
          {products?.map((item) => (
            <li className="car" key={item._id}>
              <div>
                <img src={item.img} alt={item._id} />
              </div>
              <Link to={`/product/${item._id}`}>{item.title}</Link>
              <span className="prix">{item.price}€</span>
              <button onClick={() => handleAddToCart(item)}>
                ACHETER MAINTENANT
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Cars;
