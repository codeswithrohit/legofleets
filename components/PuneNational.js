import { useState, useEffect, useRef } from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { useRouter } from 'next/router';
const placesLibrary = ['places'];
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPhone } from 'react-icons/fa';
const MumbaiNational = () => {
    
    const router = useRouter();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const autocompletePickupRef = useRef();
    const autocompleteDropoffRef = useRef();
  
    const [modalOpen, setModalOpen] = useState(false);
  
    /* for 1st tab */ 
  
  
    const handlePickupChange = (e) => {
      setPickupLocation(e.target.value);
    };
  
    const handleDropoffChange = (e) => {
      setDropoffLocation(e.target.value);
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyB6gEq59Ly20DUl7dEhHW9KgnaZy4HrkqQ',
        libraries: placesLibrary,
      });
    console.log("Start Date",startDate, "End Date" ,endDate)
      
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
            const addressComponents = place.address_components;
            const isKarnataka = addressComponents.some(
              (component) =>
                component.long_name.toLowerCase() === 'karnataka' && component.types.includes('administrative_area_level_1')
            );
    
            const isMumbai = addressComponents.some(
              (component) => component.long_name.toLowerCase() === 'mumbai' && component.types.includes('locality')
            );
    
           


            if (isKarnataka) {
              alert('This location is not allowed.');
              return;
            }
    
            if ( isMumbai) {
              alert('Please use "Pune <=> Mumbai" Tab for Pune to Mumbai or Mumbai to Pune trips.');
              return;
            }
    
            if (isPickupLocation) {
              setPickupLocation(place.formatted_address);
            } else {
              setDropoffLocation(place.formatted_address);
            }
          }
        }
      };
    const handlePuneNationalSearch = () => {
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
                  const currentTime = new Date().getTime();
                  const selectedTime = startDate.getTime();
                  const sixHoursLater = currentTime + 24 * 60 * 60 * 1000;
      
                  if (selectedTime < sixHoursLater) {
                    // Show modal if selected time is within the next 6 hours
                    setModalOpen(true);
                  } else {
                  router.push(`/punenational?pickupLocation=${pickupLocation}&dropoffLocation=${dropoffLocation}&distance=${distance.text}&duration=${duration.text}&pickupDate=${startDate.toLocaleString()}&dropDate=${endDate.toLocaleString()}`);
                  }}
              } else {
                console.log('Error:', status);
              }
            }
          );
        } else {
          console.log('Please enter both pickup and drop-off locations.');
        }
      };

      const handleDateChange = (date) => {
        setStartDate(date);
      };
    
      const currentTime = new Date();
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
    
      // Calculate the next minute after the current time
      const nextMinute = currentHours === 23 ? 0 : currentMinutes + 1;
      const nextHour = currentHours === 23 ? 0 : currentHours + (currentMinutes === 59 ? 1 : 0);
    
      const maxTime = new Date().setHours(23, 59, 59, 999); // Set maxTime to the end of the day
    

  return (
    <div className="md:mt-4 px-0 md:px-0">
                  <div className="max-w-5xl md:-mt-20 mx-auto p-4 bg-white rounded-lg border border-[#541e50] flex flex-col md:flex-row md:items-center">
  <div className="flex flex-col flex-1">
    <label className="text-sm text-black mb-1">Pickup Location</label>
    {isLoaded && (
      <Autocomplete
        onLoad={onLoadPickup}
        onPlaceChanged={() => onPlaceChanged(true)}
        options={{
          bounds: {
            east: 73.9414, // Upper bound for Pune (longitude)
            north: 18.6260, // Upper bound for Pune (latitude)
            south: 18.4419, // Lower bound for Pune (latitude)
            west: 73.1021, // Lower bound for Pune (longitude)
          },
          strictBounds: true,
          types: ['geocode'],
          componentRestrictions: { country: 'IN' },
        }}
      >
        <input
          type="text"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          placeholder="Pickup location"
          className="p-3 outline-none w-full md:w-36 h-10 rounded-lg border border-[#541e50] focus:ring-[#541e50] placeholder-black"
        />
      </Autocomplete>
    )}
  </div>
  <div className="flex flex-col flex-1 md:ml-4">
  <label className="text-sm text-black mb-1">Drop-Off Location </label>
  {isLoaded && (
    <Autocomplete
      onLoad={(autocomplete) => (autocompleteDropoffRef.current = autocomplete)}
      onPlaceChanged={() => onPlaceChanged(false)}
      options={{
        types: ['(regions)'],
        componentRestrictions: { country: 'IN' },
      }}
    >
      <input
        value={dropoffLocation}
        onChange={(e) => setDropoffLocation(e.target.value)}
        type="text"
        placeholder="Drop-off location"
        className="p-3 outline-none w-full md:w-36 h-10 rounded-lg border border-[#541e50] focus:ring-[#541e50] placeholder-black"
      />
    </Autocomplete>
  )}
</div>
  <div className="flex flex-col flex-1 md:ml-4">
    <label className="text-sm text-black mb-1">Select Pickup Date</label>
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="dd-MMM-yy"
      placeholderText="Select Date"
      minDate={new Date()}
      className="p-3 px-8 outline-none w-full md:w-36 h-10 text-black rounded-lg border border-[#541e50] focus:ring-[#541e50]"
    />
  </div>
  <div className="flex flex-col flex-1 md:ml-4">
    <label className="text-sm text-black mb-1">Select Pickup Time</label>
    <DatePicker
      selected={startDate}
      onChange={handleDateChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
      placeholderText="Select Time"
      minTime={
        startDate.getDate() === currentTime.getDate()
          ? new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentHours, nextMinute)
          : undefined
      }
      maxTime={startDate.getDate() === currentTime.getDate() ? new Date().setHours(23, 59, 59, 999) : undefined}
      className="p-3 px-8 outline-none w-full md:w-36 h-10 text-black rounded-lg border border-[#541e50] focus:ring-[#541e50]"
    />
  </div>
  <div className="flex flex-col flex-1 md:ml-4">
  <>
    <label className="text-sm text-black mb-1">Select Drop-off Date</label>
    <DatePicker
      selected={endDate}
      onChange={(date) => setEndDate(date)}
      dateFormat="dd-MMM-yy" // Only show the date without time
      placeholderText="Select Date"
      minDate={startDate || new Date()} // Set minDate to startDate if it's selected, otherwise default to today
      className="p-3 px-8 outline-none w-full md:w-36 h-10 text-black rounded-lg border border-[#541e50] focus:ring-[#541e50]"
    />
  </>
</div>

<button
  className="py-3 px-8  w-full md:w-36 h-10 ml-0 md:ml-4 bg-[#541e50] text-white rounded-lg hover:bg-[#541e50] transition-all mt-4 flex items-center justify-center"
  onClick={handlePuneNationalSearch}
>
  <span className="text-center">Search</span>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1.414-10.586a1 1 0 10-1.414-1.414L6 10.586V9a1 1 0 10-2 0v2a1 1 0 001 1h1.586l-2.293 2.293a1 1 0 101.414 1.414L10 12.414l2.293 2.293a1 1 0 001.414-1.414L11.414 11H13a1 1 0 100-2h-2z"
      clipRule="evenodd"
    />
  </svg>
</button>
</div>


                  {modalOpen && (
  <div className="fixed inset-0 z-50 flex justify-center items-center">
    <div className="modal-container bg-white w-80 md:w-96 p-8 rounded-lg shadow-lg animate-fade-in">
      <div className="modal-content text-center">
        <div className="flex items-center justify-center mb-4">
          <FaPhone className="text-4xl text-blue-500 mr-2" />
          <div>
            <p className="text-lg font-semibold">To book within 24 hours from now, please call me on :</p>
            <p className="text-2xl font-bold mt-2">7667411501</p>
          </div>
        </div>
        <button
          onClick={() => setModalOpen(false)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none w-full md:w-36 h-10"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
                </div>
  )
}

export default MumbaiNational