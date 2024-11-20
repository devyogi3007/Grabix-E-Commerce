import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../Pages/client/components/PrivateRoute";
import AllProducts from "../Pages/client/pages/AllProducts";
import Cart from "../Pages/client/pages/Cart";
import Home from "../Pages/client/pages/Home";
import Login from "../Pages/client/pages/Login";
import SignUp from "../Pages/client/pages/SignUp";
import SingleProduct from "../Pages/client/pages/SingleProduct";
import UserAccount from "../Pages/client/pages/UserAccount";
import Payment from "../Pages/client/pages/Payment";
import PaymentSuccess from "../Pages/client/pages/PaymentSuccess";
import Orders from "../Pages/client/pages/Orders";
import PaymentForm from "../Pages/client/pages/PaymentForm";
import Address from "../Pages/client/pages/Address";

function CustomerRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allproducts/:products" element={<AllProducts />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/addresses"
          element={
            <PrivateRoute>
              <Address />
            </PrivateRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/allproducts/:products/:id" element={<SingleProduct />} />
        <Route
          path="/account/"
          element={
            <PrivateRoute>
              <UserAccount />
            </PrivateRoute>
          }
        />
        <Route path="/payment" element={<Cart payment={true} />} />
        <Route path="/payment-demo" element={<PaymentSuccess />} />
        <Route path="/payment-form" element={<PaymentForm />} />
      </Routes>
    </>
  );
}

export default CustomerRoutes;
