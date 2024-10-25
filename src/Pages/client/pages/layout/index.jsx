import React from "react";
import Sidebar from "./sidebar/Sidebar";

const AccountLayout = ({ children }) => {
  return (
    <div className="flex h-full">
      <div className="w-1/5 h-full sticky top-0">
        <Sidebar />
      </div>
      <div className="w-4/5 p-3 bg-gray-50">{children}</div>
    </div>
  );
};

export default AccountLayout;
