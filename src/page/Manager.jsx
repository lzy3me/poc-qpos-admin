import './App.css';
import CategoryManager from "../components/CategoryManager";
import MenuManager from "../components/MenuManager";

export default function ManagerPage() {
  return (
    <div>
      <h1>Management System</h1>
      <CategoryManager />
      <hr />
      <MenuManager />
    </div>
  )
}