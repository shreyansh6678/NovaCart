import { Link } from "react-router-dom"
import "./css/home.css"

const categories = [
  { id: "electronics", label: "Electronics", icon: "📱" },
  { id: "fashion", label: "Fashion", icon: "👕" },
  { id: "shoes", label: "Shoes", icon: "👟" },
  { id: "watches", label: "Watches", icon: "⌚" },
  { id: "bags", label: "Bags", icon: "👜" },
  { id: "furniture", label: "Furniture", icon: "🪑" },
  { id: "beauty", label: "Beauty", icon: "💄" },
  { id: "gaming", label: "Gaming", icon: "🎮" },
]

const featuredProducts = [
  { id: 1, title: "Wireless Earbuds", price: 999, rating: 5, icon: "🎧" },
  { id: 2, title: "Everyday Backpack", price: 799, rating: 4, icon: "🎒" },
  { id: 3, title: "Cotton T-Shirt", price: 499, rating: 5, icon: "👕" },
  { id: 4, title: "Smart Watch", price: 999, rating: 5, icon: "⌚" },
]

const bestSellers = [
  { id: 1, title: "Running Shoes", price: 1499, rating: 5, icon: "👟" },
  { id: 2, title: "Sunglasses", price: 599, rating: 4, icon: "🕶️" },
  { id: 3, title: "Desk Lamp", price: 899, rating: 4, icon: "💡" },
  { id: 4, title: "Leather Wallet", price: 699, rating: 5, icon: "👛" },
  { id: 5, title: "Bluetooth Speaker", price: 1299, rating: 5, icon: "🔊" },
]

const reviews = [
  { id: 1, name: "Aditi R.", rating: 5, text: "Amazing quality, exactly as pictured. Will shop here again." },
  { id: 2, name: "Rohan K.", rating: 5, text: "Fast delivery and great packaging. Very happy with my order." },
  { id: 3, name: "Meera S.", rating: 4, text: "Good value for money. Customer support was quick to help." },
]

function Stars({ count }) {
  return (
    <span className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "star star--filled" : "star"}>
          ★
        </span>
      ))}
    </span>
  )
}

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-card__image">
        <span aria-hidden="true">{product.icon}</span>
      </div>
      <h3 className="product-card__title">{product.title}</h3>
      <p className="product-card__price">₹{product.price}</p>
      <Stars count={product.rating} />
      <button type="button" className="btn btn--solid product-card__cta">
        Add to Cart
      </button>
    </div>
  )
}

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero__content">
          <span className="badge">New Collection</span>
          <h1 className="hero__title">
            Shop Smarter,
            <br />
            Live Better.
          </h1>
          <p className="hero__subtitle">
            Discover premium products at amazing prices with fast delivery, right to your door.
          </p>
          <div className="hero__actions">
            <Link to="/products" className="btn btn--solid">
              Shop Now
            </Link>
            <Link to="/products" className="btn btn--ghost">
              Explore
            </Link>
          </div>
        </div>

        <div className="hero__art" aria-hidden="true">
          <svg viewBox="0 0 320 320" className="hero__svg">
            <circle cx="160" cy="160" r="140" fill="var(--secondary)" opacity="0.12" />
            <rect x="90" y="110" width="140" height="150" rx="18" fill="var(--primary)" />
            <path
              d="M120 110V90a40 40 0 0 1 80 0v20"
              stroke="var(--primary-dark)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <path d="M100 150h120" stroke="var(--surface)" strokeWidth="4" opacity="0.5" />
            <path d="M100 190h120" stroke="var(--surface)" strokeWidth="4" opacity="0.3" />
          </svg>
          <div className="hero__chip hero__chip--top">🚚 Free delivery</div>
          <div className="hero__chip hero__chip--bottom">⭐ 4.8 avg rating</div>
        </div>
      </section>
      <section className="section">
        <h2 className="section__title">Shop by Category</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link to={`/products?category=${cat.id}`} key={cat.id} className="category-card">
              <span className="category-card__icon" aria-hidden="true">
                {cat.icon}
              </span>
              <span className="category-card__label">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section__header">
          <h2 className="section__title">Featured Products</h2>
          <Link to="/products" className="section__link">
            View all
          </Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="section section--tinted">
        <h2 className="section__title">Why Choose NovaCart</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-card__icon" aria-hidden="true">
              🚚
            </span>
            <h3>Fast Delivery</h3>
            <p>Get your orders in as little as 2 days.</p>
          </div>
          <div className="feature-card">
            <span className="feature-card__icon" aria-hidden="true">
              🔒
            </span>
            <h3>Secure Payment</h3>
            <p>Your transactions are encrypted and safe.</p>
          </div>
          <div className="feature-card">
            <span className="feature-card__icon" aria-hidden="true">
              🔄
            </span>
            <h3>Easy Returns</h3>
            <p>Change of mind? Return within 7 days.</p>
          </div>
          <div className="feature-card">
            <span className="feature-card__icon" aria-hidden="true">
              🎧
            </span>
            <h3>24/7 Support</h3>
            <p>Our team is here whenever you need us.</p>
          </div>
        </div>
      </section>
      <section className="deal-banner">
        <div className="deal-banner__content">
          <p className="deal-banner__eyebrow">Today's Deals</p>
          <h2 className="deal-banner__title">Up to 50% OFF</h2>
          <p className="deal-banner__subtitle">On selected items, while stocks last.</p>
          <Link to="/products" className="btn btn--accent">
            Shop Now
          </Link>
        </div>
      </section>
      <section className="section">
        <h2 className="section__title">Best Selling Products</h2>
        <div className="product-scroll">
          {bestSellers.map((p) => (
            <div className="product-scroll__item" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
      <section className="section section--tinted">
        <h2 className="section__title">Customer Reviews</h2>
        <div className="review-grid">
          {reviews.map((r) => (
            <div className="review-card" key={r.id}>
              <Stars count={r.rating} />
              <p className="review-card__text">"{r.text}"</p>
              <p className="review-card__name">{r.name}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="newsletter">
        <h2 className="newsletter__title">Stay Updated</h2>
        <p className="newsletter__subtitle">Get the latest deals and drops straight to your inbox.</p>
        <form
          className="newsletter__form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input type="email" placeholder="Enter your email" aria-label="Email address" required />
          <button type="submit" className="btn btn--solid">
            Subscribe
          </button>
        </form>
      </section>
    </main>
  )
}

export default Home