import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "../../api/axios.js";
import Loader from "../../components/Loader/Loader";
import "./adminCategories.css";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [description, setDescription] = useState("");
  const getCategories = async () => {
    try {
      setLoading(true);

      const response = await api.get("/categories");
      console.log(response.data);
      setCategories(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  const handleSubmit = async () => {
    if (!name.trim()) {
      return toast.error("Category name is required");
    }

    try {
      if (isEditing) {
        await api.patch(`/categories/${categoryId}`, {
          name,
        });

        toast.success("Category updated");
      } else {
        await api.post("/categories", {
          name,
          description,
        });

        toast.success("Category added");
      }

      setName("");
      setDescription("")
      setIsEditing(false);
      setCategoryId(null);

      getCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  const deleteCategory = async (categoryId) => {
    try {
      await api.delete(`/categories/${categoryId}`);

      toast.success("Category deleted");

      getCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="admin-category-container">
      <div className="admin-products-header">
        <h2>Categories</h2>

        <input
          className="category-name-input"
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
  className="category-description-input"
  placeholder="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>
        <button onClick={handleSubmit} className="add-category-btn">+ Add Category</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr className="empty-row">
              <td className="empty-state" colSpan="2">
                No categories found.
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr key={category._id} className="category-row">
                <td className="category-name-cell">{category.name}</td>
                <td className="category-actions-cell">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setIsEditing(true);
                      setCategoryId(category._id);
                      setName(category.name);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCategory(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategories;