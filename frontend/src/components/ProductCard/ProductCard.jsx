import "./productCard.css"
import { Link } from "react-router-dom"

const ProductCard = ({product}) => {
  return (
    <Link to={`/products/${product._id}`} className="Product-card">
      <div className="product-card-image">
        <img src={product.images?.[0]?.url} alt={product.title} />
      </div>
      <div className="product-card-content">
        <h3>{product.title}</h3>

        <p className="price">
          ₹{product.price}
        </p>

        <button>Add to Cart</button>
      </div>
    </Link>
  )
}

export default ProductCard
