import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App, { loader as rootLoader } from "./App.jsx";
import Home from "./pages/Home.jsx";
import Products, { loader as productsLoader } from "./pages/Products.jsx";
import ProductDetails, {
  loader as productDetailsLoader,
} from "./pages/ProductDetails.jsx";
import Checkout, { loader as checkoutLoader } from "./pages/Checkout.jsx";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/Login.jsx";
import Register, { action as registerAction } from "./pages/Register.jsx";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import Dashboard, { loader as dashBoardLoader } from "./pages/Dashboard.jsx";
import Wishlist, { loader as wishlistLoader } from "./pages/Wishlist.jsx";
import Auth from "./pages/Auth.jsx";
import Orders, { loader as ordersLoader } from "./pages/Orders.jsx";
import Cart, {
  loader as cartLoader,
  action as cartAction,
} from "./pages/Cart.jsx";

const router = createBrowserRouter([
  {
    id: "root",
    element: <App />,
    loader: rootLoader,
    hydrateFallbackElement: (
      <div className="w-full min-h-screen h-full flex flex-col justify-center items-center">
        <h1>Loading app...</h1>
      </div>
    ),
    children: [
      {
        element: <DefaultLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "/products", element: <Products />, loader: productsLoader },
          {
            path: "/products/category/:category",
            element: <Products />,
            loader: productsLoader,
          },
          {
            path: "/login",
            element: <Login />,
            action: loginAction,
            loader: loginLoader,
          },
          { path: "/Register", element: <Register />, action: registerAction },
          { path: "/checkout", element: <Checkout />, loader: checkoutLoader },
          {
            path: "/products/:id",
            element: <ProductDetails />,
            loader: productDetailsLoader,
          },
          {
            path: "/cart",
            element: <Cart />,
            loader: cartLoader,
            action: cartAction,
          },
          {
            element: <Auth />,
            children: [
              {
                path: "/dashboard",
                element: <Dashboard />,
                loader: dashBoardLoader,
              },
              { path: "/orders", element: <Orders />, loader: ordersLoader },
              {
                path: "/wishlist",
                element: <Wishlist />,
                loader: wishlistLoader,
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
