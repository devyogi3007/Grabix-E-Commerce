import React from 'react';
import { logo } from '../assets';
import {
  //  category,
  socialmedia
} from '../constant/data';
// import { AiFillApple } from "react-icons/ai";
import { BsGooglePlay } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Subscribe with email', path: '/subscribe' },
    { name: 'Become a Supplier', path: '/store/apply' },
    { name: 'Customer Support', path: '/support' },
    { name: 'Become a delivery Partner', path: '/delivery-partner' },
    { name: 'Careers', path: '/careers' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Use', path: '/terms' },
    { name: 'About Us', path: '/about' },
    { name: 'Cancellation Policy', path: '/cancellation-policy' },
    { name: 'Cities', path: '/cities' }
  ];
  return (
    <div className='w-full px-8 md:pl-32 pt-4 md:pt-10'>
      <div className='flex flex-col md:flex-row gap-x-32'>
        <div className=''>
          <img src={logo} alt='logo' className='w-[250px]' />
          <div className='flex flex-row gap-4 mt-6'>
            {socialmedia.map((socialmed, id) => (
              <div
                className='text-[20px] text-slate-600'
                key={id}
                onClick={() => window.open(socialmed.link)}
              >
                {socialmed.icon}
              </div>
            ))}
          </div>
          <p className='mt-5'>&#169;Designed by Wolgan</p>
        </div>
        <div className='flex flex-row gap-12 md:gap-x-12 mb-10 mt-6 md:mt-0'>
          <ul className='w-full grid grid-cols-2'>
            {footerLinks.map((link, index) => (
              <li key={index} className='mb-2 mx-3 row-span-2'>
                <Link to={link.path} className='hover:underline'>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className='mt-8'>
            <p className='mb-2'>Download App</p>
            <div className='flex flex-col gap-4 w-[400px] md:w-full '>
              <button
                className='mb-2 mt-2 border-2 px-0 md:px-10 py-3 rounded-lg flex flex-row justify-center items-center gap-4'
                onClick={() =>
                  window.open(
                    'https://play.google.com/store/apps/details?id=com.zeptoconsumerapp&pli=1'
                  )
                }
              >
                <BsGooglePlay className='text-[20px]' />
                Get it on Playstore
              </button>
              {/* <button className="mb-2 border-2 px-4 md:px-10 py-3 rounded-lg flex flex-row justify-center items-center gap-4" onClick={()=>window.open("https://apps.apple.com/in/app/zepto-grocery-delivery/id1575323645")}>
                <AiFillApple className="text-[24px]" />
                Get it on Apple Store
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
