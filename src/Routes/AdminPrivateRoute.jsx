import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Pages/admin/context/AuthContext";

const PrivateRoute = () => {
  const user = useAuth();
  //   console.log(user.token);
  if (!user.token?.id) return <Navigate to="/panel/login" />;
  return <Outlet />;
};

export default PrivateRoute;
