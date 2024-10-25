import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import {
  userColumns
  // userRows
} from "../../datatablesource";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import AllUsers from "../../pages/list/data-userslist";

// import {
//   collection,
//   getDocs,
//   deleteDoc,
//   doc,
//   onSnapshot,
// } from "firebase/firestore";
// import { db } from "../../firebase";

const Datatable = () => {
  // const [data, setData] = useState([

  // ]);

  // API based.
  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   let list = [];
  //   //   try {
  //   //     const querySnapshot = await getDocs(collection(db, "users"));
  //   //     querySnapshot.forEach((doc) => {
  //   //       list.push({ id: doc.id, ...doc.data() });
  //   //     });
  //   //     setData(list);
  //   //     console.log(list);
  //   //   } catch (err) {
  //   //     console.log(err);
  //   //   }
  //   // };
  //   // fetchData();

  //   // LISTEN (REALTIME)
  //   const unsub = onSnapshot(
  //     collection(db, "users"),
  //     (snapShot) => {
  //       let list = [];
  //       snapShot.docs.forEach((doc) => {
  //         list.push({ id: doc.id, ...doc.data() });
  //       });
  //       setData(list);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  //   return () => {
  //     unsub();
  //   };
  // }, []);

  const handleDelete = async (id) => {
    // try {
    //   await deleteDoc(doc(db, "users", id));
    //   setData(data.filter((item) => item.id !== id));
    // } catch (err) {
    //   console.log(err);
    // }
    console.log("Handle Delete");
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex gap-5 h-full items-center">
            <Link
              to={`/pannel/products/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="text-[#7451f8]">
                <span className="border border-[#7451f8] px-2 py-1">View</span>
              </div>
            </Link>
            <div
              className="text-yellow-700 cursor-pointer h-full"
              onClick={() => {}}
            >
              <span className="border-yellow-700 border px-2 py-1">Edit</span>
            </div>
            <div
              className="text-red-700 cursor-pointer "
              onClick={() => handleDelete(params.row.id)}
            >
              <span className="border border-red-700 px-2 py-1">Delete</span>
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
          to="/pannel/users/new"
          className="border px-3 py-2 rounded-md text-[#7451f8] border-[#7451f8]"
        >
          Add Vendor
        </Link>
      </div>
      <div className="h-[calc(100vh_-_11rem)]">
        <DataGrid
          className="overflow-auto position-relative h-full bg-white"
          rows={AllUsers}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          rowHeight={125}
          // scrollbarSize={125}
        />
      </div>
    </div>
  );
};

export default Datatable;
