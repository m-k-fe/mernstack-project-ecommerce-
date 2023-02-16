import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiMenu } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { getUserInfo } from "../redux/features/usersSlice";

function TopBar() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { custommer } = useSelector((state) => state.users);
  useEffect(() => {
    if (token) dispatch(getUserInfo(token));
  }, [token, dispatch]);
  return (
    <div className="topbar">
      <div className="toggle">
        <BiMenu className="react-icon" />
      </div>

      <div className="search">
        <label>
          <input type="text" placeholder="Search here" />
          <CiSearch className="react-icon" />
        </label>
      </div>

      <div className="user">
        <img src={custommer?.image} alt={custommer?.username} />
      </div>
    </div>
  );
}

export default TopBar;
