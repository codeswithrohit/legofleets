import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { firebase } from "../Firebase/config";
import { ChevronDownIcon, ChevronUpIcon, UserIcon, ShoppingBagIcon } from '@heroicons/react/solid';
const ContactSummary = () => {
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
  const handleProceedToPayment = (event) => {
    event.preventDefault();
    // Check if any required field is empty
    const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'youaddress'];
    const emptyFields = requiredFields.filter(field => !document.getElementById(field).value);
    if (emptyFields.length > 0) {
      alert('Please fill in all required fields: ' + emptyFields.join(', '));
      return;
    }
    // Proceed to payment review
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
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        youaddress: document.getElementById('youaddress').value,
        comment: document.getElementById('comment').value,
      },
    });
  };

  
  return (
    <div className='min-h-screen'>
      <div class="font-[sans-serif] bg-gray-50">
      <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 h-full">
        <div class="bg-[#3f3f3f] lg:h-screen lg:sticky lg:top-0">
          <div class="relative h-full">
            <div class="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)]">
              <div class="space-y-6 mt-10">
              <div class="lg:border-l lg:pl-8">
            <ul class="text-white mt-6 space-y-4">
              
                          <h3 class="text-xl font-bold text-white">Booking Details</h3>
                           <li class="flex flex-wrap gap-4 text-sm">Service <span class="ml-auto font-bold">{selectedService}</span></li>
                           <li class="flex flex-wrap gap-4 text-sm">Pickup location <span class="ml-auto font-bold">{selectedPickupLocation}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Drop-off location <span class="ml-auto font-bold">{selectedDropoffLocation}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Vehicle<span class="ml-auto font-bold">{selectedVehicleType}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Passenger<span class="ml-auto font-bold">{selectedPassenger}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Suitcase<span class="ml-auto font-bold">{selectedSuitcase}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Pickup Date<span class="ml-auto font-bold">{selectedPickupDate}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Dop-off Date<span class="ml-auto font-bold">{selectedDropoffDate}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Distance<span class="ml-auto font-bold">{selectedDistance}</span></li>
              <li class=" border-t pt-4"></li>
            </ul>
          </div>
                
              </div>
            </div>
            <div class="absolute left-0 bottom-0 bg-[#444] w-full p-4">
              <h4 class="flex flex-wrap gap-4 text-base text-white">Total <span class="ml-auto">₹{selectedPrice}</span></h4>
            </div>
          </div>
        </div>
        <div class="xl:col-span-2 h-max rounded-md p-8 sticky top-0">
        <div className=" px-6 py-4">
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
          <h2 class="text-2xl font-bold text-[#333]">Complete your order</h2>
          <form class="mt-10">
            <div>
              <h3 class="text-lg font-bold text-[#333] mb-6">Personal Details</h3>
              <div class="grid sm:grid-cols-2 gap-6">
                <div class="relative flex items-center">
                  <input aria-label="firstName" required  type="text" name="firstName" id="firstName" placeholder="Enter Your First name"
                    class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"></path>
                  </svg>
                </div>
                <div class="relative flex items-center">
                  <input aria-label="lastName" required  type="text" name="lastName" id="lastName" placeholder="Enter Your Last name"
                    class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"></path>
                  </svg>
                </div>
                <div class="relative flex items-center">
                  <input  aria-label="emailAddress" required type="email" name="email" id="email" placeholder="Email address" 
                    class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 682.667 682.667">
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                      </clipPath>
                    </defs>
                    <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                      <path fill="none" stroke-miterlimit="10" stroke-width="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"></path>
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"></path>
                    </g>
                  </svg>
                </div>
                <div class="relative flex items-center">
                  <input aria-label="phoneNumber" required  type="number" name="phoneNumber" id="phoneNumber" placeholder="Phone Number"
                    class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                  <svg fill="#bbb" class="w-[18px] h-[18px] absolute right-4" viewBox="0 0 64 64">
                    <path
                      d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                      data-original="#000000"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div class="mt-6">
              <h3 class="text-lg font-bold text-[#333] mb-6">Your Address</h3>
              <div class="grid sm:grid-cols-2 gap-6">
                <input   aria-label="youaddress"
     
     name="youaddress"
     id="youaddress"
     required
     placeholder="Flat/House Number"
                  class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                <input   aria-label="youaddress"

value={selectedPickupLocation}
required
                  class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                <input  aria-label="comment"

name="comment"
id="comment"
placeholder="Your comment/message"
                  class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />

              </div>
              <div class="flex gap-6 max-sm:flex-col mt-10">
                <button onClick={handleBack} class="rounded-md px-6 py-3 w-full text-sm font-semibold bg-transparent hover:bg-gray-100 border-2 text-[#333]">Back</button>
                <button onClick={handleProceedToPayment} class="rounded-md px-6 py-3 w-full text-sm font-semibold bg-[#333] text-white hover:bg-[#222]">Reviw Order</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ContactSummary