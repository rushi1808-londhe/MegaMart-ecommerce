import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './component/Home';
import Cart from './component/Cart';
import SingleProduct from './component/SingleProduct';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import { SearchProvider } from './context/SearchContext';
import { FilterProvider } from './context/FilterContext.js';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/product/:id",
        element: <SingleProduct />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <SearchProvider>
        <FilterProvider>
            <RouterProvider router={router} />
        </FilterProvider>
      </SearchProvider>
    </CartProvider>
  </React.StrictMode>
);