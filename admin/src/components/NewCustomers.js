import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/features/usersSlice";

function NewCustomers() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { custommers } = useSelector((state) => state.users);
  useEffect(() => {
    if (token) dispatch(getAllUsers(token));
  }, [token, dispatch]);
  return (
    <div class="recentCustomers">
      <div class="cardHeader">
        <h2>Recent Customers</h2>
      </div>

      <table>
        {custommers?.slice(0, 6).map((item) => (
          <tr key={item?._id}>
            <td width="60px">
              <div class="imgBx">
                <img src={item?.image} alt="" />
              </div>
            </td>
            <td>
              <h4>
                {item?.username} <br /> <span>{item?.email}</span>
              </h4>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default NewCustomers;
