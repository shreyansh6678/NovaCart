import { Link } from "react-router-dom"
import "./footer.css"

function Footer() {
  return (
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__wordmark">NovaCart</span>
            <p>Everyday essentials, delivered fast and priced fair.</p>
          </div>

          <div className="footer__col">
            <h4>Shop</h4>
            <Link to="/products">All Products</Link>
            <Link to="/products">New Arrivals</Link>
            <Link to="/products">Best Sellers</Link>
          </div>

          <div className="footer__col">
            <h4>Support</h4>
            <Link to="/">Help Center</Link>
            <Link to="/">Shipping Info</Link>
            <Link to="/">Returns</Link>
          </div>

          <div className="footer__col">
            <h4>Company</h4>
            <Link to="/">About Us</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Contact</Link>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} NovaCart. All rights reserved.</p>
        </div>
      </footer>
  )
}

export default Footer
