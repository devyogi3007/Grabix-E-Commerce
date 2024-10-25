import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../admin/firebase";

function ProductDetails({ data, route, categories }) {
  return (
    <>
      <div className="flex flex-wrap gap-5 pb-20 w-full">
        {(data || [])?.map((el, id) => (
          <>
            <Link
              to={`${
                route === undefined
                  ? `/allproducts${
                      categories?.find(
                        (item) =>
                          item?.id === el?.categoryId ||
                          item?.id === el?.parentCategoryId
                      )?.route
                    }/${el.id}`
                  : el.id
              }`}
              key={id}
            >
              <div className="border-[1px] border-[#b9b9b971] relative">
                <ProductCard key={id} data={el} />
              </div>
            </Link>
          </>
        ))}
      </div>
    </>
  );
}

export default ProductDetails;
