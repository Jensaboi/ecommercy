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
import Checkout, { loader as checkOutLoader } from "./pages/Checkout.jsx";
import Login, { action as loginAction } from "./pages/Login.jsx";
import Register, { action as registerAction } from "./pages/Register.jsx";
import DefaultLayout from "./layouts/Defaultlayout.jsx";
import Dashboard, { loader as dashBoardLoader } from "./pages/Dashboard.jsx";

const router = createBrowserRouter([
  {
    id: "root",
    element: <App />,
    loader: rootLoader,
    hydrateFallbackElement: (
      <div className="w-full h-full flex flex-col justify-center items-center">
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
          { path: "/login", element: <Login />, action: loginAction },
          { path: "/Register", element: <Register />, action: registerAction },
          { path: "/Checkout", element: <Checkout />, loader: checkOutLoader },
          {
            path: "/dashboard",
            element: <Dashboard />,
            loader: dashBoardLoader,
          },
          {
            path: "/products/:id",
            element: <ProductDetails />,
            loader: productDetailsLoader,
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
