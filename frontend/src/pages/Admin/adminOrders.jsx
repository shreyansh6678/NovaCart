import { useEffect, useState } from "react";
import { api } from "../../api/axios.js";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";


const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      setLoading(true);

      const response = await api.get("/orders/all");

      setOrders(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="admin-orders">
      <h2>Orders</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.user.fullName}</td>

              <td>₹{order.totalAmount}</td>

              <td>{order.orderStatus}</td>

              <td>{new Date(order.createdAt).toLocaleDateString()}</td>

              <td>
                <button onClick={() => navigate(`/admin/orders/${order._id}`)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
