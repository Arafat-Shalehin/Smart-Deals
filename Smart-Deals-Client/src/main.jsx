import { Children, Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layouts/RootLayout';
import Home from './component/Home/Home';
import AllProducts from './component/Products/AllProducts';
import AuthProvider from './contexts/AuthProvider';
import Register from './pages/Register';
import MyProducts from './component/Products/MyProducts';
import CreateProducts from './component/Products/CreateProducts';
import MyBids from './component/Products/MyBids';
import Login from './pages/Login';
import ProductDetails from './component/Products/ProductDetails';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'allproducts',
        Component: AllProducts
      },
      {
        path: 'myProducts',
        Component: MyProducts
      },
      {
        path: 'myBids',
        Component: MyBids
      },
      {
        path: 'createProducts',
        Component: CreateProducts
      },
      {
        path: 'productDetails',
        Component: ProductDetails
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)