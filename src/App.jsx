import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout.jsx'
import { ProductListPage } from './pages/ProductListPage.jsx'
import { ProductDetailsPage } from './pages/ProductDetailsPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Route>
      <Route path="*" element={<div style={{ padding: '2rem' }}>Page not found.</div>} />
    </Routes>
  )
}

export default App
