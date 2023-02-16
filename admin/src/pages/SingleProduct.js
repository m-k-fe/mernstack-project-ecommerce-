import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../redux/features/productsSlice";

function SingleProduct() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { product } = useSelector((state) => state.products);
  useEffect(() => {
    if (id) dispatch(getProduct(id));
  }, [id, dispatch]);
  return (
    <div className="main">
      <div className="img-container" style={{ margin: "20px" }}>
        <img
          src={product?.img}
          alt={product?._id}
          style={{
            width: "100%",
            height: "400px",
            objectFit: "contain",
            border: "1px solid red",
          }}
        />
      </div>
      <div className="details-info allOrders">
        <table>
          <thead>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Count</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Size</th>
          </thead>
          <tbody>
            <tr>
              <td>{product?._id}</td>
              <td>{product?.title}</td>
              <td>{product?.category}</td>
              <td>{product?.count}</td>
              <td>{product?.brand}</td>
              <td>${product?.price}</td>
              <td>{product?.size}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="description" style={{ margin: "0 20px" }}>
        <h3>Description:</h3>
        <p>{product?.description}</p>
      </div>
    </div>
  );
}

export default SingleProduct;
