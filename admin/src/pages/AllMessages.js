import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteMessage, getAllMessages } from "../redux/features/usersSlice";
import { MdDelete } from "react-icons/md";

function AllMessages() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.users);
  const handleClick = (id) => {
    navigate(`/admin/message/${id}`);
  };
  const handleDelete = (id) => {
    dispatch(deleteMessage({ id, token })).then(() =>
      dispatch(getAllMessages(token))
    );
    alert("Success");
  };
  useEffect(() => {
    if (token) dispatch(getAllMessages(token));
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
              <td>Id</td>
              <td>Name</td>
              <td>Email</td>
              <td>Object</td>
              <td>Delete Message</td>
            </tr>
          </thead>

          <tbody>
            {messages?.map((item) => (
              <tr key={item?._id}>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClick(item?._id)}
                >
                  {item._id}
                </td>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>{item?.object}</td>
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

export default AllMessages;
