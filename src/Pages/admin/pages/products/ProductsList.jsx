import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewArrayIcon from "@mui/icons-material/ViewArray";

import "./products.scss";
import { productsColumns } from "../../datatablesource";
import { db } from "../../firebase";
import BasicModal from "../../components/modal";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";

const ProductsList = ({ isAdmin, isVendor }) => {
  const auth = useAuth();

  const currentUser = auth.token || {};
  const initialProduct = {
    id: undefined,
    name: "",
    price: 0,
    category: ""
  };

  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState({
    isOpen: false,
    mode: 1
  });

  const [product, setProduct] = React.useState(initialProduct);
  const [refreshDataCounter, setRefreshDataCounter] = React.useState(0);

  const fetchProductsList = async () => {
    await getDocs(collection(db, "products")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      if (isVendor) {
        setData(newData.filter((item) => item.vId === currentUser?.uid));
      } else {
        setData(newData);
      }
    });
  };

  const handleOpen = (mode) => setOpen({ isOpen: true, mode });
  const handleClose = React.useCallback(() => {
    setOpen({ isOpen: false });
    setProduct(initialProduct);
  }, []);
  // console.log(refreshDataCounter);
  const handleDelete = (id) => {
    handleOpen(3);
    setProduct({
      id
    });
    // try {
    //   await deleteDoc(doc(db, "products", id)).then((querySnapshot) => {
    //     setRefreshDataCounter((prev) => ++prev);
    //   });
    //   // .finally(() => setRefreshDataCounter((prev) => ++prev));
    //   // setData(data.filter((item) => item.id !== id));
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const confirmDelete = async () => {
    const { id } = product;
    try {
      await deleteDoc(doc(db, "products", id)).then((querySnapshot) => {
        setRefreshDataCounter((prev) => ++prev);
      });
      // .finally(() => setRefreshDataCounter((prev) => ++prev));
      // setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (refreshDataCounter >= 0) {
      fetchProductsList();
      handleClose();
    }
  }, [handleClose, refreshDataCounter]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="flex gap-5 h-full items-center">
            <Link
              to={`/pannel/products/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="text-[#7451f8]">
                <ViewArrayIcon />
              </div>
            </Link>
            <Link
              to={`/pannel/products/edit/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="text-[#7451f8] cursor-pointer"
                // onClick={() => handleEdit(params)}
              >
                <EditIcon />
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

  console.log(data);

  return (
    <div className="px-3 h-full w-full">
      <div className="flex items-center justify-between my-3">
        <p className="text-[#7451f8] font-bold text-xl">Products</p>
        <Link
          to="/pannel/products/new"
          // onClick={() => handleOpen(1)}
          className="border px-3 py-2 rounded-md text-[#7451f8] border-[#7451f8]"
        >
          Add Product
        </Link>
      </div>
      <div className="h-[calc(100vh_-_11rem)] w-[calc(100vw_-_18rem)]">
        <DataGrid
          className="overflow-auto w-full position-relative h-full bg-white"
          rows={data || []}
          columns={productsColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          // rowHeight={125}
        />
      </div>
      <BasicModal open={open.isOpen} handleClose={handleClose}>
        {open.mode === 3 && (
          <div className="px-5">
            <p className="text-[#7451f8] font-bold text-md">
              Are you sure you want to delete this product ?
            </p>
            <div className="w-full flex justify-between mt-5">
              <button
                className="border px-3 py-2 rounded-md disabled:text-gray-500 disabled:border-gray-500 text-white bg-red-600 border-red-600"
                type="submit"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                className="border px-3 py-2 rounded-md disabled:text-gray-500 disabled:border-gray-500 text-[#7451f8] border-[#7451f8]"
                type="submit"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </BasicModal>
    </div>
  );
};

export default ProductsList;
