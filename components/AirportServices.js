import { useState, useEffect, useRef } from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { useRouter } from 'next/router';
const placesLibrary = ['places'];
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPhone } from 'react-icons/fa';
const AirportServices = () => {
    
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
      const handleMumbaiToPuneAirportSearch = () => {
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
      
                  const currentTime = new Date().getTime();
                  const selectedTime = startDate.getTime();
                  const sixHoursLater = currentTime + 6 * 60 * 60 * 1000;
      
                  if (selectedTime < sixHoursLater) {
                    // Show modal if selected time is within the next 6 hours
                    setModalOpen(true);
                  } else {
                    // Redirect to the booking page after 6 hours
                    router.push({
                      pathname: '/mumbaitopuneairport',
                      query: {
                        pickupLocation,
                        dropoffLocation,
                        distance: distance.text,
                        duration: duration.text,
                        pickupDate: startDate.toISOString(),
                      },
                    });
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
      const handlePuneToMumbaiAirportSearch = () => {
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
      
                  const currentTime = new Date().getTime();
                  const selectedTime = startDate.getTime();
                  const sixHoursLater = currentTime + 6 * 60 * 60 * 1000;
      
                  if (selectedTime < sixHoursLater) {
                    // Show modal if selected time is within the next 6 hours
                    setModalOpen(true);
                  } else {
                    // Redirect to the booking page after 6 hours
                    router.push({
                      pathname: '/punetomumbaiairport',
                      query: {
                        pickupLocation,
                        dropoffLocation,
                        distance: distance.text,
                        duration: duration.text,
                        pickupDate: startDate.toISOString(),
                      },
                    });
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
      
      const [selectedOption, setSelectedOption] = useState('PuneToMumbai');
      const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        setPickupLocation('');
        setDropoffLocation('');
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
<div className="py-8 px-2 md:px-0">
  <div className="max-w-7xl md:-mt-20 mx-auto p-4 bg-white rounded-lg border border-[#541e50]">
  <div className="flex justify-center mb-4">
  <button className={`tab ${selectedOption === 'PuneToMumbai' ? 'active text-white bg-[#541e50] p-2 rounded-lg hover:bg-[#541e50]' : 'text-gray-500 p-2 rounded-lg bg-gray-200 hover:bg-gray-300'}`} onClick={() => setSelectedOption('PuneToMumbai')}>
    Pune To Mumbai Airport
  </button>
  <button className={`tab ${selectedOption === 'MumbaiToPune' ? 'active text-white bg-[#541e50] p-2 rounded-lg hover:bg-[#541e50]' : 'text-gray-500 p-2 rounded-lg bg-gray-200 hover:bg-gray-300'}`} onClick={() => setSelectedOption('MumbaiToPune')}>
    Mumbai Airport To Pune
  </button>
</div>




    {selectedOption === 'MumbaiToPune' && (
      <div className="flex flex-col md:flex-row md:flex-wrap mt-4">
        <div className="flex flex-col flex-1">
          <label className="text-sm text-gray-600 mb-1">Pickup Location</label>
          {isLoaded && (
           <Autocomplete
           onLoad={onLoadPickup}
           onPlaceChanged={() => onPlaceChanged(true)}
           options={{
             bounds: new window.google.maps.LatLngBounds(
               new window.google.maps.LatLng(19.0896, 72.8656),
               new window.google.maps.LatLng(19.1197, 72.8826)
             ),
             strictBounds: true,
             types: ['airport'], // Use 'airport' as the type to limit results to airports
             componentRestrictions: { country: 'IN' },
           }}
         >
           <input
             type="text"
             value={pickupLocation}
             onChange={(e) => setPickupLocation(e.target.value)}
             placeholder="Enter  pickup location"
             className="p-3 outline-none rounded-xl border border-[#541e50] focus:ring-[#541e50] placeholder-gray-400"
           />
         </Autocomplete>
         
          )}
        </div>
        <div className="flex flex-col flex-1 md:ml-4">
          <label className="text-sm text-gray-600 mb-1">Drop-Off Location</label>
          {isLoaded && (
            <Autocomplete
              onLoad={onLoadDropoff}
              onPlaceChanged={() => onPlaceChanged(false)}
              options={{
                bounds: new window.google.maps.LatLngBounds(
                  new window.google.maps.LatLng(18.4419, 73.1021),
                  new window.google.maps.LatLng(18.6260, 73.9414)
                ),
                strictBounds: true,
                types: ['geocode'],
                componentRestrictions: { country: 'IN' },
              }}
            >
              <input
                type="text"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                placeholder="Enter drop-off location"
                className="p-3 outline-none rounded-xl border border-[#541e50] focus:ring-[#541e50] placeholder-gray-400"
              />
            </Autocomplete>
          )}
        </div>
        <div className="flex flex-col flex-1 md:ml-4">
  <label className="text-sm text-gray-600 mb-1">Select Pickup Date</label>
  <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    dateFormat="MMMM d, yyyy"
    placeholderText="Select Date"
    minDate={new Date()}
    className="p-3 px-8 outline-none text-gray-400 rounded-xl border border-[#541e50] focus:ring-[#541e50]"
  />
</div>
<div className="flex flex-col flex-1 md:ml-4">
        <label className="text-sm text-gray-600 mb-1">Select Pickup Time</label>
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
          className="p-3 px-8 outline-none text-gray-400 rounded-xl border border-[#541e50] focus:ring-[#541e50]"
        />
      </div>

        <div className="flex flex-col flex-1  mt-4 md:mt-5">
          <button
            className="py-3 w-full px-8 md:ml-2 bg-[#541e50] text-white rounded-xl hover:bg-[#541e50] transition-all flex items-center justify-center"
            onClick={handleMumbaiToPuneAirportSearch}
          >
            <span className="text-center">Search</span>
           
          </button>
        </div>
      </div>
    )}

    {selectedOption === 'PuneToMumbai' && (
      <div className="flex flex-col md:flex-row md:flex-wrap mt-4">
        <div className="flex flex-col flex-1">
          <label className="text-sm text-gray-600 mb-1">Pickup Location</label>
          {isLoaded && (
            <Autocomplete
              onLoad={onLoadPickup}
              onPlaceChanged={() => onPlaceChanged(true)}
              options={{
                bounds: new window.google.maps.LatLngBounds(
                  new window.google.maps.LatLng(18.4419, 73.1021),
                  new window.google.maps.LatLng(18.6260, 73.9414)
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
                className="p-3 outline-none rounded-xl border border-[#541e50] focus:ring-[#541e50] placeholder-gray-400"
              />
            </Autocomplete>
          )}
        </div>
        <div className="flex flex-col flex-1 md:ml-4">
          <label className="text-sm text-gray-600 mb-1">Drop-Off Location</label>
          {isLoaded && (
            <Autocomplete
              onLoad={onLoadDropoff}
              onPlaceChanged={() => onPlaceChanged(false)}
              options={{
                bounds: new window.google.maps.LatLngBounds(
                  new window.google.maps.LatLng(19.0896, 72.8656),
                  new window.google.maps.LatLng(19.1197, 72.8826)
                ),
                strictBounds: true,
                types: ['airport'], // Use 'airport' as the type to limit results to airports
                componentRestrictions: { country: 'IN' },
              }}
            >
              <input
                type="text"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                placeholder="Enter drop-off location"
                className="p-3 outline-none rounded-xl border border-[#541e50] focus:ring-[#541e50] placeholder-gray-400"
              />
            </Autocomplete>
          )}
        </div>
        <div className="flex flex-col flex-1 md:ml-4">
  <label className="text-sm text-gray-600 mb-1">Select Pickup Date</label>
  <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    dateFormat="MMMM d, yyyy"
    placeholderText="Select Date"
    minDate={new Date()}
    className="p-3 px-8 outline-none text-gray-400 rounded-xl border border-[#541e50] focus:ring-[#541e50]"
  />
</div>
<div className="flex flex-col flex-1 md:ml-4">
        <label className="text-sm text-gray-600 mb-1">Select Pickup Time</label>
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
          className="p-3 px-8 outline-none text-gray-400 rounded-xl border border-[#541e50] focus:ring-[#541e50]"
        />
      </div>


        <div className="flex flex-col flex-1  mt-4 md:mt-5">
          <button
            className="py-3 w-full px-8 md:ml-2 bg-[#541e50] text-white rounded-xl hover:bg-[#541e50] transition-all flex items-center justify-center"
            onClick={handlePuneToMumbaiAirportSearch}
          >
            <span className="text-center">Search</span>
            
          </button>
        </div>
      </div>
    )}
  </div>
  {modalOpen && (
  <div className="fixed inset-0 z-50 flex justify-center items-center">
    <div className="modal-container bg-white w-80 md:w-96 p-8 rounded-lg shadow-lg animate-fade-in">
      <div className="modal-content text-center">
        <div className="flex items-center justify-center mb-4">
          <FaPhone className="text-4xl text-blue-500 mr-2" />
          <div>
            <p className="text-lg font-semibold">Please call me on:</p>
            <p className="text-2xl font-bold mt-2">7667411501</p>
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

  )
}

export default AirportServices