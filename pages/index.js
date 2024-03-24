import React, { useState,useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Saftey from '@/components/Saftey';
import Services from '@/components/Services';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { useRouter } from 'next/router';
import TabsPage from '@/components/Tabs';
const placesLibrary = ['places'];

const Hero = () => {


  const images = [
    'https://img.freepik.com/premium-photo/taj-mahal-hotel-gateway-india_78361-979.jpg?w=740',
  ];

  return (
    <div className="min-h-screen relative">
      <div className="w-full h-full absolute top-0 left-0 z-[-1]">
        <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false} interval={5000}>
          {images.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} alt={`Image ${index}`} style={{ width: '100%', height: '120vh', objectFit: 'cover' }} />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="px-16">
          <h2 className="text-[40px] md:text-[60px] text-white font-bold">
          Welcome to <span style={{color:'#541e50'}} className="">LEGOFLEETS </span> 
          </h2>
          <h2 style={{color:'#541e50'}} className="text-[20px] font-semibold text-white pr-20 mt-5">Your Reliable Car Rental Partner in Pune and Mumbai</h2>
        </div>
      </div>

     <TabsPage/>
      <Saftey />
      <Services />
      {/* Rest of your content */}
    </div>
  );
};

export default Hero;