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
  NavLink,
  useNavigate
  // useLocation
} from "react-router-dom";
import { useContext } from "react";
import { sidebarList } from "./sidebarData";

import CategoryIcon from "@mui/icons-material/Category";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../../../Redux/UserAuth/userAuth.actions";
import { addToCart } from "../../../../../Redux/Cart/cart.actions";

const Sidebar = () => {
  // eslint-disable-next-line no-unused-vars
  // const { dispatch } = useContext(DarkModeContext);
  // const location = useLocation();

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const getSidebarIcon = (item) => {
    // const isActive = location.pathname.indexOf(encodeURI(item.route)) !== -1;
    switch (item.icon) {
      case "dashboard":
        return <DashboardIcon className="icon" />;
      // case "users":
      //   return <StoreIcon className="icon" />;
      // case "products":
      //   return <AccountBalanceWalletOutlinedIcon className="icon" />;
      // case "orders":
      //   return <ShoppingCartOutlinedIcon className="icon" />;
      // case "banners":
      //   return <LocalShippingIcon className="icon" />;
      // case "profile":
      //   return <AccountCircleOutlinedIcon className="icon" />;
      // case "logout":
      //   return <ExitToAppIcon className="icon" />;
      // case "category":
      //   return <CategoryIcon className="icon" />;
      // case "attributes":
      //   return <AccountTreeIcon className="icon" />;
      // case "units":
      //   return <DesignServicesIcon className="icon" />;
      // case "customers":
      //   return <PersonOutlinedIcon className="icon" />;
      default:
        return <></>;
    }
  };

  const handleLogout = () => {
    localStorage.setItem("userInfoF", null);
    dispatch(userLogout());
    dispatch(addToCart([]));
    localStorage.removeItem("address");
    localStorage.removeItem("orderItem");
    localStorage.removeItem("cart");
    window.location.reload();
  };

  return (
    <div className=" bg-white shadow-lg h-[100vh] min-w-[200px] w-full">
      {/* <hr /> */}
      <div className="">
        <ul className="overflow-y-auto">
          {sidebarList
            .filter((item) => {
              return item;
            })
            .map((item) => {
              if (item.onclick) {
                return (
                  <button
                    className="link m-0 p-0 w-full"
                    onClick={() => item.onclick === "logout" && handleLogout()}
                    style={{ textDecoration: "none" }}
                  >
                    <li className="my-2 px-3 py-2 flex justify-center hover:bg-[#ffe8f1] hover:text-[#f61571] link list-items text-normal">
                      {getSidebarIcon(item)}
                      <span>{item.moduleName}</span>
                    </li>
                  </button>
                );
              }
              return (
                <>
                  {item.heading && (
                    <p className="px-0 mx-0 w-full pt-5 pb-3 text-center text-gray-400 text-lg font-semibold uppercase">
                      {item.heading}
                    </p>
                  )}
                  <NavLink
                    className="link m-0 p-0 "
                    to={item.route}
                    // style={{ textDecoration: "none" }}
                  >
                    <li className="my-2 px-3 py-2 flex justify-center hover:bg-[#ffe8f1] hover:text-[#f61571] link list-items text-normal">
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
