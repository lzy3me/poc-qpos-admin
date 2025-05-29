import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import DashboardPage from './page/Dashboard.jsx'
import ManagerPage from './page/Manager.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path='manage' element={<ManagerPage />}>
        <Route path='data'>
          <Route path='menus' element={<ManagerPage />} />
          <Route path='categories' element={<ManagerPage />} />
        </Route>
        <Route path='users' element={<ManagerPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
