import { useState, useEffect } from "react";
import api from "../api";

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  const fetchCategories = async () => {
    const res = await api.get("/admin/categories");
    setCategories(res.data);
  };

  const addCategory = async () => {
    await api.post("/admin/categories", newCategory);
    setNewCategory({ name: "" });
    fetchCategories();
  }

  const deleteCategory = async (id) => {
    await api.delete(`/admin/categories/${id}`);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Category Manager</h2>
      <input placeholder="Name" value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} />
      <button onClick={addCategory}>Add Category</button>

      <ul>
        {categories.map(category => (
          <li key={category._id}>
            {category.name}
            <button onClick={() => deleteCategory(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryManager;