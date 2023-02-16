import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  getUser,
  updateUsersRole,
} from "../redux/features/usersSlice";

function ChangeUserRole() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { custommer } = useSelector((state) => state.users);
  const { id } = params;
  const [role, setRole] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (role) {
      dispatch(updateUsersRole({ id, role, token })).then(() =>
        dispatch(getAllUsers(token))
      );
      navigate("/admin");
    } else alert("You should select role");
  };
  useEffect(() => {
    if (id && token) dispatch(getUser({ id, token }));
  }, [id, token, dispatch]);
  return (
    <div className="main">
      <div className="change-order">
        <h2>Change User Role</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={custommer?.role} />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option selected disabled>
              Select Role
            </option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <input type="submit" value="Change" className="btn" />
        </form>
      </div>
    </div>
  );
}

export default ChangeUserRole;
