import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import GuestRoute from './components/GuestRoute/GuestRoute'
import UserProvider from './components/Context/User.context'
import CartProvider from './components/Context/Cart.context'
import Cart from './pages/Cart/Cart'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Checkout from './pages/Checkout/Checkout'
import Orders from './pages/Orders/Orders'
import Wishlist from './pages/Wishlist/Wishlist'
import WishlistProvider from './components/Context/Wishlist.context'
import Brands from './pages/Brands/Brands'
import Categories from './pages/Categories/Categories'
import Products from './pages/Products/Products'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword'
import Resetpassword from './pages/Resetpassword/Resetpassword'
import Offline from './components/Offline/Offline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
function App() {

  const routes = createBrowserRouter([{
    path: "/",
    element:
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>,
    children: [
      { index: true, element: <Home /> },
      { path: 'cart', element: <Cart /> },
      { path: 'product/:id', element: <ProductDetails /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'allorders', element: <Orders /> },
      { path: 'wishlist', element: <Wishlist /> },
      { path: 'brands', element: <Brands /> },
      { path: 'categories', element: <Categories /> },
      { path: 'products', element: <Products /> },


    ]
  },

  {
    path: "/",
    element:
      <GuestRoute>
        <Layout />
      </GuestRoute>,
    children: [
      { path: '/signup', element: <SignUp /> },
      { path: '/login', element: <Login /> },
      { path: '/forgetpassword', element: <ForgetPassword /> },
      { path: '/Resetpassword', element: <Resetpassword /> },
    ]
  }

  ])
  const myClint = new QueryClient()
  return <>
    <QueryClientProvider client={myClint}>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={routes}></RouterProvider>
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

    <Offline>
      <div className="bg-gray-300 rounded-lg p-4 shadow right-8 bottom-8 fixed z-40">
        <h2><i className="fa-solid fa-wifi mr-2"></i>Check Your Connection</h2>
      </div>
    </Offline>
  </>
}

export default App
