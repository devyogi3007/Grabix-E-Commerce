import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../Redux/Cart/cart.actions";
import styles from "../styles/Cart.module.css";
import { MdDelete } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";
import { TfiLocationPin } from "react-icons/tfi";
import Empty from "../components/Empty";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import useLocalStorageState from "use-local-storage-state";
import { Button } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
  writeBatch
} from "firebase/firestore";
import { db } from "../../../firebase";
import { formatter, getDocument } from "../../../Helpers/firebaseHelper";

import Modal from "../components/Modal/index";
import ControlledRadioButtonsGroup from "../components/RadioGroup";

const arr = JSON.parse(localStorage.getItem("address")) || [];

function Cart({ payment }) {
  const navigate = useNavigate();

  const [cart, setCart] = useLocalStorageState("cart", {
    cart: []
  });
  const [userAddress, setAddress] = useLocalStorageState("address", {});

  //local states
  const [users, setUsers] = React.useState([]);
  const [value, setValue] = React.useState(userAddress || {});
  const [addressModalopen, setAddressModalOpen] = React.useState(false);
  const [addressListForCurrentUser, setAddressListForCurrentUser] =
    React.useState([]);

  const handleRemove = (el) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.cart?.filter((item) => item.id !== el.id);
      return { cart: updatedCart };
    });
  };

  const getProducts = React.useCallback(() => cart.cart || [], [cart.cart]);

  const { totalDiscountedPrice, totalDiscount } = getProducts().reduce(
    (acc, product) => {
      let discountedPrice;
      let discountAmount;

      // Calculate discount based on type
      if (product.discountType === "%") {
        discountAmount = product.price * (product.discount / 100);
        discountedPrice = product.price - discountAmount;
      } else if (product.discountType === "₹") {
        discountAmount = product.discount;
        discountedPrice = product.price - discountAmount;
      } else {
        discountedPrice = product.price;
        discountAmount = 0;
      }

      // Ensure discounted price doesn’t go below zero
      discountedPrice = Math.max(0, discountedPrice);
      const productTotal = discountedPrice * product.quantity;
      acc.totalDiscountedPrice += productTotal;
      acc.totalDiscount += discountAmount * product.quantity;

      return acc;
    },
    { totalDiscountedPrice: 0, totalDiscount: 0 }
  );

  const totalPrice = getProducts().reduce((acc, product) => {
    const productTotal = product.price2 * product.quantity;
    return acc + productTotal;
  }, 0);
  const totalMRP = getProducts().reduce((acc, product) => {
    const productTotal = product.price * product.quantity;
    return acc + productTotal;
  }, 0);

  function closeSpan() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setAddress("address", JSON.stringify(userAddress));
    closeSpan();
  };

  const handleAddress = (e) => {
    let x = e.target.name;
    setAddress({ ...userAddress, [x]: e.target.value });
  };

  const handlePFinalayment = () => {
    const { name, address, city, mob } = userAddress;
    if (
      name.length > 4 &&
      mob.length > 9 &&
      address.length > 4 &&
      city.length > 3
    ) {
      navigate("/payment");
    } else {
      toast.warn("Check Your Details properly!");
    }
  };
  // console.log(arr, "vvvv");

  const fetchusersList = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setUsers(newData.filter((vendor) => vendor?.role?.id === 2));
    });
  };

  React.useEffect(() => {
    fetchusersList();
  }, []);

  console.log(users);

  const addToCart = React.useCallback(
    (product, quantity) => {
      // product.quantity = quantity;

      // setCart((prevCart) => {
      //   if (prevCart?.cart) {
      //     let sameProduct = (prevCart?.cart || [])?.find((item) =>
      //       item.id === product.id ? true : false
      //     );
      //     console.log(sameProduct);
      //     return { cart: [...prevCart.cart, product] };
      //   }
      //   return { cart: [product] };
      // });

      setCart(({ cart = [] }) => {
        // Check if product already exists in the cart
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
          // If product exists, update quantity
          return {
            cart: cart.map((item) =>
              item.id === product.id ? { ...item, quantity } : item
            )
          };
        } else {
          // If product doesn't exist, add it to the cart
          return { cart: [...cart, { ...product, quantity }] };
        }
      });
    },
    [setCart]
  );

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
        setAddressListForCurrentUser(
          newData?.filter((address) => address.uId === userData?.id)
        );
      }
    );
  }, [userData?.id]);

  React.useEffect(() => {
    fetchAddressesList();
  }, [fetchAddressesList]);

  const handleFinalPayment = async () => {
    // const { name, address, city, mob } = userAddress;
    if (true) {
      try {
        getProducts().map((product) => {
          const docRef = addDoc(collection(db, "orders"), {
            ...product,
            userId: userData?.uid,
            userAddress,
            orderDate: serverTimestamp(),
            totalPrice
          });
          console.log("Document written with ID: ", docRef.id);
          return docRef;
          // Clear fields after successful submission
          // setProduct(initialProduct);
        });
        navigate("/payment-form");
      } catch (e) {
        console.error("Error adding document: ", e);
        // setError("Error adding product");
      }
      // navigate("/payment-demo");
    } else {
      toast.warn("Check Your Details properly!");
    }
  };

  return (
    <>
      {getProducts().length <= 0 && <Empty />}
      {getProducts().length > 0 && (
        <div className="h-full bg-slate-100 w-full p-3">
          <div className="flex w-full gap-3 relative">
            <div className="flex flex-col gap-3 w-4/5">
              <div className="bg-white shadow-sm w-full flex items-center">
                <p className="text-lg ms-24 font-bold cursor-pointer text-[#f61571] border-b-2 border-[#f61571] py-4 px-28">
                  {payment && "Proceed to payment"}
                  {!payment && "Cart"}{" "}
                  {!payment && (
                    <span className="">({getProducts().length})</span>
                  )}
                </p>
              </div>
              <div className="bg-white shadow-sm w-full p-5 flex justify-between items-center text-sm">
                {Object.keys(value)?.length > 0 && (
                  <div className="">
                    <div className="font-bold flex items-center gap-5">
                      <div>
                        <span className="font-normal">Deliver to:</span>{" "}
                        {value?.name || ""}, {value?.pincode || ""}
                      </div>
                      <span className="bg-slate-100 p-1 font-normal uppercase text-xs">
                        {value?.addressType || ""}
                      </span>
                    </div>
                    <div className="text-slate-400">{value?.address}</div>
                  </div>
                )}
                {Object.keys(value)?.length <= 0 && (
                  <div>
                    <p className="font-semibold text-md">Select Address</p>
                  </div>
                )}
                <button
                  onClick={() => setAddressModalOpen(true)}
                  className="border px-4 py-2 hover:shadow-sm"
                >
                  Change
                </button>
              </div>
              <div className="bg-white shadow-sm w-full relative">
                {getProducts().map((el) => {
                  console.log(el);
                  return (
                    <>
                      <div className="h-100 flex gap-5 p-5">
                        <div className="h-100">
                          <Link
                            to={`/allproducts/${
                              el?.categoryName || el?.parentCategoryName
                            }/${el.id}`}
                          >
                            <img
                              src={el.image}
                              alt="img"
                              className="h-[150px] w-[150px] object-contain"
                            />
                          </Link>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="text-lg">
                            <Link
                              className="hover:text-[#f61571] text-black"
                              to={`/allproducts/${
                                el?.categoryName || el?.parentCategoryName
                              }/${el.id}`}
                            >
                              {el.name}
                            </Link>
                          </div>
                          <div className="text-sm text-gray-400 font-bold">
                            Seller:{" "}
                            {users?.find((user) => user?.id === el.vId)
                              ?.storeName || ""}
                          </div>
                          <div className="flex gap-3 items-end">
                            <span className="text-sm text-gray-400 line-through">
                              {formatter.format(el?.price * el?.quantity)}
                            </span>
                            <span className="text-normal text-black font-bold">
                              {formatter.format(el?.price2 * el?.quantity)}
                            </span>
                            <span className="text-normal text-sm text-[#f61571] font-bold">
                              {el?.discount}
                              {el?.discountType} Off
                            </span>
                          </div>
                          <div className="flex items-center py-3 gap-5">
                            <div className={"flex"}>
                              <button
                                onClick={() => {
                                  if (el?.quantity === 1) {
                                    handleRemove(el);
                                  } else {
                                    // setQuantity((prev) => {
                                    addToCart(el, el?.quantity - 1);
                                  }
                                  //   return prev - 1;
                                  // });
                                }}
                                type="button"
                                className="bg-slate-300 px-2 disabled:cursor-not-allowed disabled:text-gray-400"
                                disabled={el?.quantity === 1}
                              >
                                -
                              </button>
                              <p className="outline-0 w-7 px-2">
                                {el?.quantity}
                              </p>
                              <button
                                onClick={() => {
                                  // setQuantity((prev) => {
                                  addToCart(el, el?.quantity + 1);
                                  //   return prev + 1;
                                  // });
                                }}
                                type="button"
                                className="bg-slate-300 px-2  disabled:cursor-not-allowed disabled:text-gray-400"
                                disabled={el?.quantity === Number(el?.limit)}
                              >
                                +
                              </button>
                            </div>
                            <div className="">
                              <button
                                onClick={() => handleRemove(el)}
                                className="text-black text-sm hover:text-[#f61571] uppercase font-bold"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </>
                  );
                })}
                <div className="w-full flex justify-end px-5 py-3 sticky bottom-0 bg-white shadow-lg-top text-white p-4">
                  {/* <div class="absolute inset-x-0 -top-3 h-2 shadow-md"></div> */}
                  <button
                    onClick={() => {
                      payment ? handleFinalPayment() : navigate("/payment");
                    }}
                    className="bg-[#f61571] text-normal text-white px-3 py-2 min-w-[35%]"
                  >
                    {payment && "Place order"}
                    {!payment && "Continue to payment"}
                  </button>
                </div>
              </div>
            </div>
            <div className="w-[33%]">
              <div className="bg-white shadow-sm w-full sticky top-0">
                <div className="w-full ">
                  <p className="uppercase text-gray-400 text-normal font-bold p-5">
                    Price Details
                  </p>
                </div>
                <hr />
                <div className="p-5 flex flex-col gap-5">
                  <div className="flex justify-between  w-full">
                    <p>Price ({getProducts().length} item)</p>
                    <p className="">{formatter.format(totalMRP)}</p>
                  </div>
                  <div className="flex justify-between  w-full">
                    <p>Discount</p>
                    <p className="text-[#f61571]">
                      -{formatter.format(totalDiscount)}
                    </p>
                  </div>
                  <div className="flex justify-between  w-full">
                    <p>Delivery Charges</p>
                    <p className="">Rate</p>
                  </div>
                  <div className="border-b border-dashed" />
                  <div className="flex justify-between  w-full text-lg font-bold">
                    <p>Total Amount</p>
                    <p className="">{formatter.format(totalDiscountedPrice)}</p>
                  </div>
                  <div className="border-b border-dashed" />
                  <div className="flex justify-between text-green-700 w-full text-normal font-bold">
                    <p>
                      You will save {formatter.format(totalDiscount)} on this
                      order
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        open={addressModalopen}
        handleClose={() => {
          setAddressModalOpen(false);
        }}
      >
        <>
          {addressListForCurrentUser.length > 0 && (
            // <div
            //   className={`w-full border border-gray-200 py-2 bg-white group`}
            // >

            //   {addressListForCurrentUser.map((address, index) => {
            //     return (
            //       <>
            //         <div className="p-5 relative">
            //           <>
            //             <span
            //               className={`${
            //                 address.addressType ? "p-1" : ""
            //               } bg-slate-100 font-normal uppercase text-xs`}
            //             >
            //               {address.addressType || ""}
            //             </span>
            //             <div className="flex gap-3 font-bold mt-3">
            //               <p>{address.name}</p>
            //               <p>{address.mobile}</p>
            //             </div>
            //             <div className="flex gap-3">
            //               <p>
            //                 {address.address}, {address.city}, {address.state} -{" "}
            //                 <span className="font-bold">{address.pincode}</span>
            //               </p>
            //             </div>
            //           </>
            //         </div>
            //         {addressListForCurrentUser?.length > 1 &&
            //           index !== addressListForCurrentUser?.length - 1 && <hr />}
            //       </>
            //     );
            //   })}
            // </div>
            <ControlledRadioButtonsGroup
              header={"Select delivery address"}
              options={addressListForCurrentUser}
              modalOprator={(value) => {
                setAddressModalOpen(value);
              }}
              setValue={(value) => {
                const selectedObj = addressListForCurrentUser.find((option) => {
                  setAddressModalOpen(false);
                  return option.id === value;
                });
                setValue(selectedObj);
                setAddress(selectedObj);
              }}
              value={value}
              valueId={"id"}
              getLabel={(address) => {
                console.log(address);
                return (
                  <>
                    <div className="flex gap-3 font-bold mt-3">
                      <p>{address.name}</p>
                      <p>{address.mobile}</p>
                      {address.addressType !== "" && (
                        <span
                          className={`${
                            address.addressType ? "p-1" : ""
                          } bg-slate-100 font-normal uppercase text-xs`}
                        >
                          {address.addressType}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <p>
                        {address.address}, {address.city}, {address.state} -{" "}
                        <span className="font-bold">{address.pincode}</span>
                      </p>
                    </div>
                  </>
                );
              }}
            />
          )}
        </>
      </Modal>
    </>
  );
}

export default Cart;
