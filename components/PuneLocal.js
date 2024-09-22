import { useState, useEffect, useRef } from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPhone } from 'react-icons/fa';
import { format } from 'date-fns';
const PuneLocal = () => {
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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB6gEq59Ly20DUl7dEhHW9KgnaZy4HrkqQ',
    libraries: ['places'],
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

  const handlePuneLocalSearch = () => {
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
                // Check if drop-off time is between 1:00 AM to 4:00 AM
                const dropoffHours = endDate.getHours();
                if (dropoffHours >= 1 && dropoffHours < 4) {
                  // Show message indicating drop-off is not available
                  alert("The Vehicle must be released before mid-night or at the most 1am.");
                } else {
                  router.push(`/punelocal?pickupLocation=${pickupLocation}&dropoffLocation=${dropoffLocation}&distance=${distance.text}&duration=${duration.text}&pickupDate=${format(startDate, 'dd-MMM-yy h:mm aa')}&dropDate=${format(endDate, 'dd-MMM-yy h:mm aa')}`);
                }
              }
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

  const handleDateChange = (date) => {
    setStartDate(date);
    setEndDate(date); // Set end date to the same as start date
  };

  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const nextMinute = currentHours === 23 ? 0 : currentMinutes + 1;
  const nextHour = currentHours === 23 ? 0 : currentHours + (currentMinutes === 59 ? 1 : 0);
  const maxTime = new Date().setHours(23, 59, 59, 999);

  const isPickupTimeValid = () => {
    const pickupHours = startDate.getHours();
    return pickupHours < 2 || pickupHours >= 6;
  };

  return (
    <div className="md:mt-4 px-0 md:px-0">
      <div className="max-w-5xl md:-mt-20 mx-auto p-4 bg-white rounded-lg border border-[#541e50] flex flex-col md:flex-row md:items-center">
        <div className="flex flex-col flex-1 ">
          <label className="text-sm text-black mb-1">Pickup Location</label>
          {isLoaded && (
            <Autocomplete
              onLoad={onLoadPickup}
              onPlaceChanged={() => onPlaceChanged(true)}
              options={{
                bounds: new window.google.maps.LatLngBounds(
                  new window.google.maps.LatLng(18.525983604372357, 73.79522341182289),
                  new window.google.maps.LatLng(18.63518348162437, 73.79522341182289)
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
                placeholder="Pickup location"
                className="p-3 w-full md:w-36 h-10 outline-none rounded-lg border border-[#541e50] focus:ring-[#541e50] placeholder-black"
              />
            </Autocomplete>
          )}
        </div>
        <div className="flex flex-col flex-1 md:ml-4">
          <label className="text-sm text-black mb-1">Drop-Off Location</label>
          {isLoaded && (
            <Autocomplete
              onLoad={onLoadDropoff}
              onPlaceChanged={() => onPlaceChanged(false)}
              options={{
                bounds: new window.google.maps.LatLngBounds(
                  new window.google.maps.LatLng(18.525983604372357, 73.79522341182289),
                  new window.google.maps.LatLng(18.63518348162437, 73.79522341182289)
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
                placeholder="Drop-off location"
                className="p-3 outline-none rounded-lg w-full md:w-36 h-10 border border-[#541e50] focus:ring-[#541e50] placeholder-black"
              />
            </Autocomplete>
          )}
        </div>
        <div className="flex flex-col flex-1 md:ml-4">
          <label className="text-sm text-black mb-1">Select Pickup Date</label>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
              dateFormat="dd-MMM-yy"
            placeholderText="SDate"
            minDate={new Date()}
            className="p-3 px-8 outline-none text-black w-full md:w-36 h-10 rounded-lg border border-[#541e50] focus:ring-[#541e50]"
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
            placeholderText="Time"
            minTime={
              startDate.getDate() === currentTime.getDate()
                ? new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentHours, nextMinute)
                : undefined
            }
            maxTime={startDate.getDate() === currentTime.getDate() ? new Date().setHours(23, 59, 59, 999) : undefined}
            className="p-3 px-8 outline-none text-black w-full md:w-36 h-10 rounded-lg border border-[#541e50] focus:ring-[#541e50]"
          />
        </div>
        
        <div className="flex flex-col flex-1 md:ml-4">
          <label className="text-sm text-black mb-1">Select Drop-off Time</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            placeholderText="Time"
            minTime={
              startDate.getDate() === currentTime.getDate()
                ? new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentHours, nextMinute)
                : undefined
            }
            maxTime={startDate.getDate() === currentTime.getDate() ? new Date().setHours(23, 59, 59, 999) : undefined}
            className="p-3 px-8 outline-none w-full md:w-36 h-10 text-black rounded-lg border border-[#541e50] focus:ring-[#541e50]"
          />
        </div>
        <button
        className="py-3 px-8 ml-0 md:ml-4 w-full md:w-36 h-10 bg-[#541e50] text-white rounded-lg hover:bg-[#541e50] transition-all mt-3  flex items-center justify-center"
        onClick={handlePuneLocalSearch}
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
                  <p className="text-2xl font-bold mt-2">+91 7875120099</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PuneLocal;
