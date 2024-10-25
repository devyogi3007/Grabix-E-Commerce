import React from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import AddEditUnit from "./AddEditUnit";
import { unitsColumns } from "../../datatablesource";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BasicModal from "../../components/modal";

const Units = ({ module = "Unit" }) => {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [refreshDataCounter, setRefreshDataCounter] = React.useState(0);
  const [row, setRow] = React.useState({});

  const fetchModuleList = async (coll, setState) => {
    await getDocs(collection(db, coll)).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setState(newData);
    });
  };

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  const moduleRoute = module === "Unit" ? "units" : "attributes";
  React.useEffect(() => {
    if (refreshDataCounter >= 0) {
      fetchModuleList(moduleRoute, setData);
      handleClose();
    }
  }, [handleClose, module, moduleRoute, refreshDataCounter]);

  const handleDelete = (row) => {
    setOpen(true);
    setRow(row);
  };
  const confirmDelete = async () => {
    const { id } = row;
    try {
      await deleteDoc(doc(db, moduleRoute, id)).then((querySnapshot) => {
        setRefreshDataCounter((prev) => ++prev);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumns = [
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="flex gap-5 h-full items-center">
            <Link
              to={`/admin/${moduleRoute}/edit/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="text-[#7451f8] cursor-pointer">
                <EditIcon />
              </div>
            </Link>

            <div
              className="text-[#7451f8] cursor-pointer "
              onClick={() => handleDelete(params.row)}
            >
              <DeleteIcon />
            </div>
          </div>
        );
      }
    }
  ];

  return (
    <div className="h-full">
      <AddEditUnit
        mode={1}
        module={module}
        setRefreshDataCounter={setRefreshDataCounter}
      />
      <div className="h-full my-5">
        <div className="flex justify-between items-center my-3">
          <p className="text-[#7451f8] font-bold text-xl">{module} Lists</p>
          <Button type="submit" variant="outlined" color="secondary">
            Export
          </Button>
        </div>
        <DataGrid
          className="overflow-auto position-relative bg-white"
          rows={data || []}
          columns={unitsColumns.concat(actionColumns)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          // rowHeight={125}
        />
      </div>
      <BasicModal open={open} handleClose={handleClose}>
        <div className="px-5">
          <p className="text-[#7451f8] font-bold text-md">
            Are you sure you want to delete this {module} ?
          </p>
          <div className="w-full flex justify-between mt-5">
            <button
              className="border px-3 py-2 rounded-md disabled:text-gray-500 disabled:border-gray-500 text-white bg-red-600 border-red-600"
              type="submit"
              onClick={() => confirmDelete()}
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
      </BasicModal>
    </div>
  );
};

export default Units;
