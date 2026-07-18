import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "./sidebar.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;