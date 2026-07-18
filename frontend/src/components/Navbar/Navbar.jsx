import { useState, useEffect } from "react";
import {  Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setMenuOpen(false);
  }, [user]);

const handleSearch = (e) => {
  e.preventDefault();
  const query = search.trim();
if (!query) {
    navigate("/products")
    return
  } else {
    navigate(`/products?search=${encodeURIComponent(query)}`);
  }
};
  const linkClass = ({ isActive }) => "nav-item" + (isActive ? " active" : "");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C12 22 4 17.5 4 10.5C4 6 7.5 2 12 2C16.5 2 20 6 20 10.5C20 17.5 12 22 12 22Z"
                fill="currentColor"
              />
              <path
                d="M12 22V8"
                stroke="var(--surface)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="logo-text">NovaCart</span>
        </Link>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={linkClass}>
              Products
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/orders" className={linkClass}>
                Orders
              </NavLink>
            </li>
          )}
        </ul>
        <form onSubmit={handleSearch} className="search-bar">
          <svg
            className="search-icon"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M21 21L16.65 16.65"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <input 
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="nav-actions">
          {user ? (
            <>
              <Link
                to="/wishlist"
                className="icon-button"
                aria-label="Wishlist"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21s-7.2-4.6-10-9.1C0.3 8.6 1.6 4.9 5 3.8c2.1-0.7 4.2 0.1 5.5 1.9l1.5 2 1.5-2c1.3-1.8 3.4-2.6 5.5-1.9 3.4 1.1 4.7 4.8 3 8.1C19.2 16.4 12 21 12 21z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link to="/cart" className="icon-button" aria-label="Cart">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 8h12l-1 12H7L6 8z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 8V6a3 3 0 0 1 6 0v2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
                {user.cartCount > 0 && (
                  <span className="cart-badge">{user.cartCount}</span>
                )}
              </Link>
              <Link
                to="/profile"
                className="icon-button profile-button"
                aria-label="Profile"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="3.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
              <li className="Logout-new">
                <NavLink to="/" className={linkClass} onClick={logout}>
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="button outline-button">
                Login
              </Link>
              <Link to="/register" className="button primary-button">
                Register
              </Link>
            </div>
          )}

          <button
            className="menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 5L19 19M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className={`mobile-menu${menuOpen ? " mobile-menu-open" : ""}`}>
        <form  onSubmit={handleSearch} className="search-bar mobile-search">
          <input
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <ul className="mobile-links">
          <li>
            <NavLink
              to="/"
              className={linkClass}
              end
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Products
            </NavLink>
          </li>

          {user ? (
            <>
              <li>
                <NavLink
                  to="/cart"
                  className={linkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Cart
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/wishlist"
                  className={linkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Wishlist
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/orders"
                  className={linkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Orders
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/profile"
                  className={linkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={linkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={linkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/register"
                  className={linkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
