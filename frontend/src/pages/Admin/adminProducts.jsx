import {useState,useEffect} from "react";
import Loader from "../../components/Loader/Loader.jsx";
import toast from "react-hot-toast";
import { api } from "../../api/axios.js";
import { useNavigate } from "react-router-dom";

import "./adminProduct.css"

const Products = () => {
    const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const getProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/products", {
        params: {
          page,
          limit: 10,
        },
      });
      console.log(response.data)
      setProducts(response.data.data.products);
      setPagination(response.data.data.pagination);
    } catch (error) {
        toast.error(error.response?.data?.message);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    getProducts();
}, [page]);

  if (loading) return <Loader />;
  const deleteProduct = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);

      toast.success("Product deleted");

      getProducts();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <div className="products-container">
         <div className="admin-products-header">
      <h2>Products</h2>

      <button
        className="add-product-btn"
        onClick={() => navigate("/admin/products/new")}
      >
        + Add Product
      </button>
    </div>
      <table className="admin-table">
  <thead>
    <tr>
      <th>Image</th>
      <th>Product</th>
      <th>Price</th>
      <th>Stock</th>
      <th>Category</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {products.map((product) => (
      <tr key={product._id} className="product-row">
        <td className="product-image-cell">
          <img className="product-image" src={product.images[0]?.url} alt={product.title} />
        </td>

        <td className="product-title-cell">{product.title}</td>

        <td className="product-price-cell">₹{product.price.toLocaleString()}</td>

        <td className="product-stock-cell">{product.stock}</td>

        <td className="product-category-cell">{product.category.name}</td>

        <td className="product-actions-cell">
          <button className="edit-btn" onClick={() => navigate(`/admin/products/${product._id}/edit`)}>Edit</button>
          <button className="delete-btn" onClick={()=>{
deleteProduct(product._id)
}} >Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span className="pagination-info">
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