import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../Redux/Cart/cart.actions";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
// import { GiTwoCoins } from "react-icons/gi";
import { TfiLocationPin } from "react-icons/tfi";
import { useState } from "react";
import styles from "../styles/Cart.module.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import useLocalStorageState from "use-local-storage-state";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../admin/firebase";

const arr = JSON.parse(localStorage.getItem("address")) || [];

const Payment = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useLocalStorageState("cart", {
    cart: {}
  });
  const [userAddress] = useLocalStorageState("address", {});
  const userData = useSelector((store) => {
    return store.userAuthReducer.user;
  });

  const handleRemove = (el) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.cart?.filter((item) => item.id !== el.id);
      return { cart: updatedCart };
    });
  };

  const getProducts = () => cart.cart || [];
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

  console.log({ totalDiscountedPrice, totalDiscount }, "cart total");
  function myBtn() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  // function closeSpan() {
  //   var modal = document.getElementById("myModal");
  //   modal.style.display = "none";
  // }
  window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  const handlePayment = async () => {
    const { name, address, city, mob } = userAddress;
    if (
      name.length > 4 &&
      mob.length > 9 &&
      address.length > 4 &&
      city.length > 3
    ) {
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
  console.log({ products: getProducts(), userAddress, userData });

  return (
    <>
      <div className="flex flex-col bg-[#F5F1F7] h-[100vh]">
        <div className="flex pl-[13%] pt-8 pb-5">
          <h2 className="text-[24px] font-semibold ">
            Cart ({`${totalQuantity} Item`})
          </h2>
        </div>
        <div className="flex flex-row justify-center items-center gap-x-4 ">
          <div className="overflow-y-scroll scroll-smooth h-[300px]">
            <div>
              {getProducts().map((el) => (
                <div className=" border-[1px] border-[#dbdbdb65] shadow-xl w-auto rounded-lg px-6 py-10 flex flex-row mb-3 bg-[#FFFFFF]">
                  <div className="flex flex-row">
                    <div>
                      <img src={el.image} alt="img" className="h-[70px] " />
                    </div>
                    <div className="ml-5 flex flex-col font-medium gap-y-2">
                      <div>{truncatedstring(el.name, 40)}</div>
                      <div className="flex flex-row gap-x-2">
                        <div className="font-semibold">
                          {" "}
                          ₹
                          {el.price2 ||
                            el.price - (el.price * el?.discount) / 100}
                        </div>

                        <div className="font-medium line-through">
                          ₹{el.price}
                        </div>
                      </div>
                      <div>
                        <p>quantity: {el?.quantity}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pl-60">
                    <button
                      onClick={() => handleRemove(el)}
                      className="bg-[#f61571] text-white px-4 py-2 rounded-lg flex flex-row justify-center items-center gap-x-2"
                    >
                      Remove
                      <MdDelete className="text-[20px]" />{" "}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <div className="border-[1px] border-[#dbdbdb65] shadow-xl w-auto rounded-lg px-4 py-6 flex flex-row mb-3 justify-between bg-[#FFFFFF] ">
                <div className="flex flex-col px-4 ">
                  <p className="pt-2">Total MRP</p>
                  <p className="pt-2">Discount on MRP</p>
                  <p className="pt-2 pb-2 border-b-2">Delivery Fee</p>
                  <p className="pt-2 font-bold text-[18px]">Total Amount</p>
                </div>
                <div className="flex flex-col px-4 text-[#7a7a7a]">
                  <p className="pt-2">₹{totalMRP}</p>
                  <p className="pt-2">-₹{totalDiscount}</p>
                  <p className="pt-2 pb-2 border-b-2">rate</p>
                  <p className="pt-2 text-black font-bold text-[18px]">
                    ₹{totalPrice}
                  </p>
                </div>
              </div>

              <div className="border-[1px] border-[#dbdbdb65] shadow-xl w-auto rounded-lg px-4 py-8 flex flex-col mb-3 justify-center items-center bg-[#FFFFFF] ">
                {arr.length <= 0 ? (
                  <div className="text-[16px] font-medium pb-4 flex flex-row justify-center items-center gap-x-2">
                    <TfiLocationPin className="text-[30px] text-[#f61571]" />
                    <p>Enter Your Address</p>
                  </div>
                ) : (
                  <div className="px-5">
                    <div>
                      <span className="font-semibold text-[18px]">Address</span>
                      - {userAddress.name},<br />
                      {userAddress.address}, {userAddress.city},<br />
                      {userAddress.mob}
                    </div>
                    {/* <div>
                      <button className="px-5 py-2 bg-[#f61571] text-[#ffffff] rounded-md mt-3 mb-4" onClick={myBtn}>CHANGE ADDRESS</button>
                    </div> */}
                  </div>
                )}
                {arr.length <= 0 ? (
                  <button
                    id="myBtn"
                    className={styles.addressBtn}
                    onClick={myBtn}
                  >
                    Add Address to proceed
                  </button>
                ) : (
                  <button
                    id="myBtn"
                    className="px-4 py-2 text-white bg-[#f61571] rounded-md mt-2 mb-4"
                    onClick={handlePayment}
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
