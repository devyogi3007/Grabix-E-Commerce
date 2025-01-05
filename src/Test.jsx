/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Slide } from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import Banner1 from './Pages/client/assets/banner1.webp'
import Banner2 from './Pages/client/assets/banner2.webp'
import Banner3 from './Pages/client/assets/banner3.webp'

const Test = () => {
  return (
    <div>
      <Carousel className="flex flex-col justify-center items-center" width={'50%'}>
        <div>
          <img src={Banner1} className="w-[50%] h-1/2 object-contain"/>
        </div>
        <div>
          <img src={Banner2} className="w-[50%] h-1/2 object-contain"/>
        </div>
        <div>
          <img src={Banner3} className="w-[50%] h-1/2 object-contain"/>
        </div>
      </Carousel>
    </div>
  );
};

export default Test;
