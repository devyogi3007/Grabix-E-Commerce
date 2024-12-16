import React from "react";
import { useParams } from "react-router-dom";
import { formatter, getDocument } from "../../../../Helpers/firebaseHelper";
import { Chip, ListItem, Paper } from "@mui/material";

const ProductOverView = () => {
  const { productId } = useParams();
  const [data, setData] = React.useState();

  //   const getDataFromDb = React.useCallback((productId) => {}, []);

  console.log(data);

  React.useEffect(() => {
    getDocument("products", productId).then((data) => setData(data));
  }, [productId]);

  return (
    <div className="p-5">
      <p className="text-[#7451f8] h-full font-bold text-xl mb-5">
        Product Overview
      </p>
      <div className="px-5 h-full flex">
        <div className="h-full">
        {!data?.image && (
           <></>
          )}
          {data?.image && (
            <img
              src={data?.image || ""}
              alt=""
              className="h-[200px] mx-2 w-[200px] object-contain shadow-md flex items-center justify-center"
              style={{ marginTop: 20, maxWidth: 350 }}
            />
          )}
          {!data?.images?.length && (
            <div className="h-[200px] mx-2 w-[200px] border-2 shadow-md flex items-center justify-center">
              <p className="text-[#7551f88e]">Product Image</p>
            </div>
          )}
          {data?.images && data?.images?.map(image => (
            <img
              src={image?.data || ""}
              alt=""
              className="h-[200px] mx-2 w-[200px] object-contain shadow-md flex items-center justify-center"
              style={{ marginTop: 20, maxWidth: 350 }}
            />
          ))}
        </div>
        <div className="w-full border-l">
          <p className="text-[#7451f8] border-b px-2 text-xl pb-3 ">Details</p>
          <div className="my-3 h-[calc(100vh_-_15rem)] overflow-scroll">
            {Object.keys(data || {})
              .sort((a, b) => {
                if (a === "name") return -1; // "name" comes first
                if (b === "name") return 1; // "name" comes first
                return a.localeCompare(b); // Alphabetical sort for the rest
              })
              .map((item) => {
                if (item === "images") return <></>;
                if (item === "image") return <></>;
                if (item === "parentCategoryId") return <></>;
                if (item === "categoryName") return <></>;
                if (item === "parentCategoryName") return <></>;
                if (item === "tags")
                  return (
                    <div className="flex w-full pr-3">
                      <p className="text-gray-400 my-4 px-2">
                        {item
                          .split("")
                          .map((char, index) =>
                            index === 0 ? char.toUpperCase() : char
                          )
                          .join("")}
                        :
                      </p>
                      <Paper
                        className="flex px-3 items-center gap-3 w-full"
                        component="ul"
                      >
                        {data?.tags?.map((tag, i) => {
                          return (
                            <li className="p-0 m-0 bg-gray-200 text-sm rounded-lg px-3">
                              {tag}
                            </li>
                          );
                        })}
                      </Paper>
                    </div>
                  );
                if (item === "categoryId")
                  return (
                    <>
                      <p className="text-gray-400 my-4 px-2">
                        Category :
                        {data?.parentCategoryName && (
                          <span className="text-[#7451f8] mx-3">
                            {data?.parentCategoryName} / {data?.categoryName}
                          </span>
                        )}
                        {!data?.parentCategoryName && (
                          <span className="text-[#7451f8] mx-3">
                            {data?.categoryName}
                          </span>
                        )}
                      </p>
                    </>
                  );
                return (
                  <p className="text-gray-400 my-4 px-2">
                    {item
                      .split("")
                      .map((char, index) =>
                        index === 0 ? char.toUpperCase() : char
                      )
                      .join("")}
                    :<span className="text-[#7451f8] mx-3">{data?.[item]}</span>
                  </p>
                );
              })}
          </div>
          {/* <p className="text-gray-400 my-4 px-2">
            Product Price:
            <span className="text-[#7451f8] mx-3">
              {formatter.format(data?.price || 0)}
            </span>
          </p>
          <p className="text-gray-400 my-4 px-2">
            Product Category:
            <span className="text-[#7451f8] mx-3">{data?.category}</span>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default ProductOverView;
