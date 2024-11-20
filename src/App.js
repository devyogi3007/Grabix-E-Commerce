import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Customer from "./Pages/client/Customer";
import Admin from "./Pages/admin/Admin";
import Login from "./Pages/admin/pages/login/Login";
import Signup from "./Pages/admin/pages/signup";
// import { useSelector } from "react-redux";
import * as React from "react";
import PrivateRoute from "./Routes/AdminPrivateRoute";
import AuthProvider from "./Pages/admin/context/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path="/*" element={<Customer />} />
          <Route path="/store/apply" element={<Signup />} />
          <Route path="/pannel" element={<Navigate to="/pannel/login" />} />

          <Route element={<PrivateRoute />}>
            {/* {isAdmin && <Route path="/pannel" element={<Navigate to="/pannel/dashboard" />} />} */}
            <Route path="/pannel" element={<Navigate to="/pannel/dashboard" />} />
            <Route path="/pannel/*" element={<Admin />} />
          </Route>
          <Route path="/pannel/login" element={<Login />} />
        </Routes>
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
