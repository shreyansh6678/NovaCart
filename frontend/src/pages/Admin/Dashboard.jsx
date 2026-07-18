import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDashboardStats = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/dashboard");

      setStats(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Users</h3>
          <h2>{stats.totalUsers}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Products</h3>
          <h2>{stats.totalProducts}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Categories</h3>
          <h2>{stats.totalCategories}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <h2>{stats.totalOrders}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <h2>₹{stats.totalRevenue.toLocaleString()}</h2>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;