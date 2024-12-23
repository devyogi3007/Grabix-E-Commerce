import React, { useEffect, useState } from 'react';
import AllCategories from '../components/AllCategories';
import ProductDetails from '../components/ProductDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../Redux/Products/products.actions';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Filter from '../components/Filter';
import ProductLoading from '../components/LoadingComponent/ProductLoading';
import CategoryLoading from '../components/LoadingComponent/CategoryLoading';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../admin/firebase';

function AllProducts() {
  // const dispatch = useDispatch();

  const { products } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(searchParams.get('page') || 1);
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({ id: '' });
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  // const isLoading = useSelector((store) => {
  //   return store.productReducer.isLoading;
  // });

  // const prod = useSelector((store) => {
  //   return store.productReducer.products;
  // });

  const fetchusersList = async () => {
    await getDocs(collection(db, 'users')).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setUsers(newData);
    });
  };

  const fetchProductsList = async () => {
    setIsLoading(true);
    await getDocs(collection(db, 'products')).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setData(newData);
      setIsLoading(false);
    });
    setIsLoading(false);
  };

  // const disabledVendors = users.filter(user => user.status === false || !user.status)

  const fetchActiveVendorProducts = async () => {
    setIsLoading(true);
    try {
      // Step 1: Fetch all active vendors (status: true)
      const vendorsQuery = query(
        collection(db, 'users'),
        where('status', '==', true),
      );
      const vendorsSnapshot = await getDocs(vendorsQuery);

      if (vendorsSnapshot.empty) {
        console.log('No active vendors found.');
        return;
      }

      // Extract vendor IDs
      const activeVendorIds = vendorsSnapshot.docs.filter((user) => user.role?.id !== 1).map((doc) => doc.id);

      console.log('Active Vendor IDs: ', activeVendorIds);

      // Step 2: Fetch products for active vendors
      const productsQuery = query(
        collection(db, 'products'),
        where('vId', 'in', activeVendorIds) // Use the 'in' operator
      );
      const productsSnapshot = await getDocs(productsQuery);

      if (productsSnapshot.empty) {
        console.log('No products found for active vendors.');
        return;
      }

      // Process and log products
      const products = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(products);
      console.log('Products for active vendors: ', products);
      setIsLoading(false);
      return products; // Return the products if needed elsewhere
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching products: ', error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    // fetchProductsList();
    // fetchusersList();
    fetchActiveVendorProducts();
  }, []);

  console.log(users.filter((user) => user.status === false || !user.status));

  // const data = data.filter((product) => {
  //   const user = users.find((user) => user.id === product.vId);
  //   return user ? user.status !== false : true; // Include product only if user status is not false
  // });

  const handleSort = (e) => {
    // console.log(e.target.value);
    setSort(e.target.value);
  };

  const [categories, setCategories] = React.useState([]);

  const fetchCategoriesList = async () => {
    // setLoading(true);
    await getDocs(collection(db, 'categories')).then((querySnapshot) => {
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

  const filteredDataByCategory = (data || [])?.filter(
    (item) =>
      item?.categoryId === category?.id ||
      item.parentCategoryId === category?.id
  );

  // console.log(category, categories);

  return (
    <div className=''>
      <div className='flex flex-row'>
        {/* {isLoading ? (
          <>
            <CategoryLoading />
            <div className="flex flex-row flex-wrap pb-20 w-auto mt-[90px]">
              {[...Array(15).keys()].map((item) => {
                return <ProductLoading />;
              })}
            </div>
          </>
        ) : (
          <div className="flex flex-row">
            <div className="w-full">
              <AllCategories />
              <Filter />
            </div>
            <div className="pt-5 flex flex-col justify-center items-center">
              <div className="flex flex-row justify-between w-[100%] pr-[50px]">
                <div className="text-2xl font-semibold pb-[20px] ml-6">
                  {products} ({totalCount})
                </div>
                <div>
                  <select
                    className=" px-4 py-2"
                    onChange={handleSort}
                    value={sort}
                  >
                    <option className="hover:bg-blue-400" value="asc">
                      Price: Low to High
                    </option>
                    <option value="desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
              <div>
                <ProductDetails data={prod} />
              </div>
              <div></div>
            </div>
          </div>
        )} */}
        {isLoading && (
          <>
            <CategoryLoading />
            <div className='flex flex-row flex-wrap pb-20 w-auto mt-[90px]'>
              {[...Array(15).keys()].map((item) => {
                return <ProductLoading />;
              })}
            </div>
          </>
        )}
        {!isLoading && (
          <div className='flex w-full'>
            <div className='w-[25%] flex flex-col border-r mx-3'>
              <AllCategories route={products} setCategory={setCategory} />
              <Filter />
            </div>
            <div className='pt-5 w-full flex flex-col items-center'>
              <div className='flex flex-row justify-between w-full'>
                <div className='text-2xl font-semibold pb-[20px]'>
                  {products ? products : 'All Products'} (
                  {category?.id === ''
                    ? (data || []).length
                    : filteredDataByCategory?.length}
                  )
                </div>
                <div>
                  <select
                    className=' px-4 py-2'
                    onChange={handleSort}
                    value={sort}
                  >
                    <option className='hover:bg-blue-400' value='asc'>
                      Price: Low to High
                    </option>
                    <option value='desc'>Price: High to Low</option>
                  </select>
                </div>
              </div>
              <div className='w-full'>
                <ProductDetails
                  data={
                    category?.id === '' ? data || [] : filteredDataByCategory
                  }
                  route={products}
                  category={category}
                  categories={categories}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='flex w-full justify-center items-center'>
        <div>
          {[...Array(Math.ceil((data ? data?.length : 0) / 15)).keys()].map(
            (item) => {
              return (
                <button
                  key={item + 1}
                  onClick={() => {
                    setPage(item + 1);
                  }}
                  className='bg-white border-2 border-[#F61571] hover:bg-[#F61571] px-3 py-2  hover:text-white rounded-lg ml-1 text-[#F61571]'
                >
                  {item + 1}
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
