import React from 'react';
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
import Testimonial from '@/components/Testimonial';

const placesLibrary = ['places'];

const Hero = () => {
  const router = useRouter();
  const { query } = router;
  const activeTab = parseInt(query.activeTab) || 0;
  const selectedPackage = parseInt(query.selectedPackage) || null;
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

  return (
    <div className="min-h-screen bg-white relative">
      <section className="bg-cover bg-center py-2 flex justify-center items-center">
        <div className="px-0 w-full ">
          {/* Carousel for sliding images */}
          <Carousel
            showThumbs={false}         // Hide thumbnail dots
            autoPlay={true}            // Enable automatic sliding
            infiniteLoop={true}        // Enable infinite loop
            interval={6000}            // Time interval between slides
            transitionTime={600}       // Slide transition speed
            showStatus={false}         // Hide current slide number
          >
            {imageList.map((image) => (
              <div key={image.id}>
                <Link href={image.link}>
                  <img src={image.imageUrl} className="h-full w-full object-cover rounded-xl" alt={`Slider Image ${image.id}`} />
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Other Components */}
      <TabsPage activeTab={activeTab} selectedPackage={selectedPackage} />
      <Saftey />
      <Testimonial/>
      <Services />
    </div>
  );
};

export default Hero;
