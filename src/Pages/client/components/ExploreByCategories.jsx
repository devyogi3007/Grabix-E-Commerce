import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  ebgrocery,
  ebcfruitsandvege,
  ebcpackagedfood,
  ebcfrozenfood,
  ebcmasala,
  ebcsweet
  // ebcpaan,
  // ebcbath,
  // ebcbiscuits,
  // ebcbreakfast,
  // ebccleaning,
  // ebccolddrink,
  // ebcdairy,
  // ebcelectricals,
  // ebchealth,
  // ebchomegrown,
  // ebchomeneeds,
  // ebchygiene,
  // ebcmakeup,
  // ebcmeat,
  // ebcmuni,
  // ebctea,
} from "../assets";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../admin/firebase";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const ExploreByCategories = () => {
  const [categories, setCategories] = React.useState([]);

  const fetchCategoriesList = async () => {
    await getDocs(collection(db, "categories")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setCategories(newData);
    });
  };

  const sliderLeft = () => {
    const slider = document.getElementById("slider5");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const sliderRight = () => {
    const slider = document.getElementById("slider5");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  React.useEffect(() => {
    fetchCategoriesList();
  }, []);

  // const categories = [
  //   {
  //     src: ebcfruitsandvege,
  //     alt: "img"
  //   },
  //   {
  //     src: ebgrocery,
  //     alt: "img"
  //   },
  //   {
  //     src: ebcmasala,
  //     alt: "img"
  //   },
  //   {
  //     src: ebcsweet,
  //     alt: "img"
  //   },
  //   {
  //     src: ebcfrozenfood,
  //     alt: "img"
  //   },
  //   {
  //     src: ebcpackagedfood,
  //     alt: "img"
  //   }
  // ];
  return (
    <div>
      <div className="mt-12 w-[100%] mb-8">
        <div className="flex flex-row justify-between ml-0 px-10 pb-6 sm:ml-0">
          <h2 className="text-md sm:text-xl font-semibold">Categories</h2>
          <Link
            to="/allproducts"
            className="flex flex-row justify-center items-center gap-2 font-semibold text-[#FF3269]"
          >
            See All
            <BsChevronRight />
          </Link>
        </div>
        <div className="w-full px-10 flex flex-row">
          <div className="flex justify-center items-center">
            <MdChevronLeft
              onClick={sliderLeft}
              className="text-[40px] text-black cursor-pointer opacity-50 hover:opacity-100 mt-5"
            />
          </div>
          <div
            className=" ml-1 w-full overflow-x-hidden scroll-smooth"
            id={"slider5"}
          >
            <div className="flex flex-row gap-10">
              {(categories || [])
                ?.filter((category) => category?.parentCategoryId === "0")
                ?.map((category) => (
                  <Link to={`/allproducts${category?.route}`}>
                    <div class="w-[200px] shadow h-[250px] border hover:shadow-xl rounded-sm flex flex-col justify-around cursor-pointer">
                      <div className="w-full flex justify-center">
                        <img
                          src={category?.image}
                          alt=""
                          className="w-[100px] h-[100px] mt-3 object-contain"
                          style={{ maxWidth: 350 }}
                        />
                      </div>
                      <div className="border-b" />
                      <p className="flex justify-center items-center font-bold text-[#FF3269] text-center px-2">
                        {category?.name}
                      </p>
                      {/* <div className="flex bg-neutral-50 justify-around items-center py-2">
                    <Link to={`/admin/category/edit/${category?.id}`}>
                    <p className="px-3 py-2">
                    <EditIcon />
                    </p>
                    </Link>
                    
                    <p
                    onClick={() => handleDelete(category?.id)}
                    className="px-3 py-2 cursor-pointer"
                    >
                    <DeleteIcon />
                    </p>
                    </div> */}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <MdChevronRight
              onClick={sliderRight}
              className="text-[40px] text-black cursor-pointer opacity-50 hover:opacity-100 mt-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreByCategories;
