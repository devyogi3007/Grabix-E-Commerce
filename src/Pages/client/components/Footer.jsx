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
    { name: 'Become a Supplier', path: '/store/apply', type: 'route' },
    { name: 'Customer Support', path: 'support@grabix.in', type: 'email' },
    // { name: 'Careers', path: '/careers' },
    { name: 'Privacy Policy', path: '/privacy-policy', type: 'route' },
    { name: 'Terms of Use', path: '/terms', type: 'route' },
    { name: 'About Us', path: '/about' },
    { name: 'Cancellation Policy', path: '/cancellation-policy', type: 'route' }
    // { name: 'Cities', path: '/cities', type: 'route' }
  ];
  return (
    <div className='w-full px-8 md:pl-32 pt-4 md:pt-10'>
      <div className='flex flex-col md:flex-row gap-x-32'>
        <div className=''>
          <div className='w-1/3 h-1/4 object-cover'>
            <img src={logo} alt='logo' className='w-full h-full object-cover rounded' />
          </div>
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
          <p className='mt-5'>
            &#169;&nbsp; <b>GRABIX TECHSOLUTIONS PVT LTD</b>
          </p>
        </div>
        <div className='flex flex-row gap-12 md:gap-x-12 mb-10 mt-6 md:mt-0'>
          <ul className='w-full grid grid-cols-2'>
            {footerLinks.map((link, index) => {
              if (link.type === 'email') {
                return (
                  <li key={index} className='mb-2 mx-3 row-span-2'>
                    <a href={`mailto:${link.path}`} className='hover:underline'>
                      {link.name}
                    </a>
                  </li>
                );
              }
              return (
                <li key={index} className='mb-2 mx-3 row-span-2'>
                  <a href={link.path} className='hover:underline'>
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
