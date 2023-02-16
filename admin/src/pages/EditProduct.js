import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  getProduct,
  getAllProducts,
} from "../redux/features/productsSlice";

function EditProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { token } = useSelector((state) => state.auth);
  const { product } = useSelector((state) => state.products);
  const [productInfo, setProductInfo] = useState({
    title: "",
    price: "",
    count: "",
    brand: "",
    description: "",
    img: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, price, count, brand, description, img } = productInfo;
    if (!title && !price && !count && !brand && !description && !img)
      alert("No Modifiacation");
    else {
      let array = Object.keys(productInfo).filter(
        (item) => productInfo[item] !== ""
      );
      let data = {};
      array.forEach((item) => {
        data[item] = productInfo[item];
      });
      dispatch(editProduct({ data, id, token })).then(() => {
        dispatch(getAllProducts(token));
      });
      navigate("/admin/all-products");
    }
  };
  useEffect(() => {
    if (id) dispatch(getProduct(id));
  }, [id, dispatch]);
  return (
    <div className="main new-product">
      <div className="allOrders">
        <div className="cardHeader">
          <h2>Edit Product</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Title"
            defaultValue={product?.title}
            onChange={(e) =>
              setProductInfo({ ...productInfo, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Enter Brand"
            defaultValue={product?.brand}
            onChange={(e) =>
              setProductInfo({ ...productInfo, brand: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Enter Price"
            min={1}
            defaultValue={product?.price}
            onChange={(e) =>
              setProductInfo({ ...productInfo, price: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Select Count"
            min={1}
            defaultValue={product?.count}
            onChange={(e) =>
              setProductInfo({ ...productInfo, count: e.target.value })
            }
          />
          <textarea
            placeholder="Enter Description"
            defaultValue={product?.description}
            onChange={(e) =>
              setProductInfo({ ...productInfo, description: e.target.value })
            }
          ></textarea>
          <input
            type="text"
            placeholder="Copy Img Url"
            defaultValue={product?.img}
            onChange={(e) =>
              setProductInfo({ ...productInfo, img: e.target.value })
            }
          />
          <input type="submit" value="Edit" className="btn" />
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
