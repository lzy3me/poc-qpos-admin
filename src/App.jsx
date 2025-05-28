import './App.css'
import CategoryManager from './components/CategoryManager'
import MenuManager from './components/MenuManager'

function App() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <CategoryManager />
      <hr />
      <MenuManager />
    </div>
  )
}

export default App
