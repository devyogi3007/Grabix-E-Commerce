import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { Link, NavLink } from "react-router-dom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { db } from "../../admin/firebase";

function AllCategories({ setCategory, route }) {
  const [categories, setCategories] = React.useState([]);
  const [open, setOpen] = React.useState({ id: "", isOpen: false });

  const fetchCategoriesList = async () => {
    // setLoading(true);
    await getDocs(collection(db, "categories")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setCategories(newData);
      // setLoading(false);
    });
    // setLoading(false);
  };

  React.useEffect(() => {
    fetchCategoriesList();
  }, []);

  React.useEffect(() => {
    if (route) {
      setCategory(categories?.find((item) => item?.route === `/${route}`));
    }
  }, [categories, route, setCategory]);

  return (
    <div className="flex flex-col bg-white ">
      <ul className="w-full pl-5">
        {categories
          ?.filter((category) => category?.parentCategoryId === "0")
          ?.map((category) => {
            return (
              <>
                <li
                  className={`my-3 px-3 hover:bg-[#F7E4FF] border-l-4 border-[#Fff] hover:border-l-4 hover:border-[#450072] flex ${
                    `/${route}` === category?.route ||
                    categories
                      ?.filter((cat) => cat?.parentCategoryId === category?.id)
                      ?.find((item) => item?.route === `/${route}`)?.route ===
                      `/${route}`
                      ? "border-l-4 border-[#450072] bg-[#F7E4FF]"
                      : ""
                  } justify-around items-center w-full`}
                >
                  <NavLink
                    className={"flex items-center gap-3 w-full"}
                    to={`/allproducts${category?.route}`}
                    // onClick={() => setCategory(category)}
                  >
                    <img
                      src={category?.image}
                      alt="imgicon"
                      className="w-[50px] h-[50px] object-contain"
                    />
                    {category?.name}
                  </NavLink>
                  {categories?.filter(
                    (cat) => cat?.parentCategoryId === category?.id
                  )?.length > 0 && (
                    <p
                      onClick={() =>
                        setOpen((prev) => {
                          return {
                            id: prev?.id === category?.id ? 0 : category?.id
                          };
                        })
                      }
                      className="ml-5"
                    >
                      <ExpandMoreIcon />
                    </p>
                  )}
                </li>
                {open.id === category?.id && (
                  <ul className="w-full pl-10">
                    {categories
                      ?.filter((cat) => cat?.parentCategoryId === category?.id)
                      ?.map((subCategory) => (
                        <li
                          className={`my-3 px-3 hover:bg-[#F7E4FF] border-l-4 border-[#Fff] hover:border-l-4 hover:border-[#450072] ${
                            `/${route}` === subCategory?.route
                              ? "border-l-4 border-[#450072] bg-[#F7E4FF]"
                              : ""
                          } w-full`}
                        >
                          <Link
                            className="flex items-center gap-3"
                            to={`/allproducts${subCategory?.route}`}
                            // onClick={() => setCategory(subCategory)}
                          >
                            <img
                              src={subCategory?.image}
                              alt="imgicon"
                              className="w-[50px] h-[50px] object-contain"
                            />
                            {subCategory?.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </>
            );
          })}
      </ul>
    </div>
  );
}

export default AllCategories;
