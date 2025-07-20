import { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Receipt from './pages/Receipt.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="product/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="receipt" element={<Receipt />} />
    </Route>
  )
);
const App = () => {
  return (
    <><RouterProvider router={router} /></>
  );
};

export default App

