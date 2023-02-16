import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { deleteUser, getAllUsers } from "../redux/features/usersSlice";

function AllCustomers() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { custommers, message } = useSelector((state) => state.users);
  const handleDelete = (id) => {
    dispatch(deleteUser({ id, token })).then(() =>
      dispatch(getAllUsers(token))
    );
    alert(message.message);
  };
  useEffect(() => {
    if (token) dispatch(getAllUsers(token));
  }, [token, dispatch]);
  return (
    <div className="main">
      <div className="allOrders">
        <div className="cardHeader">
          <h2>All Orders</h2>
        </div>

        <table>
          <thead>
            <tr>
              <td>Username</td>
              <td>Email</td>
              <td>Orders</td>
              <td>Role</td>
              <td>Change Role</td>
              <td>Delete User</td>
            </tr>
          </thead>

          <tbody>
            {custommers?.map((item) => (
              <tr key={item?._id}>
                <td>{item?.username}</td>
                <td>{item?.email}</td>
                <td>Orders</td>
                <td>{item?.role}</td>
                <td>
                  <Link to={`/admin/change-user-role/${item?._id}`}>
                    <CiEdit />
                  </Link>
                </td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
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

export default AllCustomers;
