import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import "./productform.css"

const ProductForm = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const isEdit = Boolean(productId);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    brand: "",
    category: "",
  });
  const getCategories = async () => {
  try {
    const response = await api.get("/categories");

    setCategories(response.data.data);
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};
const getProduct = async () => {
  try {
    setLoading(true);

    const response = await api.get(`/products/${productId}`);

    const product = response.data.data;

    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      discount: product.discount,
      stock: product.stock,
      brand: product.brand,
      category: product.category._id,
    });
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  getCategories();
   if (isEdit) {
    getProduct();
  }
}, [productId]);
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    images.forEach((image) => {
      data.append("images", image);
    });

    if (isEdit) {
      await api.patch(`/products/${productId}`, data);

      toast.success("Product updated successfully");
    } else {
      await api.post("/products", data);

      toast.success("Product added successfully");
    }

    navigate("/admin/products");
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
  if (loading) return <Loader />;
  return (
    <div className="product-form-container">
      <h1 className="form-title">{isEdit ? "Edit Product" : "Add Product"}</h1>

      <form className="product-form" onSubmit={handleSubmit}>
        <input
          className="form-input-title"
          type="text"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          className="form-textarea-description"
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          className="form-input-price"
          type="number"
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          className="form-input-discount"
          type="number"
          placeholder="Discount"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
        />

        <input
          className="form-input-stock"
          type="number"
          placeholder="Stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <input
          className="form-input-brand"
          type="text"
          placeholder="Brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
        />

        <select
          className="form-select-category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          className="form-input-images"
          type="file"
          multiple
          onChange={handleImageChange}
        />

        <button
  className="form-submit-btn"
  type="submit"
  disabled={loading}
>
  {loading
    ? "Please wait..."
    : isEdit
    ? "Update Product"
    : "Add Product"}
</button>
      </form>
    </div>
  );
};

export default ProductForm;