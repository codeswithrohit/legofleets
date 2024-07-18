import { useState, useEffect, useRef } from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { useRouter } from 'next/router';
const placesLibrary = ['places'];
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PuneLocal from './PuneLocal';
import MumbaiLocal from './MumbaiLocal';
import PuneNational from './PuneNational';
import MumbaiNational from './MumbaiNational';
import AirportServices from './AirportServices';
import PuneMumbai from './PuneMumbai';

const TabsComponent = ({ items, selectedPackage, activeTab }) => {
  const [selectedTab, setSelectedTab] = useState(selectedPackage || 0);
  const firstBtnRef = useRef(null);

  useEffect(() => {
    if (selectedPackage) {
      // Find the index of the selected package in the items array
      const selectedIndex = items.findIndex((item) => item.title === selectedPackage);
      if (selectedIndex !== -1) {
        setSelectedTab(selectedIndex);
      }
    } else {
      // Check if the reference exists before calling focus
      if (firstBtnRef.current) {
        firstBtnRef.current.focus();
      }
    }
  }, [selectedPackage, activeTab]);

  return (
    <div className='flex justify-center items-center bg-white '>
      <div className='max-w-full flex flex-col w-full'>
        {/* <h2 style={{ color: '#541e50' }} className="text-center font-bold text-3xl  mb-4">Find Your Ideal Car</h2> */}
        <div className='grid grid-cols-3 md:grid-cols-6 px-0 md:px-48 md:mt-0'>
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                onClick={() => setSelectedTab(index)}
                className={`outline-none w-full h-12 mb-2 md:p-0 p-2 rounded-none  flex items-center justify-center border-r-2  ${
                  selectedTab === index ? 'bg-[#541e50] text-white' : 'bg-gray-500 text-white'
                }`}
                ref={index === 0 ? firstBtnRef : null}
              >
                <span className=" text-center text-white md:text-sm text-xs font-bold">{item.title}</span>
              </button>
              <div className={`hidden md:block w-full h-4 ${selectedTab === index ? 'bg-[#541e50]' : 'bg-transparent'}`}></div>
            </div>
          ))}
        </div>

        <div className="md:mt-8 px-0 md:px-0">
          {items.map((item, index) => (
            <div key={index} className={`${selectedTab === index ? '' : 'hidden'}`}>
              {index === 0 && <AirportServices />}
              {index === 1 && <PuneMumbai />}
              {index === 2 && <PuneLocal />}
              {index === 3 && <MumbaiLocal />}
              {index === 4 && <PuneNational />}
              {index === 5 && <MumbaiNational />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TabsPage = ({ selectedPackage, activeTab }) => {
  return (
    <div className='rounded-none mx-4 px-4'>
      <br />

      {/* Tabs Component */}
      <TabsComponent selectedPackage={selectedPackage} activeTab={activeTab} items={items} />
    </div>
  );
};

export default TabsPage;

const items = [
  {
    title: 'AirPort Services',
  },
  {
    title: 'Pune <=> Mumbai',
  },
  {
    title: 'Pune Local',
  },
  {
    title: 'Mumbai Local',
  },
  {
    title: 'Pune National',
  },
  {
    title: 'Mumbai National',
  },
];
