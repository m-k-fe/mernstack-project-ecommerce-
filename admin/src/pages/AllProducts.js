import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../redux/features/productsSlice";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function AllProducts() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const handleDelete = (id) => {
    dispatch(deleteProduct({ id, token })).then(() =>
      dispatch(getAllProducts(token))
    );
  };
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className="main">
      <div className="allOrders">
        <div className="cardHeader">
          <h2>All Products</h2>
          <Link
            to="/admin/create-new-product"
            style={{ marginBottom: "30px", display: "block" }}
          >
            Create New Product
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <td>Title</td>
              <td>Image</td>
              <td>Price</td>
              <td>Size</td>
              <td>Category</td>
              <td>Brand</td>
              <td>Count In Stock</td>
              <td>Edit Product</td>
              <td>Delete Product</td>
            </tr>
          </thead>

          <tbody>
            {products?.map((item) => (
              <tr key={item?._id}>
                <td>
                  <Link
                    to={`/admin/product/${item?._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {item?.title}
                  </Link>
                </td>
                <td>
                  <img
                    src={item?.img}
                    alt={item?._id}
                    style={{ width: "80px", height: "80px" }}
                  />
                </td>
                <td>${item?.price}</td>
                <td>{item?.size}</td>
                <td>{item?.category}</td>
                <td>{item?.brand}</td>
                <td>{item?.count}</td>
                <td>
                  <Link to={`/admin/edit-product/${item?._id}`}>
                    <CiEdit />
                  </Link>
                </td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    height: "95px",
                  }}
                >
                  <MdDelete onClick={() => handleDelete(item?._id)} />
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(item?._id)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllProducts;
