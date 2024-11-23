import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../../../Redux/AdminAuth/adminAuth.actions";

const Logout = () => {
  const [status, setStatus] = React.useState("Loging Out...");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  // signOut(auth).then(
  //   function () {
  //     console.log("Signed Out");
  //     dispatch(adminLogin({}));
  //     navigate("/panel/login");
  //     setStatus("Success");
  //   },
  //   function (error) {
  //     console.error("Sign Out Error", error);
  //     setStatus("Logout failed");
  //   }
  // );
  return status;
};

export default Logout;
