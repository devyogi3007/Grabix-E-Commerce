import AdminRoutes from "../../Routes/AdminRoutes";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./Admin.scss";
import { useDispatch } from "react-redux";
import React from "react";
import { adminLogin } from "../../Redux/AdminAuth/adminAuth.actions";
// import { Outlet } from "react-router-dom";

function Admin() {
  const [sidebarOpen, setSidebarOpen] = React.useState(
    JSON.parse(sessionStorage.getItem("sidebar"))
  );
  return (
    <div className="flex">
      <div className="">{sidebarOpen && <Sidebar />}</div>
      <div className="w-full">
        <Navbar
          setOpen={(state) => {
            setSidebarOpen(state);
            sessionStorage.setItem("sidebar", JSON.stringify(state));
          }}
          open={sidebarOpen}
        />
        <div className="bg-[#ece8ff] p-4 h-[calc(100vh_-_3.2rem)] overflow-y-scroll">
          <div className="w-full bg-white rounded-xl p-3 shadow-lg">
            <AdminRoutes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
