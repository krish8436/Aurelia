import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals'; 

import Announcement_bar from './components/Announcement_bar';
import Header from './components/Header';
import Hero from './components/Hero';
import Supports from './components/Supports';
import About_index from './About_index';
import Section_heading from './components/Section_heading';
import { CartProvider } from './components/Cart';
import Whybest from './components/Whybest';
import Bestsellers from './components/Bestseller';
import Quick_contact from './components/Quick_contact';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Shop from './components/Shop';
import Product_details from './components/Product_details';
import Cartpage from './components/Cartpage';
import Checkout from './components/Checkout';
import ThankYou from './components/Thankyou';
import { WishlistProvider } from "./components/Wishlist"
import Wishlistpage from './components/Wishlistpage';
import About from './components/About';
import Team from './components/Team';
import Contact from './components/Contact';

import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom';

const Layout = () => {
  
  return (
    <div>
      <Announcement_bar />
      <Header />
      <Outlet /> 
      <Footer/>
    </div>
  );
};


const Appbody = () => {
  return (
    <>
      <Hero />
      <Supports />
      <About_index />
      <Section_heading />
      <Whybest />
      <Bestsellers />
      <Quick_contact />
      <Testimonials />
    </>
  );
};


const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Appbody /> },
      { path: "shop", element: <Shop /> },
      { path: "product/:proID", element: <Product_details /> },
      { path: "cart", element: <Cartpage /> },
      { path: "wishlist", element: <Wishlistpage /> },
      { path: "checkout", element: <Checkout /> },
      { path: "thankyou", element: <ThankYou /> },
      { path: "about", element: <About /> },
      { path: "team", element: <Team /> },
      { path: "contact", element: <Contact /> }
    ]
  }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WishlistProvider>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
    </WishlistProvider>
  </React.StrictMode>
);

reportWebVitals();
