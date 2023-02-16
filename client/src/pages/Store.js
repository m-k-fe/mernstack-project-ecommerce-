import React from "react";
import { useDispatch } from "react-redux";
import Cars from "../components/Cars";
import {
  filterByCategory,
  filterByPrice,
  getProducts,
} from "../redux/features/productsSlice";

function Store() {
  const dispatch = useDispatch();
  const handleCategoryChange = (e) => {
    if (e.target.value === "all") dispatch(getProducts());
    else dispatch(filterByCategory(e.target.value));
  };
  const handlePriceChange = (e) => {
    if (e.target.value === "all") dispatch(getProducts());
    else dispatch(filterByPrice(e.target.value));
  };
  return (
    <div className="store">
      <div className="container">
        <h2>Our Store</h2>
        <div className="store-content">
          <div className="settings">
            <div>
              <select onChange={handleCategoryChange}>
                <option disabled selected>
                  Category
                </option>
                <option value="all">All</option>
                <option value="laptop">Laptops</option>
                <option value="mobile">Mobiles</option>
                <option value="watch">Watches</option>
                <option value="accessorie">Accessorie's</option>
              </select>
              <select onChange={handlePriceChange}>
                <option disabled selected>
                  Price
                </option>
                <option value="all">All</option>
                <option value="price[gte]=0&price[lte]=500">0-500</option>
                <option value="price[gt]=500&price[lte]=700">500-700</option>
                <option value="price[gt]=700&price[lte]=1000">700-1000</option>
                <option value="price[gt]=1000"> {`>1000`} </option>
              </select>
            </div>
          </div>
          <div className="products">
            <Cars />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
