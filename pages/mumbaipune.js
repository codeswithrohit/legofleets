import React, { useState,useEffect } from "react";
import { useRouter } from 'next/router';
import { firebase } from "../Firebase/config";
import { ChevronDownIcon, ChevronUpIcon, UserIcon, ShoppingBagIcon } from '@heroicons/react/solid';
function MyApp() {
    const [showMoreInfo, setShowMoreInfo] = useState(true);
    const [selectedPassengers, setSelectedPassengers] = useState("1");
    const [selectedSuitcase, setSelectedSuitcase] = useState("3 Medium, 2 Small");
    const [selectedType, setSelectedType] = useState("sedan");
  
    const toggleMoreInfo = () => {
      setShowMoreInfo(!showMoreInfo);
    };

    useEffect(() => {
      // Update selectedSuitcase options based on selectedPassengers
      const updatedSuitcaseOptions = getSuitcaseOptions();
      setSelectedSuitcase(updatedSuitcaseOptions[0]); // Set to the first option by default
    }, [selectedPassengers]);
  
    const router = useRouter();
    const { pickupLocation, dropoffLocation,  pickupDate,dropDate } = router.query;
  
    const [travelData, setTravelData] = useState([]);


    const locationPrices = {
      
      'Destination Type A': {
        locations: [
          'Lonavala', 'Panvel', 'Khopoli', 'Khandala', 'Belapur', 'Kharghar', 'Nerul', 'Sanpada',
          'Seawood', 'Vashi', 'Airoli', 'Rabale', 'Mulund East', 'Mulund West', 'Bhandup East',
          'Bhandup West', 'Mankhurd', 'Ghatkopar East', 'Ghatkopar West', 'Koparkhirane', 'Ghansoli',
          'Chembur', 'Sion', 'Vikroli', 'Vile Parle', 'Andheri East', 'Andheri West', 'Sakinaka',
          'Powai', 'Kanjurmarg East', 'Kanjurmarg West', 'Chandivali', 'Kurla East', 'Kurla West',
          'Bandra Kurla Complex (BKC)', 'Bandra East', 'Matunga', 'Kingcircle', 'Dadar East',
          'Dadar West', 'Shivajipark', 'Mahim', 'Parel', 'Lower Parel', 'Sidhhivinayak mandir', 'Wadala'
        ],
        prices: {
          sedan: 3500,
          minisuv: 4500,
          suv: 6000
        }
      },
      'Destination Type B': {
        locations: [
          'Mahalaxmi', 'Byculla', 'Mazgaon', 'Mumbadevi', 'Kalbadevi', 'Mumbai Central', 'Taj Hotel Mumbai',
          'Santacruz East', 'Santacruz West', 'Colaba', 'Nariman Point', 'Gateway of India', 'Churchgate',
          'Victoriya Terminus', 'Chhatrapati Shivaji Terminus', 'Worli', 'Girgaon', 'Girgaon Chowpatty',
          'Haji Ali', 'Charni Road', 'Grant Road', 'MazgaonDock Yard', 'Malabar Hill', 'Juhu Chawpatty',
          'Khar', 'Juhu', 'Yari road', 'BandraWest', 'Prabha Devi', 'Goregaon East', 'Goregaon West',
          'Malad East', 'Malad West', 'Kandivali East', 'Kandivali West', 'Charkop', 'Juhu Beach',
          'Versova', 'Borivali East', 'Borivali West', 'Thane East', 'Thane West'
        ],
        prices: {
          sedan: 4000,
          minisuv: 5000,
          suv: 7000
        }
      },
      'Destination Type C': {
        locations: [
          'Dahisar East', 'Dahisar West', 'Mira Road East', 'Mira Road West', 'Vasai East', 'Vasai West',
          'Bhayandar East', 'Bhayandar West', 'Virar East', 'Virar West'
        ],
        prices: {
          sedan: 5000,
          minisuv: 6000,
          suv: 8000
        }
      },
      'Destination Type D': {
        locations: [
          'Kalyan East', 'Kalyan West', 'Dombivli East', 'Dombivli West', 'Badlapur', 'Karjat'
        ],
        prices: {
          sedan: 4500,
          minisuv: 5500,
          suv: 7500
        }
      }
      // Add more destination types in a similar structure for other locations
    };
    
  
    // Inside handleFilter function
    const handleFilter = () => {
      const filteredData = travelData.filter((item) => {
        const passengersMatch = parseInt(item.passenger) >= parseInt(selectedPassengers);
        const suitcaseMatch = parseInt(item.suitcase) >= parseInt(selectedSuitcase);
        const typeMatch = item.vehicleType.toLowerCase() === selectedType.toLowerCase();
    
        if (typeMatch) {
          // Get the destination type based on pickup and dropoff locations
          let destinationType = null;
    
          for (const locationType in locationPrices) {
            const locations = locationPrices[locationType].locations;
            if (
              locations.includes(pickupLocation) ||
              locations.includes(dropoffLocation)
            ) {
              destinationType = locationType;
              break;
            }
          }
    
          // Adjust price based on the found destination type
          if (destinationType) {
            item.price = locationPrices[destinationType].prices[selectedType.toLowerCase()];
          } else {
            // Default price if no location matches
            switch (selectedType.toLowerCase()) {
              case 'sedan':
                item.price = 2600;
                break;
              case 'minisuv':
                item.price = 3400;
                break;
              case 'suv':
                item.price = 4300;
                break;
              default:
                break;
            }
          }
        }
    
        return passengersMatch && suitcaseMatch && typeMatch;
      });
    
      return filteredData;
    };
    const handleTypeChange = (type) => {
      setSelectedType(type);
    };
    const getPassengerOptions = () => {
      switch (selectedType.toLowerCase()) {
        case 'sedan':
          return ['1', '2', '3', '4'];
        case 'minisuv':
          return ['1', '2', '3', '4', '5'];
        case 'suv':
          return ['1', '2', '3', '4', '5'];
        default:
          return [];
      }
    };
    
    // Suitcase options based on vehicle type and passenger count
    const getSuitcaseOptions = () => {
        if (selectedType.toLowerCase() === 'sedan') {
          if (selectedPassengers === '1' ) {
            return ['3 Medium, 2 Small', '1 Large 2 Medium 2 Small'];
          } else if (selectedPassengers === '2') {
            return ['3 Medium, 2 Small', '1 Large 2 Medium 2 Small'];
          } else if (selectedPassengers === '3') {
            return ['2 Medium 1 Small', '1 Large 1 Medium 1 Small'];
          } else if (selectedPassengers === '4') {
            return ['2 Medium 1 Small', '1 Large 2 Small'];
          }
        } else if (selectedType.toLowerCase() === 'suv') {
          if (selectedPassengers === '1' ) {
            return ['3 Large 2 Medium, 1 Small', '1 Large 2 Medium 3 Small','2 Large 2 Medium 2 Small'];
          } else if (selectedPassengers === '2') {
            return ['3 Large 2 Medium, 1 Small', '1 Large 2 Medium 3 Small','2 Large 2 Medium 2 Small'];
          } else if (selectedPassengers === '3') {
            return ['3 Large 2 Medium 1 Small', '1 Large 2 Medium 3 Small','2 Large 2 Medium 2 Small'];
          } else if (selectedPassengers === '4') {
            return ['1 Large 1 Medium 2 Small', ' 2 Medium 2 Small'];
          } else if (selectedPassengers === '5') {
            return ['1 Large 1 Medium', '2 Medium 1 Small'];
          }
          // Logic for SUV suitcase options
        } else if (selectedType.toLowerCase() === 'minisuv') {
          if (selectedPassengers === '1' ) {
            return [' 3 Medium, 3 Small', '2 Large 2 Medium 2 Small'];
          } else if (selectedPassengers === '2') {
            return [' 3 Medium, 3 Small', '2 Large 2 Medium 2 Small'];
          } else if (selectedPassengers === '3') {
            return [' 3 Medium 3 Small','2 Large 2 Medium 2 Small'];
          } else if (selectedPassengers === '4') {
            return ['1 Large 1 Medium 1 Small', '2 Medium 1 Small'];
          } else if (selectedPassengers === '5') {
            return [' 2 Medium 1 Small', '1 Large 1 Small'];
          }
          // Logic for MiniSUV suitcase options
        }
        // Return a default if none of the conditions match
        return [];
      };
  
  
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true); // Set loading state to true when fetching data
        const data = await firebase.firestore().collection('CarData').where('services', '==', 'Pune Mumbai').get();
        const modifiedData = data.docs.map((doc) => doc.data());
       
        setTravelData(modifiedData);
        setLoading(false); // Set loading state to false after data is fetched
      };
      fetchData();
    }, []);
  
    const filteredTravelData = handleFilter();

    const handleSelect = (selectedItem) => {
      const { vehicleType, brand, price, passenger, suitcase } = selectedItem;
    
      // Navigate to the contact page with selected vehicle type, brand, price, passengers, and suitcase
      router.push({
        pathname: '/contactdetails', // Assuming the contact page file is named ContactPage.js
        query: {
          selectedVehicleType: vehicleType,
          selectedBrand: brand,
          selectedPrice: price,
          selectedPassenger: selectedPassengers,
          selectedSuitcase: selectedSuitcase,
          selectedPickupLocation: pickupLocation,
          selectedDropoffLocation: dropoffLocation,
          selectedPickupDate: pickupDate,
          selectedService:'Mumbai To Pune ',
        },
      });
    };
    

    return (
        <div className="bg-white dark:bg-white min-h-screen">
            <div className="flex items-center justify-center p-2">
                <div className=" ">
                <div className="md:px-16 md:py-16 px-6 py-4">
    <h2 className="sr-only">Steps</h2>
  
    <div
      className="after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200"
    >
      <ol className="grid grid-cols-3 text-sm font-medium text-gray-500">
        <li className="relative flex justify-start text-green-600">
          <span
            className="absolute -bottom-[1.75rem] start-0 rounded-full bg-green-600 text-white"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </span>
  
          <span className="hidden sm:block"> Choose a Vehicle </span>
  
          <svg
            className=" h-6 w-6 sm:hidden"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </li>
  
        <li className="relative flex justify-center text-gray-800">
          <span
            className="absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full bg-gray-800 text-white"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </span>
  
          <span className="hidden sm:block"> Enter Contact Details </span>
  
        
          <svg
            className="h-6 w-6 sm:hidden"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
            />
          </svg>
        </li>
  
        <li className="relative flex justify-end">
          <span
            className="absolute -bottom-[1.75rem] end-0 rounded-full bg-gray-600 text-white"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </span>
  
          <span className="hidden sm:block"> Booking Summary </span>
  
          <svg
            className="h-6 w-6 sm:hidden"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </li>
      </ol>
    </div>
  </div>
                    <div className="hidden lg:block">
                        <div style={{ display: 'flex', flexDirection: 'row', }}>
                            <div style={{ width: '35%', margin: 'auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '5px', }}>
                                <h2 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px' }}>Summary</h2>
                                <div>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>Service Type</strong> <br /> <span style={{ color: '#777', fontSize: '14px' }}>Distance</span></p>

                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>Transfer Type</strong><br /> <span style={{ color: '#777', fontSize: '14px' }}>One Way</span></p>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>PICKUP LOCATION</strong><br /> <span style={{ color: '#777', fontSize: '14px' }}>{pickupLocation}</span></p>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>Drop-off location</strong> <br /><span style={{ color: '#777', fontSize: '14px' }}>{dropoffLocation}</span></p>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>PICKUP DATE, TIME</strong><br /> <span style={{ color: '#777', fontSize: '14px' }}>{pickupDate}</span></p>
                                   
                                </div>
                            </div>


                            <div style={{ width: '80%', backgroundColor: 'white', padding: '20px', borderRadius: '8px' ,marginLeft:'24px'}}>
                                <h2 className="text-[#541e50]" style={{ textAlign: 'center', fontSize: '1.5rem', margin: '0 0 1rem' }}>Vehicle Filter</h2>
                                <div className="flex justify-center">
  <div className="py-2 px-16 rounded-lg">
    <fieldset>
      <div className="flex justify-center gap-4">
        <button
          className={`px-4 py-2 rounded-lg focus:outline-none ${selectedType === 'sedan' ? 'bg-[#541e50] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handleTypeChange('sedan')}
        >
          Sedan
        </button>
        <button
          className={`px-4 py-2 rounded-lg focus:outline-none ${selectedType === 'miniSuv' ? 'bg-[#541e50] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handleTypeChange('miniSuv')}
        >
          MiniSUV
        </button>
        <button
          className={`px-4 py-2 rounded-lg focus:outline-none ${selectedType === 'suv' ? 'bg-[#541e50] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handleTypeChange('suv')}
        >
          SUV
        </button>
        {/* Add more buttons for additional options */}
      </div>
    </fieldset>
  </div>
</div>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            
                                    <div style={{ flex: '1', padding: '2rem', background: '#F3F4F6', borderRadius: '8px',  }}>
                                    <label htmlFor="passengers" style={{ display: 'block', fontSize: '1rem', marginBottom: '0.5rem', color: '#4B5563' }}>Passengers</label>
                     <select
    id="passengers"
    style={{ width: '100%', padding: '0.5rem', borderRadius: '0px', border: '1px solid green' }}
    value={selectedPassengers}
    onChange={(e) => setSelectedPassengers(e.target.value)}
  >
    {getPassengerOptions().map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
  </select>
                                    </div>
                                    <div style={{ flex: '1', padding: '2rem', background: '#F3F4F6', borderRadius: '8px', }}>
  <label htmlFor="suitcase" style={{ display: 'block', fontSize: '1rem', marginBottom: '0.5rem', color: '#4B5563' }}>Suitcase</label>
  <select
    id="suitcase"
    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid green' }}
    value={selectedSuitcase}
    onChange={(e) => setSelectedSuitcase(e.target.value)}
  >
    {getSuitcaseOptions().map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
  </select>
</div>

                                </div>
              

                                <div class="flex flex-col justify-center ">
                             
                                {loading ? ( // Show "Loading..." message while data is being fetched
           <div className="bg-white">
           <div className="px-4 py-12 bg-white">
             <div className="mx-auto flex justify-center">
               <div className="relative">
                 <div className="w-[160px] h-[160px] border border-indigo-400 rounded-full" />
                 <div className="w-[140px] h-[140px] border border-indigo-400 rounded-full absolute top-2.5 right-2.5" />
                 <div>
                   <svg
                     className="absolute top-[22px] right-[26px] animate-spin"
                     width={113}
                     height={113}
                     viewBox="0 0 113 113"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path
                       d="M56.7631 110.374C46.061 110.374 35.5993 107.2 26.7008 101.255C17.8023 95.3088 10.8668 86.8579 6.77128 76.9704C2.67576 67.083 1.60419 56.2031 3.69207 45.7066C5.77994 35.2102 10.9335 25.5686 18.501 18.001C26.0686 10.4335 35.7102 5.27994 46.2066 3.19207C56.7031 1.10419 67.583 2.17576 77.4704 6.27128C87.3579 10.3668 95.8088 17.3023 101.755 26.2008C107.7 35.0993 110.874 45.561 110.874 56.2631"
                       stroke="#4338CA"
                       strokeWidth={2}
                       strokeLinecap="round"
                       strokeDasharray="16 16"
                     />
                   </svg>
                 </div>
               </div>
             </div>
             <p className="text-center text-gray-600 text-base mt-4">
               Your Request Is Being Loaded, Please Wait
             </p>
           </div>
         </div>
          ) : filteredTravelData.length === 0 ? ( // Show "No Data" message when no data is available after filtering
            <p>No Data</p>
          ) : (
            filteredTravelData.map((item, index) => (
                <div key={index} className="relative mb-2 mt-2 max-w-xs md:max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 border border-[#541e50] bg-white">
                  <div style={{ width: '30%' }}>
                    <img src={item.carImage} alt={item.brand} className="rounded-xl" />
                  </div>
                  <div style={{ width: '70%', paddingLeft: '20px' }}>
                    <h3 className="font-black text-gray-800 md:text-3xl text-xl uppercase">{item.vehicleType}</h3>
                    <p className="text-4xl font-black font-normal text-[#541e50]">{`₹${item.price}`}</p>
                    <div className="flex flex-row items-center" onClick={toggleMoreInfo}>
                      <p className="text-xl font-normal font-black text-gray-800 uppercase cursor-pointer">
                        {showMoreInfo ? 'Less Info' : 'More Info'}
                      </p>
                      {showMoreInfo ? (
                        <ChevronUpIcon className="h-10 w-10 text-[#541e50] ml-2 cursor-pointer" />
                      ) : (
                        <ChevronDownIcon className="h-10 w-10 text-[#541e50] ml-2 cursor-pointer" />
                      )}
                         <div className="flex flex-row ml-16">
                        <UserIcon className="h-5 w-5 text-gray-800 ml-2" />
                        <p className="text-gray-800 text-sm ml-1">{selectedPassengers} People</p>
                        <ShoppingBagIcon className="h-5 w-5 text-gray-800 ml-2" />
                        <p className="text-gray-800 text-sm ml-1">{selectedSuitcase} Bags</p>
                      </div>
                    </div>
                    {showMoreInfo && (
                        <div>
  {selectedType.toLowerCase() === 'sedan' && (
   <div style={{ textAlign: 'center', marginTop: '20px' }}>
   <div className="bg-gray-100 p-6 rounded-lg border border-[#541e50] shadow-md max-w-md mx-auto mt-8">
   <h2 className="text-xl font-semibold mb-4">Taxi Charges Information</h2>

   <p className="text-gray-700 mb-2">
     For the first 8 hours of travel and up to 80 kilometers, standard charges apply.
   </p>
   <p className="text-gray-700 mb-2">
     After 8 hours, additional charges of ₹ 250 per hour will be added.
   </p>
   <p className="text-gray-700 mb-2">
     After 80 kilometers, extra charges of ₹ 15 per kilometer will be applied.
   </p>
 </div>
 </div>
  )}

  {selectedType.toLowerCase() === 'minisuv' && (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <div className="bg-gray-100 p-6 rounded-lg border border-[#541e50] shadow-md max-w-md mx-auto mt-8">
    <h2 className="text-xl font-semibold mb-4">Taxi Charges Information</h2>

    <p className="text-gray-700 mb-2">
      For the first 8 hours of travel and up to 80 kilometers, standard charges apply.
    </p>
    <p className="text-gray-700 mb-2">
      After 8 hours, additional charges of ₹ 300 per hour will be added.
    </p>
    <p className="text-gray-700 mb-2">
      After 80 kilometers, extra charges of ₹ 18 per kilometer will be applied.
    </p>
  </div>
  </div>
  )}

  {selectedType.toLowerCase() === 'suv' && (
 <div style={{ textAlign: 'center', marginTop: '20px' }}>
 <div className="bg-gray-100 p-6 rounded-lg border border-[#541e50] shadow-md max-w-md mx-auto mt-8">
 <h2 className="text-xl font-semibold mb-4">Taxi Charges Information</h2>

 <p className="text-gray-700 mb-2">
   For the first 8 hours of travel and up to 80 kilometers, standard charges apply.
 </p>
 <p className="text-gray-700 mb-2">
   After 8 hours, additional charges of ₹ 350 per hour will be added.
 </p>
 <p className="text-gray-700 mb-2">
   After 80 kilometers, extra charges of ₹ 22 per kilometer will be applied.
 </p>
</div>
</div>
  )}
</div>
                    )}
                    <button className="bg-[#541e50] w-full hover:bg-[#541e50] text-white font-bold py-2 px-4 rounded-xl mt-2" onClick={() => handleSelect(item)}>
                      Book This Vehicle
                    </button>
                  </div>
                </div>
              </div>
              
     ))
     )}
                                    
                                </div>
                            </div>




                        </div>
                    </div>

                    <div className="md:hidden">
                    <div >
                                <h2 className="text-[#541e50] text-center mb-4 text-xl font-bold" >Vehicle Filter</h2>
                                <div className="flex justify-center">
  <div className="py-2 px-16 rounded-lg">
    <fieldset>
      <div className="flex justify-center gap-4">
        <button
          className={`px-4 py-2 rounded-lg focus:outline-none ${selectedType === 'sedan' ? 'bg-[#541e50] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handleTypeChange('sedan')}
        >
          Sedan
        </button>
        <button
          className={`px-4 py-2 rounded-lg focus:outline-none ${selectedType === 'miniSuv' ? 'bg-[#541e50] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handleTypeChange('miniSuv')}
        >
          MiniSUV
        </button>
        <button
          className={`px-4 py-2 rounded-lg focus:outline-none ${selectedType === 'suv' ? 'bg-[#541e50] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handleTypeChange('suv')}
        >
          SUV
        </button>
        {/* Add more buttons for additional options */}
      </div>
    </fieldset>
  </div>
</div>
                                <div className="flex flex-col bg-gray-200 p-2 rounded-md">
                                    <div >
                                    <label htmlFor="passengers" style={{ display: 'block', fontSize: '1rem', marginBottom: '0.5rem', color: '#4B5563' }}>Passengers</label>
                     <select
    id="passengers"
    style={{ width: '100%', padding: '0.5rem', borderRadius: '0px', border: '1px solid green' }}
    value={selectedPassengers}
    onChange={(e) => setSelectedPassengers(e.target.value)}
  >
    {getPassengerOptions().map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
  </select>
                                    </div>
                                    <div style={{ flex: '1',  borderRadius: '8px', }}>
  <label htmlFor="suitcase" style={{ display: 'block', fontSize: '1rem', marginBottom: '0.5rem', color: '#4B5563' }}>Suitcase</label>
  <select
    id="suitcase"
    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid green' }}
    value={selectedSuitcase}
    onChange={(e) => setSelectedSuitcase(e.target.value)}
  >
    {getSuitcaseOptions().map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
  </select>
</div>

                                </div>


                                <div class="flex flex-col justify-center ">
                             
                                {loading ? ( // Show "Loading..." message while data is being fetched
           <div className="bg-white">
           <div className="px-4 py-12 bg-white">
             <div className="mx-auto flex justify-center">
               <div className="relative">
                 <div className="w-[160px] h-[160px] border border-indigo-400 rounded-full" />
                 <div className="w-[140px] h-[140px] border border-indigo-400 rounded-full absolute top-2.5 right-2.5" />
                 <div>
                   <svg
                     className="absolute top-[22px] right-[26px] animate-spin"
                     width={113}
                     height={113}
                     viewBox="0 0 113 113"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path
                       d="M56.7631 110.374C46.061 110.374 35.5993 107.2 26.7008 101.255C17.8023 95.3088 10.8668 86.8579 6.77128 76.9704C2.67576 67.083 1.60419 56.2031 3.69207 45.7066C5.77994 35.2102 10.9335 25.5686 18.501 18.001C26.0686 10.4335 35.7102 5.27994 46.2066 3.19207C56.7031 1.10419 67.583 2.17576 77.4704 6.27128C87.3579 10.3668 95.8088 17.3023 101.755 26.2008C107.7 35.0993 110.874 45.561 110.874 56.2631"
                       stroke="#4338CA"
                       strokeWidth={2}
                       strokeLinecap="round"
                       strokeDasharray="16 16"
                     />
                   </svg>
                 </div>
               </div>
             </div>
             <p className="text-center text-gray-600 text-base mt-4">
               Your Request Is Being Loaded, Please Wait
             </p>
           </div>
         </div>
          ) : filteredTravelData.length === 0 ? ( // Show "No Data" message when no data is available after filtering
            <p>No Data</p>
          ) : (
            filteredTravelData.map((item, index) => (
                <div key={index} className="rounded-xl shadow-lg border border-[#541e50] bg-white p-3 mb-4 mt-2">
  <div className="flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0">
    <div style={{ width: '100%', textAlign: 'center' }}>
      <img src={item.carImage} alt={item.brand} className="rounded-xl w-full" />
    </div>
    <div style={{ width: '100%', paddingLeft: '0px' }}>
      <h3 className="font-black text-gray-800 md:text-3xl text-xl text-center mt-2 uppercase">{item.vehicleType}</h3>
      <button className="bg-[#541e50] hover:bg-[#541e50] w-full mt-2 mb-2 text-white font-bold py-2 px-4 rounded-xl" onClick={() => handleSelect(item)}>
          Book This Vehicle
        </button>
      <p className="text-4xl font-black font-normal text-[#541e50] text-center">{`₹${item.price}`}</p>
      <div className="flex flex-row ml-16">
                        <UserIcon className="h-5 w-5 text-gray-800 ml-2" />
                        <p className="text-gray-800 text-sm ml-1">{selectedPassengers} People</p>
                        <ShoppingBagIcon className="h-5 w-5 text-gray-800 ml-2" />
                        <p className="text-gray-800 text-sm ml-1">{selectedSuitcase} Bags</p>
                      </div>
      <div className="flex flex-col items-center justify-center mt-2">
      
        <div className="flex flex-row items-center justify-center" onClick={toggleMoreInfo}>
          <p className="text-base font-bold text-gray-800 uppercase cursor-pointer">
            {showMoreInfo ? 'Less Info' : 'More Info'}
          </p>
          {showMoreInfo ? (
            <ChevronUpIcon className="h-6 w-6 text-[#541e50] ml-2 cursor-pointer" />
          ) : (
            <ChevronDownIcon className="h-6 w-6 text-[#541e50] ml-2 cursor-pointer" />
          )}
        </div>
        {showMoreInfo && (
            <div>
            {selectedType.toLowerCase() === 'sedan' && (
             <div style={{ textAlign: 'center', marginTop: '20px' }}>
             <div className="bg-gray-100 p-6 rounded-lg border border-[#541e50] shadow-md max-w-md mx-auto mt-8">
             <h2 className="text-xl font-semibold mb-4">Taxi Charges Information</h2>
          
             <p className="text-gray-700 mb-2">
               For the first 8 hours of travel and up to 80 kilometers, standard charges apply.
             </p>
             <p className="text-gray-700 mb-2">
               After 8 hours, additional charges of ₹ 250 per hour will be added.
             </p>
             <p className="text-gray-700 mb-2">
               After 80 kilometers, extra charges of ₹ 15 per kilometer will be applied.
             </p>
           </div>
           </div>
            )}
          
            {selectedType.toLowerCase() === 'minisuv' && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <div className="bg-gray-100 p-6 rounded-lg border border-[#541e50] shadow-md max-w-md mx-auto mt-8">
              <h2 className="text-xl font-semibold mb-4">Taxi Charges Information</h2>
          
              <p className="text-gray-700 mb-2">
                For the first 8 hours of travel and up to 80 kilometers, standard charges apply.
              </p>
              <p className="text-gray-700 mb-2">
                After 8 hours, additional charges of ₹ 300 per hour will be added.
              </p>
              <p className="text-gray-700 mb-2">
                After 80 kilometers, extra charges of ₹ 18 per kilometer will be applied.
              </p>
            </div>
            </div>
            )}
          
            {selectedType.toLowerCase() === 'suv' && (
           <div style={{ textAlign: 'center', marginTop: '20px' }}>
           <div className="bg-gray-100 p-6 rounded-lg border border-[#541e50] shadow-md max-w-md mx-auto mt-8">
           <h2 className="text-xl font-semibold mb-4">Taxi Charges Information</h2>
          
           <p className="text-gray-700 mb-2">
             For the first 8 hours of travel and up to 80 kilometers, standard charges apply.
           </p>
           <p className="text-gray-700 mb-2">
             After 8 hours, additional charges of ₹ 350 per hour will be added.
           </p>
           <p className="text-gray-700 mb-2">
             After 80 kilometers, extra charges of ₹ 22 per kilometer will be applied.
           </p>
          </div>
          </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
</div>

     ))
     )}
                                    
                                </div>
                            </div>
                            <div className="bg-gray-200 p-2 rounded-md">
                            <h2 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px' }}>Summary</h2>
                                <div>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>Service Type</strong> <br /> <span style={{ color: '#777', fontSize: '14px' }}>Distance</span></p>

                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>Transfer Type</strong><br /> <span style={{ color: '#777', fontSize: '14px' }}>One Way</span></p>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>PICKUP LOCATION</strong><br /> <span style={{ color: '#777', fontSize: '14px' }}>{pickupLocation}</span></p>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>Drop-off location</strong> <br /><span style={{ color: '#777', fontSize: '14px' }}>{dropoffLocation}</span></p>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>PICKUP DATE, TIME</strong><br /> <span style={{ color: '#777', fontSize: '14px' }}>{pickupDate}</span></p>
                                   
                                </div>
                            </div>


                    </div>
                    
                


                  

                </div>
            </div>
        </div>
    );
}

export default MyApp;
