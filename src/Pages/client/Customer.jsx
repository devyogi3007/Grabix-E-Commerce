import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import CustomerRoutes from "../../Routes/CustomerRoutes";
import { ToastContainer } from "react-toastify";

function Customer() {
  return (
    <div className="relative">
      <Navbar />
      <CustomerRoutes />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Customer;
