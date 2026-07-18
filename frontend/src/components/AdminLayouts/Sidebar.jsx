import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <h2>NovaCart</h2>

      <NavLink to="/admin">
        Dashboard
      </NavLink>

      <NavLink to="/admin/products">
        Products
      </NavLink>

      <NavLink to="/admin/categories">
        Categories
      </NavLink>

      <NavLink to="/admin/orders">
        Orders
      </NavLink>

      <NavLink to="/admin/users">
        Users
      </NavLink>

    </aside>
  );
};

export default Sidebar;