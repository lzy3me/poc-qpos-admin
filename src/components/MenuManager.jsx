import { useEffect, useState } from "react";
import api from "../api";

function MenuManager() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
  });

  const fetchMenus = async () => {
    const res = await api.get("/menu");
    setMenus(res.data);
  };

  const fetchCategories = async () => {
    const res = await api.get("/admin/categories");
    setCategories(res.data);
  }

  const addItem = async () => {
    await api.post("/admin/menus", newItem);
    setNewItem({
      name: "",
      price: 0,
      description: "",
      category: "",
    });
    fetchMenus();
  };

  const deleteItem = async (id) => {
    await api.delete(`/admin/menus/${id}`);
    fetchMenus();
  };

  const toggleAvailability = async (id) => {
    await api.patch(`/admin/menus/${id}/activate`);
    fetchMenus();
  };

  useEffect(() => {
    fetchMenus();
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Menu Manager</h2>
      <input placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
      <input placeholder="Price" type="number" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: parseFloat(e.target.value) })} />
      <input placeholder="Description" value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} />
      <select placeholder="Category" onChange={e => setNewItem({ ...newItem, category: e.target.value })}>
        {categories.map(category => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>
      <button onClick={addItem}>Add Item</button>

      <ul>
        {menus.map(item => (
          <li key={item._id}>
            {item.name} - ฿{item.price} - [{item.category.name}] - {item.isActive ? 'Available' : 'Sold Out'}&nbsp;
            <button onClick={() => toggleAvailability(item._id)}>Toggle</button>
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuManager;