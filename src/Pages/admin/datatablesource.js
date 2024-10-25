import { Chip } from "@mui/material";
import { formatter } from "../../Helpers/firebaseHelper";

export function formatTimestamp(seconds, nanoseconds) {
  const milliseconds = (seconds * 1000) + (nanoseconds / 1000000);
  return new Date(milliseconds);
}

// Function to format date as DD-Month-YYYY
export function formatDate(date) {
  const day = date.getDate();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "storeName",
    headerName: "Store Information",
    width: 230,
    // renderCell: (params) => {
    //   return (
    //     <div className="flex flex-col">
    //       <p>
    //         {params.row.storeName}
    //       </p>
    //       <p>
    //         <strong>Id:</strong> {params.row.id}
    //       </p>
    //     </div>
    //   );
    // }
  },
  {
    field: "owner",
    headerName: "Owner Information",
    width: 230,
    renderCell: (params) => {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          justifyContent: 'center',
          // whiteSpace: 'normal',
          lineHeight: 1.2,
          // overflowWrap: 'break-word'
        }}>
          <div>
            {params.row.firstName} {params.row.lastName}
          </div>
          <div>
            {params.row.phoneNo}
          </div>
        </div>
      );
    }
  },
  {
    field: "locationLink",
    headerName: "zone",
    width: 230,
    renderCell: ({ row }) => {
      return <a href={row.locationLink} target="_blank" rel="noreferrer" className="text-blue-400">{row.locationLink}</a>
    }
  },

  {
    field: "storeAddress",
    headerName: "Address",
    width: 100
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   }
  // }
];
export const customerColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "email",
    headerName: "Email Address",
    width: 230,
    // renderCell: (params) => {
    //   return (
    //     <div style={{
    //       display: 'flex',
    //       flexDirection: 'column',
    //       // alignItems: 'center',
    //       justifyContent: 'center',
    //       // whiteSpace: 'normal',
    //       lineHeight: 1.2,
    //       // overflowWrap: 'break-word'
    //     }}>
    //       <div>
    //         {params.row.firstName} {params.row.lastName}
    //       </div>
    //       <div>
    //         {params.row.phoneNo}
    //       </div>
    //     </div>
    //   );
    // }
  },
  {
    field: "mob",
    headerName: "Mobile No.",
    width: 230,
    // renderCell: (params) => {
    //   return (
    //     <div style={{
    //       display: 'flex',
    //       flexDirection: 'column',
    //       // alignItems: 'center',
    //       justifyContent: 'center',
    //       // whiteSpace: 'normal',
    //       lineHeight: 1.2,
    //       // overflowWrap: 'break-word'
    //     }}>
    //       <div>
    //         {params.row.firstName} {params.row.lastName}
    //       </div>
    //       <div>
    //         {params.row.phoneNo}
    //       </div>
    //     </div>
    //   );
    // }
  },

  {
    field: "address",
    headerName: "Address",
    width: 100
  },
];

export const productsColumns = [
  { field: "id", headerName: "ID", width: 200 },
  // {
  //   field: "images",
  //   headerName: "image",
  //   width: 230,
  //   renderCell: (params) => {
  //     return (
  //       <div className="cellWithImg">
  //         <img className="cellImg" src={params.row.images} alt="avatar" />
  //         {params.row.name}
  //       </div>
  //     );
  //   }
  // },
  {
    field: "name",
    headerName: "Title",
    width: 230
  },
  {
    field: "category",
    headerName: "Category",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          {params?.row?.parentCategoryName && (
            <p className="font-bold">
              {params?.row?.parentCategoryName} /{" "}
              {params?.row?.categoryName}
            </p>
          )}
          {!params?.row?.parentCategoryName && (
            <p className="font-bold">{params?.row?.categoryName}</p>
          )}
        </>
      );
    }
  },

  {
    field: "price",
    headerName: "Price",
    width: 100,
    renderCell: (params) => {
      return <p className="font-bold">{formatter.format(params.row.price)}</p>;
    }
  },
  {
    field: "price2",
    headerName: "Price after discount",
    width: 200,
    renderCell: (params) => {
      return <p className="font-bold">{formatter.format(params.row.price2)}</p>;
    }
  }
];

export const unitsColumns = [
  { field: "id", headerName: "ID", width: 200 },
  // {
  //   field: "images",
  //   headerName: "image",
  //   width: 230,
  //   renderCell: (params) => {
  //     return (
  //       <div className="cellWithImg">
  //         <img className="cellImg" src={params.row.images} alt="avatar" />
  //         {params.row.name}
  //       </div>
  //     );
  //   }
  // },
  {
    field: "name",
    headerName: "Name",
    width: 230
  },
];
export const categoryColumns = [
  { field: "id", headerName: "ID", width: 200 },
  // {
  //   field: "images",
  //   headerName: "image",
  //   width: 230,
  //   renderCell: (params) => {
  //     return (
  //       <div className="cellWithImg">
  //         <img className="cellImg" src={params.row.images} alt="avatar" />
  //         {params.row.name}
  //       </div>
  //     );
  //   }
  // },
  {
    field: "name",
    headerName: "Title",
    width: 230
  },
  {
    field: "description",
    headerName: "Description",
    width: 230
  }
];

export const orderColumns = [
  // { field: "id", headerName: "#Serial" },
  { field: "name", headerName: "Title", width: 250 },
  {
    field: "orderId", headerName: "Order id", width: 300, renderCell: params => {
      return params.row.id
    }
  },
  {
    field: "orderDate", headerName: "Order date", width: 200, renderCell: ({ row }) => {
      const dateObj = formatTimestamp(
        row?.orderDate?.seconds,
        row?.orderDate?.nanoseconds
      );
      const timestampData = row?.orderDate
      const milliseconds = (timestampData?.seconds * 1000) + (timestampData?.nanoseconds / 1000000);

      // Create a Date object
      const date = new Date(milliseconds);

      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';

      // Convert hours to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'

      // Format minutes to always be two digits
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

      // Final formatted time
      const time12hr = `${hours}:${formattedMinutes} ${ampm}`;
      const formattedDate = formatDate(dateObj);
      return (
        <div className="flex flex-col items-start font-bold py-3" style={{
          lineHeight: "calc(var(--height) - 6rem)"
        }}><span >{time12hr}</span><span>{formattedDate}</span></div>
      )
    }
  },
  {
    field: "customerInfo", headerName: "Customer info", width: 400, height: 100, renderCell: params => {
      return (
        <div className="flex flex-col py-3" style={{
          lineHeight: "calc(var(--height) - 6rem)"
        }}>
          <span className="font-bold uppercase">{params.row.userAddress?.name}</span>
          <span>Phone No: {params.row?.userAddress?.mob}</span>
          <span>Address: {params.row?.userAddress?.address}, {params.row?.userAddress?.city}</span>
        </div>
      )
    }
  },
  { field: "store", headerName: "Store", width: 150 },
  { field: "quantity", headerName: "Quantity", width: 150 },
  { field: "paymentType", headerName: "Payment Type", width: 250 },
  {
    field: "price2", headerName: "Total", width: 150, renderCell: (params) => {
      return <p className="font-bold">{formatter.format(params.row.price2 * params.row.quantity)}</p>;
    }
  },
  {
    field: "orderStatus",
    headerName: "Order status",
    width: 150,
    renderCell: (params) => {
      const statusColor =
        params.row.orderStatus === "Delivered" ? "success" : "primary";
      return (
        <div>
          <Chip color={statusColor} label={params.row.orderStatus || "Confirmed"} />
        </div>
      );
    }
  }
];
