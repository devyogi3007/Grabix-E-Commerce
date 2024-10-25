import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/Cart/cart.actions";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import useLocalStorageState from "use-local-storage-state";

function ProductCard({ data }) {
  const dispatch = useDispatch();

  const [cart, setCart] = useLocalStorageState("cart", {});
  const truncatedstring = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const handleAddToCart = () => {
    toast.info("Add to Cart!");
    // dispatch(addToCart(data));
  };
  const addToCart = (product) => {
    // product.quantity = 1;

    // setCart((prevCart) => {
    //   let sameProduct = (prevCart.cart || [])?.find(
    //     (item) => item.id === product.id
    //   );
    //   console.log(sameProduct);
    //   if (prevCart.cart) {
    //     return { cart: [...prevCart.cart, product] };
    //   }
    //   return { cart: [product] };
    // });
    setCart(({ cart = [] }) => {
      // Check if product already exists in the cart
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
        // If product exists, update quantity
        return cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        // If product doesn't exist, add it to the cart
        return [...cart, product];
      }
    });
  };

  const isInCart = (productId) => Object.keys(cart || {}).includes(productId);

  return (
    <>
      <div className="flex flex-col justify-center items-center my-5 w-[240px] h-[50%] relative">
        <div className="mb-8">
          <img
            src={data.image}
            alt="img"
            className="h-[170px] object-contain"
          />
        </div>
        <div className="absolute rounded-tl-full rounded-tr-[50%] rounded-bl-full rounded-br-full font-semibold bg-[#f61571] text-white px-4 py-2 top-[-20px] left-[150px] text-[15px] ">
          {data.discount}
          {data.discountType} Off
        </div>

        <div>
          <div className=" h-[82px] mb-4">
            <div className="font-medium py-1 px-4">
              {truncatedstring(data.title, 40)}
            </div>
            <div className="text-slate-500 text-base py-1 px-4">
              {data.name}
            </div>
          </div>
          <div className="flex flex-row justify-around gap-8 mt-6 px-4 ">
            <div className="flex flex-col">
              <div className="line-through">₹{data.price}</div>
              <div className="font-medium">
                ₹
                {data.price2 ||
                  data.price - (data.price * data?.discount) / 100}
              </div>
            </div>
            <button
              onClick={() => addToCart(data)}
              className="border-2 border-[#FF3269] px-7 rounded-md shadow-xl text-[#FF3269] font-medium"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
