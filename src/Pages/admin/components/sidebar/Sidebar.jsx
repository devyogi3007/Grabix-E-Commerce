import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

// import InsertChartIcon from "@mui/icons-material/InsertChart";
// import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  Link,
  NavLink
  // useLocation
} from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { sidebarList } from "./sidebarData";

import CategoryIcon from "@mui/icons-material/Category";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  // eslint-disable-next-line no-unused-vars
  // const { dispatch } = useContext(DarkModeContext);
  // const location = useLocation();

  const getSidebarIcon = (item) => {
    // const isActive = location.pathname.indexOf(encodeURI(item.route)) !== -1;
    switch (item.icon) {
      case "dashboard":
        return <DashboardIcon className="icon" />;
      case "users":
        return <StoreIcon className="icon" />;
      case "products":
        return <AccountBalanceWalletOutlinedIcon className="icon" />;
      case "orders":
        return <ShoppingCartOutlinedIcon className="icon" />;
      case "banners":
        return <LocalShippingIcon className="icon" />;
      case "profile":
        return <AccountCircleOutlinedIcon className="icon" />;
      case "logout":
        return <ExitToAppIcon className="icon" />;
      case "category":
        return <CategoryIcon className="icon" />;
      case "attributes":
        return <AccountTreeIcon className="icon" />;
      case "units":
        return <DesignServicesIcon className="icon" />;
      case "customers":
        return <PersonOutlinedIcon className="icon" />;
      default:
        return <></>;
    }
  };

  const auth = useAuth();

  const currentUser = auth.token || {};

  return (
    <div className="sidebar min-w-[200px]">
      <div className="top">
        <Link to="/pannel" style={{ textDecoration: "none" }}>
          <span className="logo">GRABIX</span>
          {/* <img src="../../assets/logo.png" /> */}
        </Link>
      </div>
      {/* <hr /> */}
      <div className="center">
        <ul className="h-[calc(100vh_-_7rem)] overflow-y-auto">
          {sidebarList
            .filter((item) => {
              return item.roles.includes(currentUser?.role?.id);
            })
            .map((item) => {
              if (item.onclick) {
                return (
                  <button
                    className="link m-0 p-0 w-full"
                    onClick={() => item.onclick === "logout" && auth.logOut()}
                    style={{ textDecoration: "none" }}
                  >
                    <li className="my-2 px-3 py-2">
                      {getSidebarIcon(item)}
                      <span>{item.moduleName}</span>
                    </li>
                  </button>
                );
              }
              return (
                <>
                  {item.heading && (
                    <p className="text-xs px-0 mx-0 w-full pt-5 pb-3 text-center border-b text-white font-semibold">
                      {item.heading}
                    </p>
                  )}
                  <NavLink
                    className="link m-0 p-0"
                    to={item.route}
                    style={{ textDecoration: "none" }}
                  >
                    <li className="my-2 px-3 py-2">
                      {getSidebarIcon(item)}
                      <span>{item.moduleName}</span>
                    </li>
                  </NavLink>
                </>
              );
            })}
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
