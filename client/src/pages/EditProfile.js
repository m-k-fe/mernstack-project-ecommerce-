import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editProfile, getUserInfo } from "../redux/features/usersSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({
    image: "",
    username: "",
    password: "",
  });
  const { token } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { image, username, password } = productInfo;
    if (!image && !username && !password) alert("No Modifiacation");
    else {
      let array = Object.keys(productInfo).filter(
        (item) => productInfo[item] !== ""
      );
      let data = {};
      array.forEach((item) => {
        data[item] = productInfo[item];
      });
      dispatch(editProfile({ data, token })).then(() => getUserInfo(token));
      navigate("/profile");
    }
  };
  return (
    <div className="edit-profile-page">
      <div className="container">
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Copy Image Url"
            onChange={(e) =>
              setProductInfo({ ...productInfo, image: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) =>
              setProductInfo({ ...productInfo, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) =>
              setProductInfo({ ...productInfo, password: e.target.value })
            }
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
