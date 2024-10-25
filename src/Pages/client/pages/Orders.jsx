import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { db } from "../../admin/firebase";
import { useSelector } from "react-redux";

const Orders = () => {
  const userData = useSelector((store) => {
    return store.userAuthReducer.user;
  });

  const [data, setData] = React.useState([]);
  const [loading, setIsLoading] = React.useState([]);

  const fetchOrdersList = async () => {
    setIsLoading(true);
    await getDocs(collection(db, "orders")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setData(newData?.filter((order) => order?.uid === userData?.uid));
      setIsLoading(false);
    });
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchOrdersList();
  }, []);

  console.log(data);

  return <div className="h-full">Orders</div>;
};

export default Orders;
