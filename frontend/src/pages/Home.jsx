import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import OIP from "../assets/OIP.jpg"
import beauty from "../assets/beauty.webp"
import furniture from "../assets/furniture.jpg"
import homeandkitchen from "../assets/homeandkitchen.jpg"
import gaming from "../assets/jem-compact-gaming.png"
import menfashion from "../assets/men'sfashion.webp"
import shoes from "../assets/shoes.webp"
import watch from "../assets/watch.jpg"
import womenfashion from "../assets/women'sfashion.jpeg"
import sportsandfitness from "../assets/sports.png"
import books from "../assets/books.webp"
import bags from "../assets/bags.webp"
import {api} from "../api/axios.js"
import home from "../assets/home.jpg"

import "./css/home.css"




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
    <Link to={`/products/${product._id}`} className="product-card">
      <div className="product-card__image">
        <img
          src={product.images?.[0]?.url}
          alt={product.title}
          className="product-card__img"
        />
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__price">₹{product.price}</p>
        <Stars count={5} />
        <button className="btn btn--solid product-card__cta">
          Add to Cart
        </button>
      </div>
    </Link>
  )
}

function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [premiumProducts, setPremiumProducts] = useState([]);
  const [categories, setCategories] = useState([]);
useEffect(() => {
  getFeaturedProducts();
  getPremiumProducts();
  getCategories()
}, []);
const getCategories = async () => {
  try {
    const response = await api.get("/categories");

    const imageMap = {
      electronics: OIP,
      fashion: menfashion,
      shoes: shoes,
      watches: watch,
      "home & kitchen": homeandkitchen,
      furniture: furniture,
      beauty: beauty,
      gaming: gaming,
      "women's fashion": womenfashion,
      "sports & fitness": sportsandfitness,
      books: books,
      bags: bags,
    };

    const data = response.data.data.map((cat) => {
  return {
    ...cat,
    path: imageMap[cat.name.toLowerCase()],
  };
});

    setCategories(data);
  } catch (error) {
    console.log(error);
  }
};
const getFeaturedProducts = async () => {
  try {
    const response = await api.get("/products?limit=5");
    setFeaturedProducts(response.data.data.products);
  } catch (error) {
    console.log(error);
  }
};
const getPremiumProducts = async () => {
  try {
    const response = await api.get("/products/premium");
    setPremiumProducts(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

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

        <div className="hero__art">
  <img
    src={home}
    alt="Shopping Illustration"
    className="hero__image"
  />

  <div className="hero__chip hero__chip--top">
    🚚 Free delivery
  </div>

  <div className="hero__chip hero__chip--bottom">
    ⭐ 4.8 avg rating
  </div>
</div>
      </section>
      <section className="section">
        <h2 className="section__title">Shop By Category</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link to={`/products?category=${cat._id}`} key={cat._id} className="category-card">
              <img src={cat.path} alt={cat.name} className="category-card__icon" aria-hidden="true">
              </img>
              <span className="category-card__label">{cat.name}</span>
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
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
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
  <div className="section__header">
    <h2 className="section__title">Premium Picks</h2>

    <Link to="/products" className="section__link">
      View all
    </Link>
  </div>

  <div className="product-grid">
    {premiumProducts.map((product) => (
      <ProductCard
        key={product._id}
        product={product}
      />
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