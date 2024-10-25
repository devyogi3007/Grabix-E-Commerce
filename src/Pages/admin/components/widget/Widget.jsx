import "./widget.scss";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import StoreIcon from "@mui/icons-material/Store";

import { useEffect, useState, useMemo } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { fetchDocumentCount } from "../../../../Helpers/firebaseHelper";
import { endpoints } from "../../../../Helpers";

const Widget = ({ type }) => {
  // eslint-disable-next-line no-unused-vars
  // const [productsCount, setProductsCount] = useState(10);
  // const [ordersCount, setOrdersCount] = useState(12);
  // const [customersCount, setCustomersCount] = useState(5);
  // const [storesCount, setStoresCount] = useState(5);
  const [count, setCount] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    users: 0
  });
  let data;

  switch (type) {
    case "customers":
      data = {
        title: "Customers",
        totalCount: count.customers,
        isMoney: false,
        link: "See all customers",
        query: "customers",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)"
            }}
          />
        )
      };
      break;
    case "users":
      data = {
        title: "Stores",
        totalCount: count.users,
        isMoney: false,
        link: "See all stores",
        query: "stores",
        icon: (
          <StoreIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)"
            }}
          />
        )
      };
      break;
    case "orders":
      data = {
        title: "Orders",
        totalCount: count.orders,
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod"
            }}
          />
        )
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        )
      };
      break;
    case "products":
      data = {
        title: "Products",
        totalCount: count.products,
        query: "products",
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple"
            }}
          />
        )
      };
      break;
    default:
      break;
  }

  // const endpoints = useMemo(
  //   () => ["products", "orders", "customers", "users"],
  //   []
  // );

  useEffect(() => {
    endpoints.map((endpoint) => {
      fetchDocumentCount(endpoint).then((count) => {
        setCount((prev) => ({
          ...prev,
          [endpoint]: count
        }));
      });
    });
  }, []);

  console.log(count);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.totalCount}
        </span>
        {/* <span className="link">{data.link}</span> */}
      </div>
      <div className="right">
        <span className="icon">{data.icon}</span>
      </div>
      {/* <div className="right">
        <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {diff < 0 ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/> }
          {diff} %
        </div>
        {data.icon}
      </div> */}
    </div>
  );
};

export default Widget;
