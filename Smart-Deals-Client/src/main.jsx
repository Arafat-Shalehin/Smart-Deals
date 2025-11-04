import { Children, Component, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./component/Home/Home";
import AllProducts from "./component/Products/AllProducts";
import AuthProvider from "./contexts/AuthProvider";
import Register from "./pages/Register";
import MyProducts from "./component/Products/MyProducts";
import CreateProducts from "./component/Products/CreateProducts";
import MyBids from "./component/Products/MyBids";
import Login from "./pages/Login";
import ProductDetails from "./component/Products/ProductDetails";
import Loader from "./component/Loader/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "allproducts",
        loader: () => fetch("http://localhost:3000/products"),
        Component: AllProducts,
        hydrateFallbackElement:<Loader />
      },
      {
        path: "/productDetails/:id",
        Component: ProductDetails,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        hydrateFallbackElement:<Loader />
      },
      {
        path: "myProducts",
        Component: MyProducts,
      },
      {
        path: "myBids",
        Component: MyBids,
      },
      {
        path: "createProducts",
        Component: CreateProducts,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router}/>
      </Suspense>
    </AuthProvider>
  </StrictMode>
);
