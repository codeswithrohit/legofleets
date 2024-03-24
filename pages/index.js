import React, { useState,useRef,useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Saftey from '@/components/Saftey';
import Services from '@/components/Services';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { useRouter } from 'next/router';
import TabsPage from '@/components/Tabs';
import Link from 'next/link';
const placesLibrary = ['places'];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageList = [
   
    {
      id: 1,
      imageUrl: "1.png",
      link: "/",
      linkName: "Link 1",
    },
    {
      id: 2,
      imageUrl: "2.png",
      link: "/",
      linkName: "Link 2",
    },
    {
      id: 3,
      imageUrl: "3.png",
      link: "/",
      linkName: "Link 3",
    },
    
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change the interval as needed

    return () => clearInterval(intervalId);
  }, [currentImageIndex]);
  return (
    <div className="min-h-screen bg-white relative">
        <section  className="bg-cover bg-center py-2  flex justify-center items-center">
  <div  className=" px-0">
    {/* Left Column - Image Slider */}
    <Link href={imageList[currentImageIndex].link} >
      <div className="lg:pr-1 px-4  ">
        <img src={imageList[currentImageIndex].imageUrl} className="h-full w-full object-cover rounded-xl" alt={`Slider Image ${currentImageIndex + 1}`} />
      </div>
    </Link>
    <div className="flex justify-center -mt-8 lg:-mt-12">
      {imageList.map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 lg:w-4 lg:h-4 mx-1 rounded-full cursor-pointer ${index === currentImageIndex ? 'bg-red-600' : 'bg-gray-300'}`}
          onClick={() => handleDotClick(index)}
        />
      ))}
    </div>
  </div>
</section>

     <TabsPage/>
      <Saftey />
      <Services />
      {/* Rest of your content */}
    </div>
  );
};

export default Hero;