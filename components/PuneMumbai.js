import { useState, useEffect, useRef } from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { useRouter } from 'next/router';
const placesLibrary = ['places'];
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPhone } from 'react-icons/fa';
import Select from 'react-select';
import { format } from 'date-fns';
const locations = [
  'Lonavala', 'Panvel', 'Khopoli', 'Khandala', 'Belapur', 'Kharghar', 'Nerul', 'Sanpada', 'Seawood',
  'Vashi', 'Airoli', 'Rabale', 'Mulund East', 'Mulund West', 'Bhandup East', 'Bhandup West', 'Mankhurd',
  'Ghatkopar East', 'Ghatkopar West', 'Koparkhirane', 'Ghansoli', 'Chembur', 'Sion', 'Vikroli', 'Vile Parle',
  'Andheri East', 'Andheri West', 'Sakinaka', 'Powai', 'Kanjurmarg East', 'Kanjurmarg West', 'Chandivali',
  'Kurla East', 'Kurla West', 'Bandra Kurla Complex (BKC)', 'Bandra East', 'Matunga', 'Kingcircle', 'Dadar East',
  'Dadar West', 'Shivajipark', 'Mahim', 'Parel', 'Lower Parel', 'Sidhhivinayak mandir', 'Wadala',
  'Mahalaxmi', 'Byculla', 'Mazgaon', 'Mumbadevi', 'Kalbadevi', 'Mumbai Central', 'Taj Hotel Mumbai',
  'Santacruz East', 'Santacruz West', 'Colaba', 'Nariman Point', 'Gateway of India', 'Churchgate',
  'Victoriya Terminus', 'Chhatrapati Shivaji Terminus', 'Worli', 'Girgaon', 'Girgaon Chowpatty', 'Haji Ali',
  'Charni Road', 'Grant Road', 'MazgaonDock Yard', 'Malabar Hill', 'Juhu Chawpatty', 'Khar', 'Juhu',
  'Yari road', 'BandraWest', 'Prabha Devi', 'Goregaon East', 'Goregaon West', 'Malad East', 'Malad West',
  'Kandivali East', 'Kandivali West', 'Charkop', 'Juhu Beach', 'Versova', 'Borivali East', 'Borivali West',
  'Thane East', 'Thane West', 'Dahisar East', 'Dahisar West', 'Mira Road East', 'Mira Road West', 'Vasai East',
  'Vasai West', 'Bhayandar East', 'Bhayandar West', 'Virar East', 'Virar West', 'Kalyan East', 'Kalyan West',
  'Dombivli East', 'Dombivli West', 'Badlapur', 'Karjat'
];


const PuneMumbai = () => {

    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleLocationChange = (selectedOption) => {
      setSelectedLocation(selectedOption);
    };
  
    const options = locations.map((location, index) => ({
      label: location,
      value: location
    }));
    
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
      
    const handleMumbaiToPuneSearch = () => {
      const currentTime = new Date().getTime();
      const selectedTime = startDate.getTime();
      const sixHoursLater = currentTime + 6 * 60 * 60 * 1000;

      if (selectedTime < sixHoursLater) {
        // Show modal if selected time is within the next 6 hours
        setModalOpen(true);
      } else {
      router.push(`/mumbaipune?pickupLocation=${selectedLocation.value}&dropoffLocation=${dropoffLocation}&pickupDate=${format(startDate, 'dd-MMM-yy h:mm aa')}`);
    }};
    const handlePuneToMumbaiSearch = () => {
      const currentTime = new Date().getTime();
      const selectedTime = startDate.getTime();
      const sixHoursLater = currentTime + 6 * 60 * 60 * 1000;

      if (selectedTime < sixHoursLater) {
        // Show modal if selected time is within the next 6 hours
        setModalOpen(true);
      } else {
      router.push(`/punemumbai?pickupLocation=${pickupLocation}&dropoffLocation=${selectedLocation.value}&pickupDate=${format(startDate, 'dd-MMM-yy h:mm aa')}`);
      }};
      const [selectedOption, setSelectedOption] = useState('PuneToMumbai');
      const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        setPickupLocation('');
        setDropoffLocation('');
      };
  return (
    <div className="md:mt-4 px-0 md:px-0">
    <div className="max-w-5xl md:-mt-20 mx-auto px-4 bg-white rounded-lg border border-[#541e50]">
    <div className="flex justify-center text-xs font-bold mb-2 mt-1">
  <button className={`tab ${selectedOption === 'PuneToMumbai' ? 'active text-white bg-[#541e50] p-2 rounded-lg hover:bg-[#541e50] text-xs ' : ' text-xs text-gray-500 p-2 rounded-lg bg-gray-200 hover:bg-gray-300'}`} onClick={() => setSelectedOption('PuneToMumbai')}>
    Pune To Mumbai 
  </button>
  <button className={`tab ${selectedOption === 'MumbaiToPune' ? 'active text-white bg-[#541e50] p-2 rounded-lg hover:bg-[#541e50] text-xs ml-4 ' : ' text-xs ml-4 text-gray-500 p-2 rounded-lg bg-gray-200 hover:bg-gray-300'}`} onClick={() => setSelectedOption('MumbaiToPune')}>
    Mumbai  To Pune
  </button>
</div>

     
  
      {selectedOption === 'PuneToMumbai' && (
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 mb-2">
        <div className="flex flex-col flex-1">
          <label className="text-sm text-black mb-1">Pickup Location</label>
          {/* Autocomplete for Pickup Location */}
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
                placeholder="Pickup location"
                className="p-3 outline-none w-full md:w-40 h-10 rounded-lg border border-[#541e50] focus:ring-[#541e50] placeholder-black"
              />
            </Autocomplete>
          )}
        </div>

        <div className="flex flex-col  ">
          <label className="text-black text-xs font-bold">Drop-off Location:</label>
          {/* Select for Drop-off Location */}
          <Select
            value={selectedLocation}
            onChange={handleLocationChange}
            options={options}
            placeholder="Drop-off Location"
            className=" w-full md:w-48 h-10 md:mt-2 mt-0  placeholder-black "
          />
        </div>

        <div className="flex flex-col flex-1 md:ml-4">
          <label className="text-sm text-black mb-1">Select Pickup Date</label>
          {/* DatePicker for Selecting Date */}
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
              dateFormat="dd-MMM-yy"
            placeholderText="Select Date"
            minDate={new Date()}
            className="p-3 px-8 outline-none w-full md:w-40 h-10 text-black rounded-lg border border-[#541e50] focus:ring-purple-900"
          />
        </div>

        <div className="flex flex-col flex-1 md:ml-4">
          <label className="text-sm text-black mb-1">Select Pickup Time</label>
          {/* DatePicker for Selecting Time */}
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
            className="p-3 px-8 outline-none w-full md:w-40 h-10 text-black rounded-lg border border-[#541e50] focus:ring-purple-900"
          />
        </div>
        <div className="flex flex-col flex-1 md:ml-4">
        <button
          className="py-3 w-full md:w-40 h-10  bg-[#541e50] text-white rounded-lg hover:bg-[#541e50] transition-all mt-2 md:mt-6 flex items-center justify-center px-4"
          onClick={handlePuneToMumbaiSearch}
        >
          <span className="text-center">Search</span>
          
        </button>
        </div>
      </div>
    )}

  
{selectedOption === 'MumbaiToPune' && (
  <div className="flex flex-col md:flex-row md:flex-wrap gap-4 mb-2">
    <div className="flex flex-col ">
          <label className="text-black text-xs font-bold">Pickup Location:</label>
          {/* Select for Drop-off Location */}
          <Select
            value={selectedLocation}
            onChange={handleLocationChange}
            options={options}
            placeholder="Pickup Location"
            className="w-full md:w-48 h-10 md:mt-2 mt-0  placeholder-black"
          />
        </div>

    <div className="flex flex-col flex-1 md:mr-4">
      <label className="text-sm text-black mb-1">Drop-off Location</label>
      {/* Autocomplete for Drop-off Location */}
      {isLoaded && (
        <Autocomplete
          onLoad={onLoadDropoff}
          onPlaceChanged={() => onPlaceChanged(false)}
          options={{
            bounds: new window.google.maps.LatLngBounds(
              new window.google.maps.LatLng(18.5822, 73.9197),
              new window.google.maps.LatLng(18.5822, 73.9197)
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
            className="p-3 outline-none w-full md:w-40 h-10 rounded-lg border border-[#541e50] focus:ring-[#541e50] placeholder-black"
          />
        </Autocomplete>
      )}
    </div>

    <div className="flex flex-col flex-1 md:ml-4">
      <label className="text-sm text-black mb-1">Select Pickup Date</label>
      {/* DatePicker for Selecting Date */}
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
          dateFormat="dd-MMM-yy"
        placeholderText="Select Date"
        minDate={new Date()}
        className="p-3 px-8 outline-none w-full md:w-40 h-10 text-black rounded-lg border border-[#541e50] focus:ring-purple-900"
      />
    </div>

    <div className="flex flex-col flex-1 md:ml-4">
      <label className="text-sm text-black mb-1">Select Pickup Time</label>
      {/* DatePicker for Selecting Time */}
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
        className="p-3 px-8 outline-none w-full md:w-40 h-10 text-black rounded-lg border border-[#541e50] focus:ring-purple-900"
      />
    </div>
    <div className="flex flex-col flex-1 md:ml-4">
    <button
      className="py-3 w-full md:w-40 h-10 bg-[#541e50] md:mt-6 text-white rounded-lg hover:bg-[#541e50] transition-all mt-2  flex items-center justify-center px-4"
      onClick={handleMumbaiToPuneSearch}
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
  
  )
}

export default PuneMumbai