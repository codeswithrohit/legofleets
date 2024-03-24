import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import { firebase } from '../Firebase/config';

const db = firebase.firestore();

const BookingSummary = () => {

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    selectedDropoffDate,
    firstName,
    lastName,
    email,
    phoneNumber,
    youaddress,
    comment,
  } = router.query;

  const submitBookingData = async () => {
    try {
      await db.collection('bookings').add({
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
        selectedDropoffDate,
        firstName,
        lastName,
        email,
        phoneNumber,
        youaddress,
        comment,
      });
    } catch (error) {
      console.error('Error submitting booking data:', error);
    }
  };

  const initiatePayment = async () => {
    try {
      setLoading(true);
      // Submit booking data to the database
      await submitBookingData();

      // Display payment modal
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        toast.error('Failed to load Razorpay SDK. Please try again later.');
        return;
      }

      const amountInPaise = selectedPrice * 100;

      const options = {
        key: 'rzp_test_td8CxckGpxFssp',
        currency: 'INR',
        amount: amountInPaise,
        name: 'Legofleets',
        description: 'Thanks for purchasing',
        image: 'logo.png',
        handler: async function (response) {
          // Handle payment success
          console.log('Payment Successful:', response);
          toast.success('Payment Successful!');
          router.push(`/confirmation?firstName=${firstName}`);
          // Send confirmation email
          await axios.post('/api/sendEmail', {
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
            selectedDropoffDate,
            firstName,
            lastName,
            email,
            phoneNumber,
            youaddress,
            comment,
          });
          await axios.post('/api/sendMessage', {
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
            selectedDropoffDate,
            firstName,
            lastName,
            email,
            phoneNumber,
            youaddress,
            comment,
          });

          // Redirect to confirmation page
          
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          email: email,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Failed to initiate payment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  
  return (
    <div  >
    
              <div className="md:px-16 md:py-12 px-6 py-4">
              <h3 className="text-xl lg:text-2xl dark:text-white font-bold leading-5 text-center mb-8 text-gray-800">Booking Summary</h3>
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
  
        <li className="relative flex justify-end text-green-600">
          <span
            className="absolute -bottom-[1.75rem] end-0 rounded-full bg-green-600 text-white"
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
    <div className="flex justify-center items-center min-h-screen">
      
      <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-full flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">

        <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
          <div className="flex flex-col justify-start items-start flex-shrink-0">
            <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
              {/* <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" /> */}
              <div className="flex justify-start items-start flex-col space-y-2">
                <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{firstName} {lastName}</p>
                <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">{email}</p>
                <p className="cursor-pointer text-sm leading-5 ">{phoneNumber}</p>
              </div>
            </div>
            {/* <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
              <img className="dark:hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg" alt="email"/>
              <img className="hidden dark:block" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg" alt="email"/>
              <p className="cursor-pointer text-sm leading-5 ">{phoneNumber}</p>
            </div> */}
          </div>
          <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
            <div className="flex justify-center md:justify-start xl:flex flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
              <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Pickup Location</p>
                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{selectedPickupLocation}</p>
              </div>
              <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Drop-off Location</p>
                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{selectedDropoffLocation}</p>
              </div>
              <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Your Address</p>
                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{youaddress}</p>
              </div>
            </div>
            
          </div>
        </div>
        <div className="flex justify-center items-center mt-8 mb-4">
  <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 rounded-md p-6">
    {/* <h4 className="text-lg font-semibold mb-4">Booking Details</h4> */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <div>
        <p className="text-sm text-gray-600"><strong>Vehicle Type:</strong></p>
        <p className="text-base">{selectedVehicleType}</p>
      </div>
      {/* <div>
        <p className="text-sm text-gray-600"><strong>Brand:</strong></p>
        <p className="text-base">{selectedBrand}</p>
      </div> */}
      <div>
        <p className="text-sm text-gray-600"><strong>Price:</strong></p>
        <p className="text-base">₹ {selectedPrice}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600"><strong>Passenger:</strong></p>
        <p className="text-base">{selectedPassenger}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600"><strong>Suitcase:</strong></p>
        <p className="text-base">{selectedSuitcase}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600"><strong>Pickup Date:</strong></p>
        <p className="text-base">{selectedPickupDate}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600"><strong>Drop off Date:</strong></p>
        <p className="text-base">{selectedDropoffDate}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600"><strong>Distance:</strong></p>
        <p className="text-base">{selectedDistance}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600"><strong>Service:</strong></p>
        <p className="text-base">{selectedService}</p>
      </div>
      <div className="col-span-2">
        <p className="text-sm text-gray-600"><strong>Comment:</strong></p>
        <p className="text-base">{comment}</p>
      </div>
    </div>
  </div>
</div>

{loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
      
      ) : null}
      <div className="flex w-full justify-center items-center md:justify-center md:items-center">
        <button
          onClick={initiatePayment}
          className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800"
        >
          Pay Now ₹{selectedPrice}
        </button>
      </div>
      <ToastContainer />
      </div>
    </div>
    </div>
  );
};

export default BookingSummary;
