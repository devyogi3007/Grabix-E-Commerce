import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./orders.scss";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewArrayIcon from "@mui/icons-material/ViewArray";

import AllProducts from "../products/data-productslist";
import {
  orderColumns
  // , productsColumns
} from "../../datatablesource";
import { Chip } from "@mui/material";
// import AllOrders from "../../data/all-orders-data";
// import { fetchOrdersList } from "./orderService";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

const OrdersList = ({ isAdmin }) => {
  const [data, setData] = useState([]);
  // const [isDataFetched, setDataFetched] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    fetchOrdersList();
  }, []);

  const fetchOrdersList = async () => {
    await getDocs(collection(db, "orders")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      if (isAdmin) {
        setData(newData);
      } else {
        setData(newData?.filter((item) => item.vId === auth?.token?.id));
      }
    });
  };
  const handleDelete = async (id) => {
    //   try {
    //     await deleteDoc(doc(db, "users", id));
    //     setData(data.filter((item) => item.id !== id));
    //   } catch (err) {
    //     console.log(err);
    //   }
  };
  console.log(data);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="flex gap-5 h-full items-center">
            <Link
              to={`/pannel/orders/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="text-[#7451f8]">
                <ViewArrayIcon />
              </div>
            </Link>
            <div
              className="text-[#7451f8] cursor-pointer "
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </div>
          </div>
        );
      }
    }
  ];
  return (
    <div className="px-3">
      <div className="flex items-center justify-between my-3">
        <p className="text-[#7451f8] font-bold text-xl relative">
          <p className="">
            Orders List{" "}
            <span className="border bg-[#7451f8] text-white rounded-full font-normal text-xs -top-2 -right-3 absolute px-1 py-0">
              {data.length}
            </span>
          </p>
        </p>
      </div>
      <div className="h-[calc(100vh_-_11rem)] w-[calc(100vw_-_18rem)]">
        <DataGrid
          className="overflow-auto w-full position-relative h-full bg-white"
          rows={data || []}
          columns={orderColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          // checkboxSelection
          // autoHeight
          rowHeight={125}
        />
      </div>
    </div>
  );
};

export default OrdersList;
