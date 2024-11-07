import * as React from "react";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./orders.scss";

// import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewArrayIcon from "@mui/icons-material/ViewArray";

import {
  orderColumns
  // , productsColumns
} from "../../datatablesource";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Input
} from "@mui/material";
// import AllOrders from "../../data/all-orders-data";
// import { fetchOrdersList } from "./orderService";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

const OrdersList = ({ isAdmin }) => {
  const [data, setData] = React.useState([]);

  const [searchText, setSearchText] = React.useState("");
  const [searchHeader, setSearchHeader] = React.useState("");

  // const [isDataFetched, setDataFetched] = useState(false);
  const auth = useAuth();

  React.useEffect(() => {
    fetchOrdersList();
  }, []);

  const fetchOrdersList = async () => {
    await getDocs(collection(db, "orders")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      if (isAdmin) {
        setData(
          newData?.map((order) => {
            return {
              ...order,
              orderId: order.id
            };
          })
        );
      } else {
        setData(
          newData
            ?.map((order) => {
              return {
                ...order,
                orderId: order.id
              };
            })
            ?.filter((item) => item.vId === auth?.token?.id)
        );
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

  const filteredOrders = searchText
    ? data.filter((product) => {
        console.log(product);
        return product?.[searchHeader?.field]
          ?.toString()
          .toLowerCase()
          .includes(searchText.toLowerCase());
      })
    : data;
  return (
    <div className="px-3">
      <div className="flex items-center justify-between my-3 gap-5">
        <p className="text-[#7451f8] font-bold text-xl relative w-fit min-w-[10%]">
          <p className="w-full">
            Orders List
            <span className="border bg-[#7451f8] text-white rounded-full font-normal text-xs -top-2 -right-3 absolute px-1 py-0">
              {data.length}
            </span>
          </p>
        </p>
        <div className="w-full flex items-center gap-5">
          <FormControl variant="standard" size="small" sx={{ minWidth: "50%" }}>
            <InputLabel id="searchHeader">Select filter type</InputLabel>
            <Select
              labelId="searchHeader"
              value={searchHeader?.headerName}
              label="Select filter type"
              onChange={(e) => {
                setSearchHeader(e.target.value);
                console.log(e.target.value);
              }}
              // defaultValue={"select"}
              // className="min-w-[15%]"
            >
              {(orderColumns || []).map((loc) => (
                <MenuItem key={loc.field} value={loc}>
                  {loc.headerName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {searchHeader && (
            <Input
              placeholder={`Search in ${searchHeader?.headerName}`}
              id="input-with-icon-adornment"
              className="mt-3"
              fullWidth
              onChange={(e) => {
                const { value } = e.target;
                setSearchText(value);
              }}
              endAdornment={
                <InputAdornment position="start">
                  <GridSearchIcon />
                </InputAdornment>
              }
            />
          )}
        </div>
      </div>
      <div className="h-[calc(100vh_-_11rem)] w-[calc(100vw_-_18rem)]">
        <DataGrid
          className="overflow-auto w-full position-relative h-full bg-white"
          rows={filteredOrders || []}
          columns={orderColumns
            .map((item) => ({ ...item, filter: false }))
            .concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          disableColumnFilter
          disableColumnMenu
          // checkboxSelection
          // autoHeight
          rowHeight={125}
        />
      </div>
    </div>
  );
};

export default OrdersList;
