import * as React from "react";
import { DataGrid, GridSearchIcon } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./category.scss";

import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { categoryColumns } from "../../datatablesource";
import { db } from "../../firebase";
import BasicModal from "../../components/modal";

import AccordionTable from "./AccordionTable";
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";

const CategoryList = ({ isAdmin }) => {
  const initialProduct = {
    id: undefined,
    name: "",
    price: 0,
    category: ""
  };

  const [data, setData] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [searchHeader, setSearchHeader] = React.useState("");
  const [open, setOpen] = React.useState({
    isOpen: false,
    mode: 1
  });

  const [product, setProduct] = React.useState(initialProduct);
  const [refreshDataCounter, setRefreshDataCounter] = React.useState(0);

  const fetchCategoriesList = async () => {
    await getDocs(collection(db, "categories")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setData(newData);
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
      await deleteDoc(doc(db, "categories", id)).then((querySnapshot) => {
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
      fetchCategoriesList();
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
          <div className="flex gap-5 items-center">
            <Link
              to={`/pannel/${params.route}/edit/${params.row.id}`}
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
              className="text-[#7451f8] cursor-pointer"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </div>
          </div>
        );
      }
    }
  ];
  const filteredProducts =
    searchText && searchText?.length >= 3
      ? data.filter((category) =>
          category?.[searchHeader?.field]
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )
      : data;
  return (
    <div className="px-3 h-full w-full flex flex-col gap-5 overflow-scroll">
      <div className="mb-3">
        <div className="flex items-center justify-between mt-3 gap-5">
          <p className="text-[#7451f8] font-bold text-xl">Categories</p>
          <div className="w-full flex items-center gap-5">
            <FormControl
              variant="standard"
              size="small"
              sx={{ minWidth: "50%" }}
            >
              <InputLabel id="searchHeader">Select filter type</InputLabel>
              <Select
                labelId="searchHeader"
                value={searchHeader?.headerName}
                label="Select filter type"
                onChange={(e) => {
                  setSearchHeader(e.target.value);
                }}
                // defaultValue={"select"}
                // className="min-w-[15%]"
              >
                {(categoryColumns || []).map((loc) => (
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
          {isAdmin && (
            <div className="flex gap-5 w-full justify-end">
              <Link
                to="/pannel/category/new"
                // onClick={() => handleOpen(1)}
                className="border px-3 py-2 rounded-md text-[#7451f8] border-[#7451f8]"
              >
                Add Category
              </Link>
              <Link
                to="/pannel/sub-category/new"
                // onClick={() => handleOpen(1)}
                className="border px-3 py-2 rounded-md text-[#7451f8] border-[#7451f8]"
              >
                Add Sub Category
              </Link>
            </div>
          )}
        </div>
        {/* <div className="h-[calc(100vh_-_11rem)]  w-[calc(100vw_-_18rem)]">
          <DataGrid
            className="overflow-auto position-relative h-full bg-white"
            rows={data.filter((item) => item?.parentCategoryId === "0") || []}
            columns={categoryColumns.concat(isAdmin ? actionColumn : [])}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            // rowHeight={125}
          />
        </div> */}
      </div>
      <AccordionTable
        data={filteredProducts || []}
        columns={categoryColumns.concat(isAdmin ? actionColumn : [])}
      />
      {open.isOpen && (
        <BasicModal open={open.isOpen} handleClose={handleClose}>
          {open.mode === 3 && (
            <div className="px-5">
              <p className="text-[#7451f8] font-bold text-md">
                Are you sure you want to delete this category ?
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
      )}
    </div>
  );
};

export default CategoryList;
