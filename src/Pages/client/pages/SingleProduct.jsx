import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useLocalStorageState from "use-local-storage-state";

import "react-toastify/dist/ReactToastify.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

import { getDocument } from "../../../Helpers/firebaseHelper";
import styles from "../styles/SingleProduct.module.css";
// import { addToCart } from "../../../Redux/Cart/cart.actions";

function SingleProduct() {
  const { id, products } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [cart, setCart] = useLocalStorageState("cart", {
    cart: []
  });
  const [quantity, setQuantity] = useState(1);

  const cartItem = useSelector((store) => {
    return store.cartReducer.cart;
  });

  useEffect(() => {
    getDocument("products", id).then((data) => {
      setData(data);
    });
  }, [id]);

  const handleAddToCart = () => {
    toast.info("Added to Cart!");
    // dispatch(addToCart({ ...data }));
  };

  console.log("cart", cart);

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

  const isInCart = (productId) => Object.keys(cart || {}).includes(productId);

  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <div className={styles.leftDiv}>
          <div className={styles.sliderBox}>
            <img src={data?.image} alt="img1" />
          </div>
          <div className={styles.about}>
            <div className={styles.aboutProduct}>
              <p>About Product</p>
            </div>
            <div className={styles.ulStyle}>
              <ul>
                {/* <li>Shelf Life : 72 hours</li>
                <li>Shelf Life : 72 hours</li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.rightDiv}>
          <div className={styles.details}>
            <div className={styles.section}>
              <p>
                Home {">"} {products} {">"} {data.title}
              </p>
            </div>
            <div className={styles.title}>
              <p>{data.name}</p>
            </div>
            <div className={styles.weight}>
              <p>{data.weight}</p>
            </div>
            <div className={styles.prices}>
              <div className={styles.price}>
                ₹
                {data.price2 ||
                  data.price - (data.price * data?.discount) / 100}
              </div>
              <div className={styles.price2}>
                <s>
                  ₹
                  {data.price ||
                    data.price - (data.price * data?.discount) / 100}
                </s>
              </div>
              <div className={styles.discount}>
                {data.discount} {data.discountType} Off
              </div>
            </div>
            <div className="flex items-center gap-5 mt-2">
              <div className={styles.addBtn}>
                <button
                  // isDisabled={isInCart(data?.id)}
                  onClick={() => addToCart(data, quantity)}
                >
                  Add
                </button>
              </div>
              <div className={"flex"}>
                <button
                  onClick={() => {
                    setQuantity((prev) => {
                      addToCart(data, prev - 1);
                      return prev - 1;
                    });
                  }}
                  type="button"
                  className="bg-slate-300 px-2 disabled:cursor-not-allowed disabled:text-gray-400"
                  disabled={quantity === 1}
                >
                  -
                </button>
                <p className="outline-0 w-7 px-2">{quantity}</p>
                <button
                  onClick={() => {
                    setQuantity((prev) => {
                      addToCart(data, prev + 1);
                      return prev + 1;
                    });
                  }}
                  type="button"
                  className="bg-slate-300 px-2  disabled:cursor-not-allowed disabled:text-gray-400"
                  disabled={quantity === Number(data?.limit)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className={styles.howWorks}>
            <p className={styles.howPTag}>How it Works</p>
            <div>
              <div className={styles.workBorder}>
                <img
                  src="https://cdn.zeptonow.com/mweb-prod/images/pdp/place-order.svg"
                  alt="works"
                />
              </div>
              <div>
                <p className={styles.p1}>Place an order</p>
                <p className={styles.p2}>
                  Choose from a wide range of daily essentials
                </p>
              </div>
            </div>
            <div>
              <div className={styles.workBorder}>
                <img
                  src="https://cdn.zeptonow.com/mweb-prod/images/pdp/do-not-blink.svg"
                  alt="works"
                />
              </div>
              <div>
                <p className={styles.p1}>Don’t Blink</p>
                <p className={styles.p2}>
                  Our delivery partner will be at your door
                </p>
              </div>
            </div>
            <div>
              <div className={styles.workBorder}>
                <img
                  src="https://cdn.zeptonow.com/mweb-prod/images/pdp/enjoy.svg"
                  alt="works"
                />
              </div>
              <div>
                <p className={styles.p1}>Enjoy</p>
                <p className={styles.p2}>
                  Boom! You’ll never have to wait for groceries again
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
