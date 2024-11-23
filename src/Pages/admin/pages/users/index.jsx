import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from "firebase/firestore";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewArrayIcon from "@mui/icons-material/ViewArray";

// import "./users.scss";
import { userColumns, usersColumns } from "../../datatablesource";
import { db } from "../../firebase";
import BasicModal from "../../components/modal";
import { toast } from "react-toastify";

const UserList = () => {
  const initialuser = {
    id: undefined,
    name: "",
    email: ""
  };

  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState({
    isOpen: false,
    mode: 1
  });

  const [user, setuser] = React.useState(initialuser);
  const [refreshDataCounter, setRefreshDataCounter] = React.useState(0);

  const fetchusersList = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setData(newData.filter((vendor) => vendor?.role?.id === 2));
    });
  };

  const handleOpen = (mode) => setOpen({ isOpen: true, mode });
  const handleClose = React.useCallback(() => {
    setOpen({ isOpen: false });
    setuser(initialuser);
  }, []);
  // console.log(refreshDataCounter);
  const handleDelete = (id) => {
    handleOpen(3);
    setuser({
      id
    });
    // try {
    //   await deleteDoc(doc(db, "users", id)).then((querySnapshot) => {
    //     setRefreshDataCounter((prev) => ++prev);
    //   });
    //   // .finally(() => setRefreshDataCounter((prev) => ++prev));
    //   // setData(data.filter((item) => item.id !== id));
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const confirmDelete = async () => {
    const { id } = user;
    try {
      await deleteDoc(doc(db, "users", id)).then((querySnapshot) => {
        setRefreshDataCounter((prev) => ++prev);
      });
      // .finally(() => setRefreshDataCounter((prev) => ++prev));
      // setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleStatusChange = async (e, row) => {
    try {
      await updateDoc(doc(db, "users", row.id), {
        status: e.target.checked
      }).then((querySnapshot) => {
        setRefreshDataCounter((prev) => ++prev);
      });
      toast.success(
        `Account for ${row?.storeName || ""} ${
          e.target.checked ? "Deactivated" : "Activated"
        }`
      );
      // .finally(() => setRefreshDataCounter((prev) => ++prev));
      // setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleAccountApprovalChange = async (e, row) => {
    try {
      await updateDoc(doc(db, "users", row.id), {
        approval: e.target.checked
      }).then((querySnapshot) => {
        setRefreshDataCounter((prev) => ++prev);
      });
      toast.success(`Account approved for ${row?.storeName || ""} `);
      // .finally(() => setRefreshDataCounter((prev) => ++prev));
      // setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (refreshDataCounter >= 0) {
      fetchusersList();
      handleClose();
    }
  }, [handleClose, refreshDataCounter]);

  const actionColumn = [
    {
      field: "status",
      headerName: "Vendor Active Status",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="flex h-full items-center justify-between">
            <label className="inline-flex items-center me-5 cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={params?.row?.status || false}
                onChange={(e) => handleStatusChange(e, params?.row)}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>
        );
      }
    },
    {
      field: "approval",
      headerName: "Vendor Account Approval",
      width: 220,
      renderCell: (params) => {
        return (
          <div
            style={{
              // display: "flex",
              // flexDirection: "column",
              // // alignItems: 'center',
              // justifyContent: "center",
              // whiteSpace: 'normal',
              lineHeight: 1.2
              // overflowWrap: 'break-word'
            }}
            className="flex h-full items-center justify-between"
          >
            {/* <label className="inline-flex items-center me-5 cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={params?.row?.status || false}
                onChange={(e) => handleStatusChange(e, params?.row)}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label> */}
            {!params.row.approval && (
              <div className="flex flex-col gap-1 w-full">
                <p className="text-red-400 font-semibold">Not Approved</p>
                <div className="flex gap-3 justify-end w-full">
                  <button className="text-xs hover:bg-blue-500 hover:text-white font-semibold px-1 text-blue-500 border border-blue-500">
                    Hold
                  </button>
                  <button
                    onClick={() => {
                      handleAccountApprovalChange(
                        {
                          target: { checked: true }
                        },
                        params?.row
                      );
                    }}
                    className="text-xs hover:bg-green-600 hover:text-white font-semibold px-1 text-green-600 border border-green-600"
                  >
                    Approve
                  </button>
                </div>
              </div>
            )}
            {params.row.approval && (
              <p className="p-1 font-semibold bg-[rgb(199_255_219)] text-green-600 border border-green-600">
                Approved
              </p>
            )}
          </div>
        );
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="flex gap-5 h-full items-center">
            <Link
              to={`/panel/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="text-[#7451f8]">
                <ViewArrayIcon />
              </div>
            </Link>
            {/* <Link
              to={`/panel/users/edit/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="text-[#7451f8] cursor-pointer"
                // onClick={() => handleEdit(params)}
              >
                <EditIcon />
              </div>
            </Link> */}

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
    <div className="px-3 h-full w-full">
      <div className="flex items-center justify-between my-3">
        <p className="text-[#7451f8] font-bold text-xl">Vendors</p>
        <Link
          to="/panel/users/new"
          // onClick={() => handleOpen(1)}
          className="border px-3 py-2 rounded-md text-[#7451f8] border-[#7451f8]"
        >
          Add Vendor
        </Link>
      </div>
      <div className="h-[calc(100vh_-_11rem)] w-[calc(100vw_-_18rem)]">
        <DataGrid
          className="overflow-auto w-full position-relative h-full bg-white"
          rows={data || []}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          // checkboxSelection
          // rowHeight={125}
        />
      </div>
      <BasicModal open={open.isOpen} handleClose={handleClose}>
        {open.mode === 3 && (
          <div className="px-5">
            <p className="text-[#7451f8] font-bold text-md">
              Are you sure you want to delete this user ?
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

export default UserList;
