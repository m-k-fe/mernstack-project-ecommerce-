import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getAllProducts } from "../redux/features/productsSlice";

function CreateNewProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [productInfo, setProductInfo] = useState({
    title: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    size: "",
    count: "",
    img: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, brand, category, description, price, size, count, img } =
      productInfo;
    if (
      title &&
      brand &&
      category &&
      description &&
      price &&
      size &&
      count &&
      img
    ) {
      const data = {
        title,
        brand,
        category,
        description,
        price,
        size,
        count,
        img,
      };
      dispatch(createProduct({ data, token })).then(() =>
        dispatch(getAllProducts(token))
      );
      navigate("/admin");
    } else alert("Please Fill Data");
  };
  return (
    <div className="main new-product">
      <div className="allOrders">
        <div className="cardHeader">
          <h2>Create New Product</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Title"
            onChange={(e) =>
              setProductInfo({ ...productInfo, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Enter Brand"
            onChange={(e) =>
              setProductInfo({ ...productInfo, brand: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Enter Price"
            min={1}
            onChange={(e) =>
              setProductInfo({ ...productInfo, price: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Select Count"
            min={1}
            onChange={(e) =>
              setProductInfo({ ...productInfo, count: e.target.value })
            }
          />
          <select
            onChange={(e) =>
              setProductInfo({ ...productInfo, category: e.target.value })
            }
          >
            <option selected hidden>
              Select Category
            </option>
            <option value="mobile">Mobile</option>
            <option value="laptop">Laptop</option>
            <option value="accessorie">Accessorie</option>
          </select>
          <select
            onChange={(e) =>
              setProductInfo({ ...productInfo, size: e.target.value })
            }
          >
            <option selected hidden>
              Select Size
            </option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
          <textarea
            placeholder="Enter Description"
            onChange={(e) =>
              setProductInfo({ ...productInfo, description: e.target.value })
            }
          ></textarea>
          <input
            type="text"
            placeholder="Copy Image Url"
            onChange={(e) =>
              setProductInfo({ ...productInfo, img: e.target.value })
            }
          />
          <input type="submit" value="Create" className="btn" />
        </form>
      </div>
    </div>
  );
}

export default CreateNewProduct;
