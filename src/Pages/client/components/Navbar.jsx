import React from 'react';
import { logo } from '../assets';
import { BsCart3 } from 'react-icons/bs';
import { FaRegUser } from "react-icons/fa";
import { MdLocationOn } from 'react-icons/md';
import { BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DeliveryLocation from './DeliveryLocation';
import MenuDropdown from './MenuDropdown';
import SearchComponent from './SearchComponent';
import useLocalStorageState from 'use-local-storage-state';
import { Button } from "@mui/material";

const Navbar = () => {
  const [cart, setCart] = useLocalStorageState('cart', {
    cart: []
  });

  const userData = useSelector((store) => {
    return store.userAuthReducer.user;
  });

  const cartItem = () => cart?.cart || [];
  let value = 0;
  let offerValue = 0;

  cartItem().map((el) => {
    offerValue += Number(el.price);
    return (value = value + Number(el.price2));
  });
  // eslint-disable-next-line no-unused-vars
  const finalAmount = offerValue;
  offerValue = value - offerValue;

  // console.log(cartItem(),"dd");

  const id = userData?.uid;
  // const getProducts = () => Object.values(cart || {});
  const totalQuantity = cartItem().length;

  return (
    <>
      <div className=' z-10 bg-[#2b69bc] sticky top-0 flex gap-3 h-[80px] w-full items-center overflow-hidden'>
        <div className='flex flex-row items-center gap-3 w-2/4'>
          <Link to='/' className='w-1/3 h-full object-cover'>
            <img src={logo} alt='logo' className='w-full object-cover' />
          </Link>
          <div className='h-[30px] w-[3px] bg-[#c6c6c6b8] rounded-xl ml-4'></div>
          <p className='text-[#f8d210] text-lg flex items-center gap-1'>
            <MdLocationOn className='text-[#f8d210]' />
            <DeliveryLocation />
          </p>
        </div>
        <SearchComponent
          data={[
            'Apple',
            'Banana',
            'Cherry',
            'Date',
            'Elderberry',
            'Fig',
            'Grape'
          ]}
        />
        <Link to='/cart'>
          {cartItem().length <= 0 ? (
            <BsCart3 className='text-[24px] hover:text-white text-[#f8d210] mr-3' />
          ) : (
            <div>
              <button
                class='py-4 px-1 relative border-2 border-transparent rounded-full'
                aria-label='Cart'
              >
                <BsCart3 className='text-[24px] hover:text-white mr-3 text-[#f8d210] ' />
                <span class='absolute inset-0 object-right-top -mr-6'>
                  <div class='inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white'>
                    {totalQuantity}
                  </div>
                </span>
              </button>
            </div>
          )}
        </Link>
        {!id ? (
          <Link
            to='/login'
            className='text-[#0A1408] font-semibold hidden sm:flex'
          >
            Login
          </Link>
        ) : (
          <Link
            to='/account'
            className=''
          >
            <FaRegUser className="text-[24px] hover:text-white text-[#f8d210] ms-3 me-7"/>
          </Link>

        )}

        <BiUser className='flex sm:hidden text-[#0A1408] text-[20px] font-semibold cursor-pointer' />
      </div>
    </>
  );
};

export default Navbar;
