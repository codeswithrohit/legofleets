import TabsPage from '@/components/Tabs';
import Testimonial from '@/components/Testimonial';
import React from 'react';
import { useRouter } from 'next/router';
const Home = () => {
  const router = useRouter();
  const { query } = router;
  const activeTab = parseInt(query.activeTab) || 0;
  const selectedPackage = parseInt(query.selectedPackage) || null;

  return (
    <div className='bg-white' >
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-4xl text-[#541e50] font-bold mb-2">Welcome to LEGOFLEETS</h1>
      <p className="text-lg text-gray-700  text-justify">
        Discover the ease of travel with LEGOFLEETS, your go-to car rental service for seamless journeys between Pune and Mumbai airports, as well as local and national destinations. Our diverse fleet of well-maintained, modern cars ensures your comfort and convenience. With over two decades of experience, we guarantee reliable, safe, and punctual transportation. Whether its a short trip or an extended journey, our professional drivers provide a hassle-free and enjoyable experience. Prioritizing customer satisfaction, LEGOFLEETS offers transparent pricing, easy online reservations, and exceptional support, making car rental a breeze. Choose LEGOFLEETS for a reliable and delightful travel experience.
      </p>
    </div>
    
    <TabsPage activeTab={activeTab} selectedPackage={selectedPackage} />
    <Testimonial/>
    </div>
  );
};

export default Home;
