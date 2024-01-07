import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getUsers } from "../../../lib/helper";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, updateAction } from "../../../redux/reducer";

const Table = () => {
  const { isLoading, isError, data, error } = useQuery("users", getUsers);

  if (isLoading) return <h2>Employee is Loading...</h2>;
  if (isError) return <h2>Got Error{error}</h2>;

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-16 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Salary</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Birthday</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data.map((obj, i) => (
          <Tr {...obj} key={i} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;

export const Tr = ({ _id, name, avatar, email, salary, date, status }) => {
  const visible = useSelector(state => state.app.client.toggleForm);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(toggleChangeAction());
    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
        <img src={avatar || "#"} alt="" className="h-8 w-8 rounded-full object-cover" />
        <span className="text-center ml-2 font-semibold">{name || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{email || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{salary || "Unknown"}</span>
      </td>
      <td className="px-16 py-3">
        <span>{date || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <button className="cursor">
          <span className={`${status == "Active" ? "bg-green-500" : "bg-red-500"} text-white rounded-full px-5 py-1`}>{status || "Unknown"}</span>
        </button>
      </td>
      <td className="px-16 py-2 flex justify-around gap-5">
        <button className="cursor" onClick={handleUpdate}>
          <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
        </button>
        <button>
          <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
        </button>
      </td>
    </tr>
  );
};
