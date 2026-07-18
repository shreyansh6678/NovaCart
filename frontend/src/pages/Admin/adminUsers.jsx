import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import "./adminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users/all");
      setUsers(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="admin-users">
      <h2 className="admin-users-heading">Users</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr className="admin-user-row" key={user._id}>
              <td className="admin-user-name">{user.fullName}</td>

              <td className="admin-user-email">{user.email}</td>

              <td className="admin-user-role">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;