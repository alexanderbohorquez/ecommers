import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import ProductDetails from './pages/ProductDetail'
import AppNav from './components/AppNav'
import Container from 'react-bootstrap/Container'
import Loader from './components/Loader'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <>
      <HashRouter>
        <AppNav />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/products/:id' element={<ProductDetails />} />

            <Route element={<ProtectedRoutes />}>
              <Route path='/purchases' element={<Purchases />} />
            </Route>

          </Routes>
        </Container>
        {isLoading && <Loader />}
      </HashRouter>
    </>
  )
}

export default App
