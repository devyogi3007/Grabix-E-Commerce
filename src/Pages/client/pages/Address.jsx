import React from "react";

import withLayout from "../../../Hooks/WithAccountLayout";
import AddressForm from "../Forms/AddressForm";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../admin/firebase";
import BasicMenu from "../components/MenuDropdown";
import { useSelector } from "react-redux";

const Address = () => {
  const [addFormOpen, setAddFormOpen] = React.useState(false);
  const [editFormOpen, setEditFormOpen] = React.useState({
    id: undefined,
    isOpen: false
  });
  const [refreshDataCounter, setRefreshDataCounter] = React.useState(0);
  const [data, setData] = React.useState([]);

  const userData = useSelector((store) => {
    return store.userAuthReducer.user;
  });

  const fetchAddressesList = React.useCallback(async () => {
    await getDocs(collection(db, "customer-addresses")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setData(newData?.filter((address) => address.uId === userData?.id));
      }
    );
  }, [userData?.id]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "customer-addresses", id)).then(
        (querySnapshot) => {
          setRefreshDataCounter((prev) => ++prev);
        }
      );
      // .finally(() => setRefreshDataCounter((prev) => ++prev));
      // setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (refreshDataCounter >= 0) {
      fetchAddressesList();
      setAddFormOpen(false);
      setEditFormOpen({ isOpen: false });
    }
  }, [fetchAddressesList, refreshDataCounter]);

  return (
    <div className="w-full h-full bg-white p-10 flex flex-col gap-10">
      <p className="font-semibold text-xl">Manage Addresses</p>
      {data?.length <= 10 && (
        <div className={`w-full border border-gray-200 px-5 py-2 bg-white `}>
          {!addFormOpen && (
            <button
              onClick={() => {
                setAddFormOpen((prevState) => !prevState);
              }}
              className="flex gap-3 items-center w-full"
            >
              <span className="text-[#f61571] uppercase text-3xl">+</span>
              <span className="text-[#f61571] uppercase font-semibold text-sm">
                Add a new address
              </span>
            </button>
          )}
          {addFormOpen && (
            <AddressForm
              setFormOpen={setAddFormOpen}
              mode={1}
              user={userData}
              setRefreshDataCounter={() =>
                setRefreshDataCounter((prev) => ++prev)
              }
            />
          )}
        </div>
      )}
      {data.length > 0 && (
        <div className={`w-full border border-gray-200 py-2 bg-white group`}>
          {data.map((address, index) => {
            return (
              <>
                <div className="p-5 relative">
                  {editFormOpen.isOpen && editFormOpen?.id === address?.id ? (
                    <AddressForm
                      setFormOpen={(state) => [
                        setEditFormOpen({ id: address.id, isOpen: state })
                      ]}
                      mode={2}
                      rowData={address}
                      user={userData}
                      setRefreshDataCounter={() =>
                        setRefreshDataCounter((prev) => ++prev)
                      }
                    />
                  ) : (
                    <>
                      <BasicMenu
                        setFormOpen={(state) => {
                          setEditFormOpen({
                            id: address.id,
                            isOpen: state
                          });
                        }}
                        onDelete={() => {
                          handleDelete(address?.id);
                        }}
                        className="group-hover:opacity-100 opacity-0"
                      />
                      <span
                        className={`${
                          address.addressType ? "p-1" : ""
                        } bg-slate-100 font-normal uppercase text-xs`}
                      >
                        {address.addressType || ""}
                      </span>
                      <div className="flex gap-3 font-bold mt-3">
                        <p>{address.name}</p>
                        <p>{address.mobile}</p>
                      </div>
                      <div className="flex gap-3">
                        <p>
                          {address.address}, {address.city}, {address.state} -{" "}
                          <span className="font-bold">{address.pincode}</span>
                        </p>
                      </div>
                    </>
                  )}
                </div>
                {data?.length > 1 && index !== data?.length - 1 && <hr />}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default withLayout(Address);
