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

const arr = JSON.parse(localStorage.getItem("address")) || [];

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useLocalStorageState("cart", {
    cart: []
  });
  const [userAddress, setAddress] = useLocalStorageState("address", {});

  const [users, setUsers] = React.useState([]);

  const handleRemove = (el) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.cart?.filter((item) => item.id !== el.id);
      return { cart: updatedCart };
    });
  };

  const getProducts = React.useCallback(() => cart.cart || [], [cart.cart]);
  const totalQuantity =
    getProducts().reduce((acc, product) => acc + product.quantity, 0) || 0;

  const truncatedstring = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

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

  function myBtn() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
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

  const handlePayment = () => {
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

  // React.useEffect(() => {
  // addDataInBulk(cart);
  // getProducts().map((product) => {
  //   const docRef = updateDoc(collection(db, "cart",), {
  //     ...product,
  //     uId: userData?.uid,
  //     userAddress,
  //     orderDate: serverTimestamp(),
  //     totalPrice: product?.price * product?.quantity,
  //     totalPrice2: product?.price2 * product?.quantity
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  //   return docRef;
  // });
  // }, [cart.cart, getProducts, totalPrice, userAddress, userData?.uid]);

  return (
    // <>
    //   {getProducts().length <= 0 ? (
    //     <Empty />
    //   ) : (
    //     <div className="flex flex-col bg-[#F5F1F7] h-[100vh]">
    //       <div className="flex pl-[13%] pt-4 pb-3">
    //         <h2 className="text-[24px] font-semibold ">
    //           Cart ({`${totalQuantity} Item`})
    //         </h2>
    //       </div>
    //       <div className="flex flex-row justify-center items-center gap-x-4">
    //         <div className="">
    //           <div className="overflow-y-scroll scroll-smooth h-[300px]">
    //             {getProducts().map((el) => {
    //               return (
    //                 <div className=" border-[1px] border-[#dbdbdb65] shadow-xl w-auto rounded-lg px-6 py-10 flex flex-row justify-between mb-3 bg-[#FFFFFF] ">
    //                   <div className="flex flex-row">
    //                     <div>
    //                       <img src={el.image} alt="img" className="h-[70px] " />
    //                     </div>
    //                     <div className="ml-5 flex flex-col font-medium gap-y-2">
    //                       <div>{truncatedstring(el.name, 40)}</div>
    //                       <div className="flex flex-row gap-x-2">
    //                         <div className="font-semibold">
    //                           ₹
    //                           {el.price2 ||
    //                             el.price - (el.price * el?.discount) / 100}
    //                         </div>
    //                         <div className="font-medium line-through">
    //                           ₹{el.price}
    //                         </div>
    //                       </div>
    //                       <div>
    //                         <p>quantity: {el?.quantity}</p>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   <div className="pl-60">
    //                     <button
    //                       onClick={() => handleRemove(el)}
    //                       className="bg-[#f61571] text-white px-4 py-2 rounded-lg flex flex-row justify-center items-center gap-x-2"
    //                     >
    //                       Remove
    //                       <MdDelete className="text-[20px]" />{" "}
    //                     </button>
    //                   </div>
    //                 </div>
    //               );
    //             })}
    //           </div>
    //           <div className="border-[1px] border-[#dbdbdb65] shadow-xl w-auto rounded-lg px-6 py-8 flex flex-col mb-3 bg-[#FFFFFF]">
    //             <p className="font-semibold text-[17px]">
    //               Delivery Partner Tip
    //             </p>
    //             <p className="text-[#696969] pt-2">
    //               The entire amount will be sent to your delivery partner
    //             </p>
    //             <div className="flex flex-row gap-x-4 pt-3 ">
    //               <button className="flex flex-row justify-center items-center gap-x-1 px-3 border-2 rounded-xl border-[#f61571]">
    //                 <GiTwoCoins className="text-[#ffbf3f]" />
    //                 <span className="text-[#f61571]">₹ 10</span>
    //               </button>
    //               <button className="flex flex-row justify-center items-center gap-x-1 px-3 border-2 rounded-xl border-[#f61571]">
    //                 <GiTwoCoins className="text-[#ffbf3f]" />
    //                 <span className="text-[#f61571]">₹ 20</span>
    //               </button>
    //               <button className="flex flex-row justify-center items-center gap-x-1 px-3 border-2 rounded-xl border-[#f61571]">
    //                 <GiTwoCoins className="text-[#ffbf3f]" />
    //                 <span className="text-[#f61571]">₹ 35</span>
    //               </button>
    //               <button className="flex flex-row justify-center items-center gap-x-1 px-3 border-2 rounded-xl border-[#f61571]">
    //                 <GiTwoCoins className="text-[#ffbf3f]" />
    //                 <span className="text-[#f61571]">₹ 50</span>
    //               </button>
    //             </div>
    //           </div>
    //           <div>
    //             <div className="border-[1px] border-[#dbdbdb65] shadow-xl w-auto rounded-lg px-6 py-6 flex flex-row justify-start items-center bg-[#FFFFFF] mb-3">
    //               <img
    //                 src="https://cdn.zeptonow.com/app/images/zeptonian-riding.png"
    //                 alt="img"
    //                 className="h-[50px] mr-2"
    //               />
    //               <p>See how we ensure our delivery partner’s safety</p>
    //               <a href="/allproducts/Fruits" className="text-[#f61571] pl-2">
    //                 Learn More
    //               </a>
    //             </div>
    //           </div>
    //         </div>
    //         <div>
    //           <div className="flex flex-col">
    //             <div className="border-[1px] border-[#dbdbdb65] shadow-xl w-auto rounded-lg px-4 py-6 flex flex-row mb-3 justify-between bg-[#FFFFFF] ">
    //               <div className="flex flex-col px-4 ">
    //                 <p className="pt-2">Total MRP</p>
    //                 <p className="pt-2">Discount on MRP</p>
    //                 <p className="pt-2 pb-2 border-b-2">Delivery Fee</p>
    //                 {/* <div className="h-[1px] bg-[#7a7a7a] mt-2 w-[200px]"></div> */}
    //                 <p className="pt-2">Total Amount</p>
    //               </div>
    //               <div className="flex flex-col px-4 text-[#7a7a7a]">
    //                 <p className="pt-2">₹{totalMRP}</p>
    //                 <p className="pt-2">-₹{totalDiscount}</p>
    //                 <p className="pt-2 pb-2 border-b-2">rate</p>
    //                 <p className="pt-2 text-black">₹{totalPrice}</p>
    //               </div>
    //             </div>

    //             <div className="border-[1px] border-[#dbdbdb65] shadow-xl w-auto rounded-lg px-4 py-8 flex flex-col mb-3 justify-center items-center bg-[#FFFFFF] ">
    //               {arr.length <= 0 ? (
    //                 <div className="text-[16px] font-medium pb-4 flex flex-row justify-center items-center gap-x-2">
    //                   <TfiLocationPin className="text-[30px] text-[#f61571]" />
    //                   <p>Enter Your Address</p>
    //                 </div>
    //               ) : (
    //                 <div className="">
    //                   <div className="px-4">
    //                     <span className="font-semibold text-[18px]">
    //                       Address
    //                     </span>
    //                     - {userAddress.name}
    //                     <br />
    //                     {userAddress.address},{userAddress.city}
    //                     <br />
    //                     {userAddress.mob}"
    //                   </div>
    //                   <div>
    //                     <button
    //                       onClick={myBtn}
    //                       className="text-[#f61571] pt-3 pb-3"
    //                     >
    //                       CHANGE ADDRESS
    //                     </button>
    //                   </div>
    //                 </div>
    //               )}
    //               {arr.length <= 0 ? (
    //                 <button
    //                   id="myBtn"
    //                   className={styles.addressBtn}
    //                   onClick={myBtn}
    //                 >
    //                   Add Address to proceed
    //                 </button>
    //               ) : (
    //                 <button
    //                   id="myBtn"
    //                   className={styles.addressBtn}
    //                   onClick={handlePayment}
    //                 >
    //                   Continue To Payment
    //                 </button>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div id="myModal" className={styles.modal}>
    //         <div className={styles.modal_content}>
    //           <p>Enter Your Current Address</p>
    //           <span onClick={closeSpan} className={styles.close}>
    //             &times;
    //           </span>
    //         </div>
    //         <div className={styles.addressInputBox}>
    //           <form onSubmit={handleSubmit}>
    //             <input
    //               type="text"
    //               placeholder="Name"
    //               name="name"
    //               onChange={handleAddress}
    //               value={userAddress?.name || ""}
    //             />
    //             <input
    //               type="text"
    //               placeholder="Address"
    //               name="address"
    //               onChange={handleAddress}
    //               value={userAddress?.address}
    //             />
    //             <input
    //               type="text"
    //               placeholder="City"
    //               name="city"
    //               onChange={handleAddress}
    //               value={userAddress?.city}
    //             />
    //             <input
    //               type="text"
    //               placeholder="Mobile No."
    //               name="mob"
    //               onChange={handleAddress}
    //               value={userAddress?.mob}
    //             />
    //             <input type="submit" id={styles.submitBtn} />
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </>

    <>
      {getProducts().length <= 0 && <Empty />}
      {getProducts().length > 0 && (
        <div className="h-full bg-slate-100 w-full p-3">
          <div className="flex w-full gap-3 relative">
            <div className="flex flex-col gap-3 w-4/5">
              <div className="bg-white shadow-lg w-full flex items-center">
                <p className="text-lg ms-24 font-bold cursor-pointer text-[#f61571] border-b-2 border-[#f61571] py-4 px-28">
                  Cart <span className="">({getProducts().length})</span>
                </p>
              </div>
              <div className="bg-white shadow-lg w-full p-5 flex justify-between items-center text-sm">
                <div className="">
                  <div className="font-bold flex items-center gap-5">
                    <div>
                      <span className="font-normal">Deliver to:</span> Yogesh
                      Mehta, 390019
                    </div>
                    <span className="bg-slate-100 p-1 font-normal uppercase text-xs">
                      Home
                    </span>
                  </div>
                  <div className="text-slate-400">
                    102, Today Gift, Ghadiyali pole, Vadodara
                  </div>
                </div>
                <button className="border px-4 py-2 hover:shadow-lg">
                  Change
                </button>
              </div>
              <div className="bg-white shadow-lg w-full relative">
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
                  <button className="bg-[#f61571] text-normal text-white px-3 py-2">
                    Continue to payment
                  </button>
                </div>
              </div>
            </div>
            <div className="w-[33%]">
              <div className="bg-white shadow-lg w-full sticky top-0">
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
    </>
  );
}

export default Cart;
