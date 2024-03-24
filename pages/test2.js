import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { firebase } from "../Firebase/config";
import { ChevronDownIcon, ChevronUpIcon, UserIcon, ShoppingBagIcon } from '@heroicons/react/solid';
function MyApp() {
  const router = useRouter();
  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };
  const {
    selectedVehicleType,
    selectedBrand,
    selectedPrice,
    selectedPassenger,
    selectedSuitcase,
    selectedPickupLocation,
    selectedDropoffLocation,
    selectedPickupDate,
    selectedDistance,
    selectedService,
    selectedDropoffDate
  } = router.query;
  // ... (your existing code)
  console.log({
    selectedVehicleType,
    selectedBrand,
    selectedPrice,
    selectedPassenger,
    selectedSuitcase,
    selectedPickupLocation,
    selectedDropoffLocation,
    selectedPickupDate,
    selectedDistance,
    selectedService,
    selectedDropoffDate
  });
  const handleProceedToPayment = () => {
    // Assuming you want to redirect to "bookingsummary" page
    // You can modify the pathname and query as per your requirements
    router.push({
      pathname: '/bookingsummary',
      query: {
        selectedVehicleType,
        selectedBrand,
        selectedPrice,
        selectedPassenger,
        selectedSuitcase,
        selectedPickupLocation,
        selectedDropoffLocation,
        selectedPickupDate,
        selectedDistance,
        selectedDropoffDate,
        selectedService,
        // Add form data to the query
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        youaddress: document.getElementById('youaddress').value,
        comment: document.getElementById('comment').value,
        // Add other necessary data from the contact details form
      },
    });
  };

    return (
        <div className="bg-white dark:bg-white min-h-screen">
            <div className="flex items-center justify-center p-2">
                <div className=" ">
                <div className="md:px-16 md:py-12 px-6 py-4">
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
  
        <li className="relative flex justify-center text-green-600">
          <span
            className="absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full bg-green-600 text-white"
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
                            <div className="w-35">
                            <div style={{ margin: 'auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '5px', }}>
                                <h2 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px' }}>Summary</h2>
                                <div>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>Service Type</strong> <br /> <span style={{ color: '#777', fontSize: '14px' }}>{selectedService}</span></p>
{/* 
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>Transfer Type</strong><br /> <span style={{ color: '#777', fontSize: '14px' }}>One Way</span></p> */}
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>PICKUP LOCATION</strong><br /> <span style={{ color: '#777', fontSize: '14px' }}>{selectedPickupLocation}</span></p>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>Drop-off location</strong> <br /><span style={{ color: '#777', fontSize: '14px' }}>{selectedDropoffLocation}</span></p>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>PICKUP DATE, TIME</strong><br /> <span style={{ color: '#777', fontSize: '14px' }}>{selectedPickupDate}</span></p>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>Drop-off DATE, TIME</strong><br /> <span style={{ color: '#777', fontSize: '14px' }}>{selectedDropoffDate}</span></p>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>Vehicle</strong><br /> <span style={{ color: '#777', fontSize: '28px' }}>{selectedVehicleType}</span></p>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px' }}>
                                        <div style={{ flex: '1', textAlign: 'center' }}>
                                            <p style={{ marginBottom: '10px' }}><strong style={{ color: '#555', fontSize: '16px' }}>Total Distance</strong> <br /><span style={{ color: '#777', fontSize: '14px' }}>{selectedDistance}</span></p>
                                        </div>
                                        {/* <div style={{ flex: '1', textAlign: 'center' }}>
                                            <p style={{ marginBottom: '10px' }}><strong style={{ color: '#555', fontSize: '16px' }}>Total Time</strong> <br /><span style={{ color: '#777', fontSize: '14px' }}>{duration}</span></p>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            </div>

                            <div style={{ width: '80%', backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginLeft: '24px' }}>
                            <div className="lg:container lg:mx-auto grid grid-cols-9 lg:grid-cols-12">
            <div className="col-span-9 lg:col-span-8 xl:col-span-9 bg-white h-auto  relative lg:px-10 p-6 lg:py-2">
                <p onClick={handleBack}>
                    <svg className="inline" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 1L1 5L5 9" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="cursor-pointer text-gray-500 font-normal text-base ml-2.5">Back</span>
                </p>
                <h3 className="font-semibold text-gray-800 text-4xl">Contact Details</h3>

                <div className="mt-2 lg:mt-2">
                    <p className="font-normal text-sm text-gray-600 mb-3">Your details</p>
                    <h3 className="text-2xl text-gray-800 font-medium">Enter your details</h3>

                    <form className="mt-8" autoComplete="off">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            <input aria-label="firstName" required className="border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none" type="text" name="firstName" id="firstName" placeholder="Enter Your First name" />
                            <input aria-label="lastName" required className="border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none" type="text" name="lastName" id="lastName" placeholder="Enter Your Last name" />
                            <input aria-label="emailAddress" required className="border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none" type="email" name="email" id="email" placeholder="Email address" />
                            <input aria-label="phoneNumber" required className="border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none" type="number" name="phoneNumber" id="phoneNumber" placeholder="Phone Number" />
                            <input
          aria-label="youaddress"
          className="border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none" // Adjust height as needed
          name="youaddress"
          id="youaddress"
          required
          placeholder="Flat/House Number"
        />
                            <input
          aria-label="youaddress"
          className="border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none" // Adjust height as needed
          value={selectedPickupLocation}
          required
        />
                       
                            <textarea
          aria-label="comment"
          className="border-2 border-gray-300 p-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none h-20 w-96" // Adjust height as needed
          name="comment"
          id="comment"
          placeholder="Your comment/message"
        ></textarea>
                        </div>
                        {/* <div class="mt-6 border-t border-b py-2">
  <div class="flex items-center justify-between">
    <p class="text-sm font-medium text-gray-900">Subtotal</p>
    <p class="font-semibold text-gray-900">₹ {selectedPrice}</p>
  </div>
  <div class="flex items-center justify-between">
    <p class="text-sm font-medium text-gray-900">To Pay (30% deposit)</p>
    <p class="font-semibold text-gray-900">₹ {(selectedPrice * 0.3).toFixed(2)}</p>
  </div>
</div>
<div class="mt-6 flex items-center justify-between">
  <p class="text-sm font-medium text-gray-900">On Cash Pay</p>
  <p class="text-2xl font-semibold text-gray-900">₹ {(selectedPrice - (selectedPrice * 0.3)).toFixed(2)}</p>
</div> */}

                    </form>
                    
                </div>
                {/* <p class="mt-8 text-lg font-medium">Payment Methods</p>
    <form class="mt-5 grid gap-6">
      <div class="relative">
        <input class="peer hidden" id="radio_1" type="radio" name="radio" checked />
        <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
          <img class="w-14 object-contain" src="https://img.freepik.com/premium-vector/dollar-money-icon-cash-sign-bill-symbol-flat-payment-dollar-currency-icon_41737-1266.jpg?w=2000" alt="" />
          <div class="ml-5">
            <span class="mt-2 font-semibold">Cash On Delivery</span>
            <p class="text-slate-500 text-sm leading-6">Message</p>
          </div>
        </label>
      </div>
      <div class="relative">
        <input class="peer hidden" id="radio_2" type="radio" name="radio" checked />
        <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
          <img class="w-14 object-contain" src="https://static.vecteezy.com/system/resources/previews/019/040/306/original/paytm-logo-icon-free-vector.jpg" alt="" />
          <div class="ml-5">
            <span class="mt-2 font-semibold">Paytm</span>
            <p class="text-slate-500 text-sm leading-6">Message</p>
          </div>
        </label>
      </div>
    </form> */}

                

<button
        className="bg-gray-800 hover:bg-gray-900 text-white p-4 text-lg my-3 mt-10 w-full md:w-auto"
        onClick={handleProceedToPayment}
      >
        Proceed to Payment
      </button>
            </div>
            
           
        </div>
                            </div>




                        </div>
                    </div>

                    <div className="md:hidden">
                    <div className="lg:container lg:mx-auto grid grid-cols-9 lg:grid-cols-12">
            <div className="col-span-9 lg:col-span-8 xl:col-span-9 bg-white h-auto lg:h-screen relative lg:px-10 p-6 lg:py-12">
                <p>
                    <svg className="inline" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 1L1 5L5 9" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="cursor-pointer text-gray-500 font-normal text-base ml-2.5">Back</span>
                </p>
                <h3 className="font-semibold text-gray-800 text-4xl mt-2">Contact Details</h3>

              
                <div className="mt-7 lg:mt-20">
                    <p className="font-normal text-sm text-gray-600 mb-3">Your details</p>
                    <h3 className="text-2xl text-gray-800 font-medium">Enter your details</h3>

                    <form className="mt-8" autoComplete="off">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10">
                            <input aria-label="firstName" className="border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none" type="text" name="firstName" id="firstName" placeholder="Enter Your First name" />
                            <input aria-label="lastName" className="border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none" type="text" name="lastName" id="lastName" placeholder="Enter Your Last name" />
                            <input aria-label="emailAddress" className="border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none" type="email" name="email" id="email" placeholder="Email address" />
                            <input aria-label="phoneNumber" className="border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none" type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone Number" />
                            <textarea
          aria-label="youaddress"
          className="border-2 border-gray-300 mr-2 p-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none h-40 " // Adjust height as needed
          name="youaddress"
          id="youaddress"
          placeholder="Enter Your Address"
        ></textarea>
                            <textarea
          aria-label="comment"
          className="border-2 border-gray-300 p-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none h-40 " // Adjust height as needed
          name="comment"
          id="comment"
          placeholder="Your comment/message"
        ></textarea>
                        </div>
                        {/* <div class="mt-6 border-t border-b py-2">
  <div class="flex items-center justify-between">
    <p class="text-sm font-medium text-gray-900">Subtotal</p>
    <p class="font-semibold text-gray-900">₹ {selectedPrice}</p>
  </div>
  <div class="flex items-center justify-between">
    <p class="text-sm font-medium text-gray-900">To Pay (30% deposit)</p>
    <p class="font-semibold text-gray-900">₹ {(selectedPrice * 0.3).toFixed(2)}</p>
  </div>
</div>
<div class="mt-6 flex items-center justify-between">
  <p class="text-sm font-medium text-gray-900">On Cash Pay</p>
  <p class="text-2xl font-semibold text-gray-900">₹ {(selectedPrice - (selectedPrice * 0.3)).toFixed(2)}</p>
</div> */}

                    </form>
                    
                </div>
                {/* <p class="mt-8 text-lg font-medium">Payment Methods</p>
    <form class="mt-5 grid gap-6">
      <div class="relative">
        <input class="peer hidden" id="radio_1" type="radio" name="radio" checked />
        <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
          <img class="w-14 object-contain" src="https://img.freepik.com/premium-vector/dollar-money-icon-cash-sign-bill-symbol-flat-payment-dollar-currency-icon_41737-1266.jpg?w=2000" alt="" />
          <div class="ml-5">
            <span class="mt-2 font-semibold">Cash On Delivery</span>
            <p class="text-slate-500 text-sm leading-6">Message</p>
          </div>
        </label>
      </div>
      <div class="relative">
        <input class="peer hidden" id="radio_2" type="radio" name="radio" checked />
        <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
          <img class="w-14 object-contain" src="https://static.vecteezy.com/system/resources/previews/019/040/306/original/paytm-logo-icon-free-vector.jpg" alt="" />
          <div class="ml-5">
            <span class="mt-2 font-semibold">Paytm</span>
            <p class="text-slate-500 text-sm leading-6">Message</p>
          </div>
        </label>
      </div>
    </form> */}

<button
        className="bg-gray-800 hover:bg-gray-900 text-white p-4 text-lg my-3 mt-10 w-full md:w-auto"
        onClick={handleProceedToPayment}
      >
        Proceed to Payment
      </button>
            </div>
           
        </div>
                            <div className="bg-gray-200 p-2 rounded-md">
                            <h2 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px' }}>Summary</h2>
                                <div>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>Service Type</strong> <br /> <span style={{ color: '#777', fontSize: '14px' }}>{selectedService}</span></p>

                                    {/* <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>Transfer Type</strong><br /> <span style={{ color: '#777', fontSize: '14px' }}>One Way</span></p> */}
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>PICKUP LOCATION</strong><br /> <span style={{ color: '#777', fontSize: '14px' }}>{selectedPickupLocation}</span></p>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>Drop-off location</strong> <br /><span style={{ color: '#777', fontSize: '14px' }}>{selectedDropoffLocation}</span></p>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>PICKUP DATE, TIME</strong><br /> <span style={{ color: '#777', fontSize: '14px' }}>{selectedPickupDate}</span></p>
                                    <p style={{ marginBottom: '10px', textAlign: 'center' }}><strong style={{ color: '#555', fontSize: '16px' }}>Vehicle</strong><br /> <span style={{ color: '#777', fontSize: '28px' }}>{selectedVehicleType}</span></p>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px' }}>
                                        <div style={{ flex: '1', textAlign: 'center' }}>
                                            <p style={{ marginBottom: '10px' }}><strong style={{ color: '#555', fontSize: '16px' }}>Total Distance</strong> <br /><span style={{ color: '#777', fontSize: '14px' }}>{selectedDistance}</span></p>
                                        </div>
                                        {/* <div style={{ flex: '1', textAlign: 'center' }}>
                                            <p style={{ marginBottom: '10px' }}><strong style={{ color: '#555', fontSize: '16px' }}>Total Time</strong> <br /><span style={{ color: '#777', fontSize: '14px' }}>{duration}</span></p>
                                        </div> */}
                                    </div>
                                </div>
                            </div>


                    </div>






                </div>
            </div>
        </div>
    );
}

export default MyApp;
