import { useState, useEffect, useRef } from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { useRouter } from 'next/router';
const placesLibrary = ['places'];
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const locations = [
    { label: 'Mumbai', value: 'Mumbai' },
    { label: 'Pune', value: 'Pune' },
    // Add more locations as needed
  ];
const TabsComponent = ({ items }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const firstBtnRef = useRef(null); // Initialize the ref with null
  
    useEffect(() => {
      // Check if the reference exists before calling focus
      if (firstBtnRef.current) {
        firstBtnRef.current.focus();
      }
    }, []);
  
    const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const autocompletePickupRef = useRef();
  const autocompleteDropoffRef = useRef();



  /* for 1st tab */ 


  const handlePickupChange = (e) => {
    setPickupLocation(e.target.value);
  };

  const handleDropoffChange = (e) => {
    setDropoffLocation(e.target.value);
  };

  const handleAirportSearch = () => {
    // Navigate to AirportPage and pass the selected data as props

  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB6gEq59Ly20DUl7dEhHW9KgnaZy4HrkqQ',
    libraries: placesLibrary,
  });

  
  const onLoadPickup = (autocomplete) => {
    autocompletePickupRef.current = autocomplete;
  };

  const onLoadDropoff = (autocomplete) => {
    autocompleteDropoffRef.current = autocomplete;
  };

  const onPlaceChanged = (isPickupLocation) => {
    const autocomplete = isPickupLocation ? autocompletePickupRef.current : autocompleteDropoffRef.current;
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        if (isPickupLocation) {
          setPickupLocation(place.formatted_address);
        } else {
          setDropoffLocation(place.formatted_address);
        }
      }
    }
  };
 

  const handleSearch = () => {
    if (pickupLocation.trim() !== '' && dropoffLocation.trim() !== '') {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [pickupLocation],
          destinations: [dropoffLocation],
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK' && response.rows && response.rows.length > 0 && response.rows[0].elements && response.rows[0].elements.length > 0) {
            const { distance, duration } = response.rows[0].elements[0];
            if (distance && duration) {
              setDistance(distance.text || '');
              setDuration(duration.text || '');
              console.log('Distance:', distance.text);
              console.log('Duration:', duration.text);

              // Redirect to the booking page with the necessary data
              
              router.push(`/booking?pickupLocation=${pickupLocation}&dropoffLocation=${dropoffLocation}&distance=${distance.text}&duration=${duration.text}&pickupDate=${startDate}`);
            }
          } else {
            console.log('Error:', status);
          }
        }
      );
    } else {
      console.log('Please enter both pickup and drop-off locations.');
    }
  };
  
  

  
  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';
  
    return (
      <div className='flex justify-center items-center py-12'>
        <div className='max-w-full flex flex-col gap-y-2 w-full'>
        <h2 className="text-center text-3xl text-white mb-4">Find Your Ideal Car</h2>
          <div className='bg-blue-400 mx-24 p-1 rounded-xl flex justify-between items-center gap-x-2 font-bold text-white'>
            {items.map((item, index) => (
              <button
                ref={index === 0 ? firstBtnRef : null}
                key={index}
                onClick={() => setSelectedTab(index)}
                className={`outline-none w-full p-2 hover:bg-blue-300 rounded-xl text-cneter focus:ring-2 focus:bg-white focus:text-blue-600 ${
                  selectedTab === index ? 'ring-2 bg-white text-blue-600' : ''
                } `}
              >
                {item.title}
              </button>
            ))}
          </div>
  
          <div className="py-8 px-2 md:px-0">
            {items.map((item, index) => (
              <div key={index} className={`${selectedTab === index ? '' : 'hidden'}`}>
               
                {index === 0 && ( // Render form only in Tab 1
               <div className="py-8 px-2 md:px-0">
  <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg border border-emerald-500 flex flex-col md:flex-row md:items-center">
    <div className="max-w-md w-full">
      <div className="flex gap-4">
        <div className="flex gap-8">
          <div className="w-1/2">
            <label htmlFor="pickup" className="block text-gray-600 font-semibold">
              Pickup Location:
            </label>
            <select
              id="pickup"
              value={pickupLocation}
              onChange={handlePickupChange}
              className="p-2 px-4 outline-none text-gray-600 rounded-xl border border-emerald-500 focus:ring-emerald-500"
            >
              <option value="">Select Pickup Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label htmlFor="dropoff" className="block text-gray-600 font-semibold">
              Drop-off Location:
            </label>
            <select
              id="dropoff"
              value={dropoffLocation}
              onChange={handleDropoffChange}
              className="p-2 px-4 outline-none text-gray-600 rounded-xl border border-emerald-500 focus:ring-emerald-500"
            >
              <option value="">Select Drop-off Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <div className="w-1/2">
            <label className="block text-gray-600 font-semibold text-sm">Select Pickup Date & Time:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Select Date and Time"
              className="p-2 px-4 outline-none text-gray-600 rounded-xl border border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <button
            className="py-3 px-8 mx-2 flex bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all mt-2 md:mt-3"
            onClick={handleAirportSearch}
          >
            <span className="mr-2 ">Search</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1.414-10.586a1 1 0 10-1.414-1.414L6 10.586V9a1 1 0 10-2 0v2a1 1 0 001 1h1.586l-2.293 2.293a1 1 0 101.414 1.414L10 12.414l2.293 2.293a1 1 0 001.414-1.414L11.414 11H13a1 1 0 100-2h-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

                )}
                {index === 1 && ( // Render form only in Tab 1
                  <div className="py-8 px-2 md:px-0">
                   
                  <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg border border-emerald-500 flex flex-col md:flex-row md:items-center">
                  <div className="flex flex-col flex-1">
                  <label className="text-sm text-gray-600 mb-1">Pickup Location (Mumbai)</label>
                  {isLoaded && (
                    <Autocomplete
                      onLoad={onLoadPickup}
                      onPlaceChanged={() => onPlaceChanged(true)}
                      options={{
                        bounds: new window.google.maps.LatLngBounds(
                          new window.google.maps.LatLng(18.8545, 72.8244), // Mumbai bounds
                          new window.google.maps.LatLng(19.2131, 72.8758) // Mumbai bounds
                        ),
                        strictBounds: true,
                        types: ['geocode'],
                        componentRestrictions: { country: 'IN' },
                      }}
                    >
                      <input
                        type="text"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        placeholder="Enter pickup location"
                        className="p-3 outline-none rounded-xl border border-emerald-500 focus:ring-emerald-500 placeholder-gray-400"
                      />
                    </Autocomplete>
                  )}
                </div>
                <div className="flex flex-col flex-1 md:ml-4">
                  <label className="text-sm text-gray-600 mb-1">Drop-Off Location (Pune)</label>
                  {isLoaded && (
                    <Autocomplete
                      onLoad={onLoadDropoff}
                      onPlaceChanged={() => onPlaceChanged(false)}
                      options={{
                        bounds: new window.google.maps.LatLngBounds(
                          new window.google.maps.LatLng(18.4932, 73.7386), // Pune bounds
                          new window.google.maps.LatLng(18.5597, 73.8923) // Pune bounds
                        ),
                        strictBounds: true,
                        types: ['geocode'],
                        componentRestrictions: { country: 'IN' },
                      }}
                    >
                      <input
                        value={dropoffLocation}
                        onChange={(e) => setDropoffLocation(e.target.value)}
                        type="text"
                        placeholder="Enter drop-off location"
                        className="p-3 outline-none rounded-xl border border-emerald-500 focus:ring-emerald-500 placeholder-gray-400"
                      />
                    </Autocomplete>
                  )}
                </div>
                    <div className="flex flex-col flex-1 md:ml-4">
                      <label className="text-sm text-gray-600 mb-1">Select Pickup Date & Time</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select Date and Time"
                        className="p-3 px-8 outline-none text-gray-400 rounded-xl border border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
          
                    <button
                      className="py-3 px-8 ml-6 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all mt-2 md:mt-5 flex items-center"
                      onClick={handleSearch}
                    >
                      <span className="mr-2">Search</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1.414-10.586a1 1 0 10-1.414-1.414L6 10.586V9a1 1 0 10-2 0v2a1 1 0 001 1h1.586l-2.293 2.293a1 1 0 101.414 1.414L10 12.414l2.293 2.293a1 1 0 001.414-1.414L11.414 11H13a1 1 0 100-2h-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                 
                </div>
                )}
                 {index === 2 && ( // Render form only in Tab 1
                  <div className="py-8 px-2 md:px-0">
                    <h2 className="text-center text-3xl text-green-300 mb-4">Find Your Ideal Car3</h2>
                    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg border border-emerald-500 flex flex-col md:flex-row md:items-center">
                      {/* Your form elements for pickup and drop-off locations, date & time */}
                      {/* Example Input for Pickup Location (Mumbai) */}
                      <div className="flex flex-col flex-1">
                        <label className="text-sm text-gray-600 mb-1">Pickup Location (Mumbai)</label>
                        {/* Your Autocomplete component for Mumbai */}
                      </div>
                      {/* Example Input for Drop-Off Location (Pune) */}
                      <div className="flex flex-col flex-1 md:ml-4">
                        <label className="text-sm text-gray-600 mb-1">Drop-Off Location (Pune)</label>
                        {/* Your Autocomplete component for Pune */}
                      </div>
                      {/* Example Input for Select Pickup Date & Time */}
                      <div className="flex flex-col flex-1 md:ml-4">
                        <label className="text-sm text-gray-600 mb-1">Select Pickup Date & Time</label>
                        {/* Your DatePicker component */}
                      </div>
                      {/* Example Button for Search */}
                      <button
                        className="py-3 px-8 ml-6 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all mt-2 md:mt-5 flex items-center"
                        onClick={handleSearch}
                      >
                        {/* Your Search Button */}
                      </button>
                    </div>
                    {/* Display Distance and Duration */}
                    {distance && duration && (
                      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg border border-emerald-500 mt-4">
                        <p className="text-emerald-500 font-bold">Distance: {distance}</p>
                        <p className="text-emerald-500 font-bold">Duration: {duration}</p>
                      </div>
                    )}
                  </div>
                )}
                 {index === 3 && ( // Render form only in Tab 1
                  <div className="py-8 px-2 md:px-0">
                    <h2 className="text-center text-3xl text-blue-300 mb-4">Find Your Ideal Car4</h2>
                    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg border border-emerald-500 flex flex-col md:flex-row md:items-center">
                      {/* Your form elements for pickup and drop-off locations, date & time */}
                      {/* Example Input for Pickup Location (Mumbai) */}
                      <div className="flex flex-col flex-1">
                        <label className="text-sm text-gray-600 mb-1">Pickup Location (Mumbai)</label>
                        {/* Your Autocomplete component for Mumbai */}
                      </div>
                      {/* Example Input for Drop-Off Location (Pune) */}
                      <div className="flex flex-col flex-1 md:ml-4">
                        <label className="text-sm text-gray-600 mb-1">Drop-Off Location (Pune)</label>
                        {/* Your Autocomplete component for Pune */}
                      </div>
                      {/* Example Input for Select Pickup Date & Time */}
                      <div className="flex flex-col flex-1 md:ml-4">
                        <label className="text-sm text-gray-600 mb-1">Select Pickup Date & Time</label>
                        {/* Your DatePicker component */}
                      </div>
                      {/* Example Button for Search */}
                      <button
                        className="py-3 px-8 ml-6 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all mt-2 md:mt-5 flex items-center"
                        onClick={handleSearch}
                      >
                        {/* Your Search Button */}
                      </button>
                    </div>
                    {/* Display Distance and Duration */}
                    {distance && duration && (
                      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg border border-emerald-500 mt-4">
                        <p className="text-emerald-500 font-bold">Distance: {distance}</p>
                        <p className="text-emerald-500 font-bold">Duration: {duration}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  



const TabsPage = () => {
  return (
    <div className=' rounded-lg mx-4 p-4'>
      <br />

      {/* Tabs Component */}
      <TabsComponent items={items} />
    </div>
  );
};

export default TabsPage;

const items = [
  {
    title: 'AirPort Services',
    
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
  {
    title: 'Delhi National',
   
  },
];