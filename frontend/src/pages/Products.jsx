import ProductCard from "../components/ProductCard/ProductCard.jsx";
import { api } from "../api/axios.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader/Loader.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./css/products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const getProducts = async () => {
    try {
      console.log("selectedCategory:", selectedCategory);
console.log("category from URL:", category);
      setLoading(true);
      const response = await api.get("/products", {
        params: {
          search,
          category,
          sort,
          page,
          limit: 12,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
        },
      });
      setProducts(response.data.data.products);
      setPagination(response.data.data.pagination);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const getCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const category = searchParams.get("category") || "";

  useEffect(() => {
    setSelectedCategory(category);
    setPage(1)
  }, [category]);
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
    getProducts();
  }, 500);

  return () => clearTimeout(timer);
  }, [search, category, sort, page, priceRange]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="products-container">
      <div className="products-filters">
        <select
          value={selectedCategory}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedCategory(e.target.value);
            setPage(1);

            const params = new URLSearchParams(searchParams);

            if (value) {
              params.set("category", value);
            } else {
              params.delete("category");
            }

            navigate(`/products?${params.toString()}`);
          }}
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Default</option>
          <option value="latest">Latest</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
        <div className="price-filter">
          <p>
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </p>

          <Slider
            range
            min={0}
            max={100000}
            value={priceRange}
            onChange={(value) => setPriceRange(value)}
            onAfterChange={(value) => {
              setPriceRange(value);
              setPage(1);
            }}
          />
        </div>
        <button
          onClick={() => {
            setSelectedCategory("");
            setSort("");
            setPriceRange([0, 100000]);
            setPage(1);
            navigate("/products");
          }}
        >
          Clear Filters
        </button>
      </div>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="products-empty">
            <h2>No Products Found</h2>
            <p>Try checking back later or browse another category.</p>
          </div>
        )}
      </div>
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span>
          Page {pagination?.page} of {pagination?.totalPages}
        </span>

        <button
          disabled={page === pagination?.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
