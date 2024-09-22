import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import { firebase } from '../Firebase/config';
import { format, addHours } from 'date-fns';
const db = firebase.firestore();

const BookingSummary = () => {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
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
    arrivaldeparturetime,
    flightnumber
  } = router.query;

  const submitBookingData = async () => {
    try {
      const currentDate = new Date();
      const formattedCurrentDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
  
      // Generate the order ID
      const orderId = await generateOrderId();
      if (!orderId) throw new Error("Failed to generate order ID");

      const docRef = await db.collection('bookings').add({
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
        arrivaldeparturetime,
        flightnumber,
        bookingDate: formattedCurrentDate, 
        orderId, // Store the generated order ID
      });
      return docRef.id;
    } catch (error) {
      console.error('Error submitting booking data:', error);
      return null;
    }
  };
  
  // Function to generate a unique order ID
  const generateOrderId = async () => {
    // Get the current year
    const year = new Date().getFullYear();

    try {
      // Get the current serial number from Firestore
      const serialDocRef = db.collection('orderSerial').doc('currentSerial');
      const serialDoc = await serialDocRef.get();

      let currentSerial = 1; // Default to 1 if no serial is found
      if (serialDoc.exists) {
        currentSerial = serialDoc.data().serial;
      }

      // Increment the serial number
      const newSerial = currentSerial + 1;

      // Save the new serial number back to Firestore
      await serialDocRef.set({ serial: newSerial });

      // Concatenate "LF", the year, and the incremented serial number
      const serialString = newSerial.toString().padStart(5, '0');
      const orderId = `LF${year}$-{serialString}`;

      return orderId;
    } catch (error) {
      console.error('Error generating order ID:', error);
      return null;
    }
  };
  

  const initiatePayment = async () => {
    try {
      setLoading(true);
      // Submit booking data to the database
      const docId = await submitBookingData();

      if (!docId) {
        toast.error('Failed to submit booking data.');
        return;
      }

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
          router.push(`/confirmation?id=${docId}`); // Redirect to confirmation page with Firebase document ID
          // Send confirmation email
    //       await axios.post('/api/sendEmail', {
    //         selectedVehicleType,
    //         selectedBrand,
    //         selectedPrice,
    //         selectedPassenger,
    //         selectedSuitcase,
    //         selectedPickupLocation,
    //         selectedDropoffLocation,
    //         selectedPickupDate,
    //         selectedDistance,
    //         selectedService,
    //         selectedDropoffDate,
    //         firstName,
    //         lastName,
    //         email,
    //         phoneNumber,
    //         youaddress,
    //         comment,
    //         docId,
    //         arrivaldeparturetime,
    // flightnumber
    //       });
    //       await axios.post('/api/sendMessage', {
    //         selectedVehicleType,
    //         selectedBrand,
    //         selectedPrice,
    //         selectedPassenger,
    //         selectedSuitcase,
    //         selectedPickupLocation,
    //         selectedDropoffLocation,
    //         selectedPickupDate,
    //         selectedDistance,
    //         selectedService,
    //         selectedDropoffDate,
    //         firstName,
    //         lastName,
    //         email,
    //         phoneNumber,
    //         youaddress,
    //         comment,
    //         docId,
    //         arrivaldeparturetime,
    // flightnumber
    //       });
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
  const calculatedDropoffDate = selectedDropoffDate 
  ? selectedDropoffDate 
  : addHours(new Date(selectedPickupDate), 6);  // Add 6 hours if drop-off date is missing

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  const isFlightNumberAvailable = flightnumber && flightnumber !== '';
  const istimedepAvailable = arrivaldeparturetime && arrivaldeparturetime !== '';
  const isdropdate = selectedDropoffDate && selectedDropoffDate !== '';
  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };
  return (
    <div className='min-h-screen'>
      
      <div class="font-[sans-serif] bg-[#c9d454]">
      <div class=" bg-[#541e50] w-full p-2 h-12">
              <h3 className="text-xl text-center lg:text-2xl dark:text-white font-bold leading-5  mb-2 text-[#c9d454]">Booking Summary</h3>
              </div>
      <div className="md:px-16  bg-[#c9d454] px-6 py-4">
      
    <h2 className="sr-only">Steps</h2>
  
    <div
      className="after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200"
    >
      <ol className="grid grid-cols-3 font-bold text-md font-medium text-gray-500">
      <li className="relative flex justify-start text-[#541e50] font-bold">
          <span
            className="absolute -bottom-[1.75rem] start-0 rounded-full bg-[#541e50] font-bold text-white"
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
  
          <span className="hidden sm:block text-md"> Choose a Vehicle </span>
  
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
  
        <li className="relative flex  justify-center text-[#541e50] font-bold">
          <span
            className="absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full bg-[#541e50] font-bold text-white"
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
  
          <span className="hidden sm:block text-md"> Enter Contact Details </span>
  
        
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
  
        <li className="relative flex justify-end text-[#541e50] font-bold">
          <span
            className="absolute -bottom-[1.75rem] end-0 rounded-full bg-[#541e50] font-bold text-white"
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
  
          <span className="hidden sm:block text-md"> Booking Summary </span>
  
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
      <div class="grid lg:grid-cols-1 xl:grid-cols-1 gap-2 h-full">
        <div class="bg-[#c9d454]  lg:sticky lg:top-0">
          <div class="relative h-full">
            <div class="p-8 lg:overflow-auto ">
              <div class="space-y-2 ">
              <div class="lg:border-l lg:pl-8">
            <h3 class="text-xl font-bold text-[#541e50]">Customer Details</h3>
            <ul class="text-white  mt-2 space-y-2">
              <li class="font-bold text-md text-[#541e50]">Name:   <span class="ml-auto font-normal text-gray-900">{firstName} {lastName}</span></li>
              <li class="font-bold text-md text-[#541e50]">Email:   <span class="ml-auto font-normal text-gray-900">{email}</span></li>
              <li class="font-bold text-md text-[#541e50]">Mobile No.:   <span class="ml-auto font-normal text-gray-900">{phoneNumber}</span></li>
              <li class="font-bold text-md text-[#541e50]">Address:  <span class="ml-auto font-normal text-gray-900">{youaddress}</span></li>
              {isFlightNumberAvailable && (
                      <li className="font-bold text-[#541e50] text-md">Flight Number:  <span className="ml-auto text-gray-900">{flightnumber}</span></li>
                    )}
                     {istimedepAvailable && (
              <li class="font-bold text-[#541e50] text-md">Arrival/Departure Time:  <span class="ml-auto font-bold text-gray-900">{arrivaldeparturetime}</span></li>
                     )}
              <li class=" border-t pt-4"></li>
                          <h3 class="text-xl font-bold text-[#541e50]">Booking Details</h3>
                           <li class="font-bold text-md text-[#541e50]">Service:  <span class="ml-auto font-normal text-gray-900">{selectedService}</span></li>
                           <li class="font-bold text-md text-[#541e50]">Pickup location:  <span class="ml-auto font-normal text-gray-900">{selectedPickupLocation}</span></li>
              <li class="font-bold text-md text-[#541e50]">Drop-off location:  <span class="ml-auto font-normal text-gray-900">{selectedDropoffLocation}</span></li>
              <li class="font-bold text-md text-[#541e50]">Vehicle:  <span class="ml-auto font-normal text-gray-900 uppercase">{selectedVehicleType}</span></li>
              <li class="font-bold text-md text-[#541e50]">Passenger:  <span class="ml-auto font-normal text-gray-900">{selectedPassenger}</span></li>
              <li class="font-bold text-md text-[#541e50]">Suitcase:  <span class="ml-auto font-normal text-gray-900">{selectedSuitcase}</span></li>
              <li class="font-bold text-md text-[#541e50]">Pickup Date:  <span class="ml-auto font-normal text-gray-900"> {format(new Date(selectedPickupDate), 'dd-MMM-yy h:mm aa')}</span></li>
           
              <li class="font-bold text-md text-[#541e50]">Dop-off Date:  <span class="ml-auto font-normal text-gray-900"> {format(new Date(calculatedDropoffDate), 'dd-MMM-yy h:mm aa')}</span></li>
            
              <li class="font-bold text-md text-[#541e50]">Comment:  <span class="ml-auto font-normal text-gray-900">{comment}</span></li>
              <li class="font-bold text-md text-[#541e50]">Distance:  <span class="ml-auto font-normal text-gray-900">{selectedDistance}</span></li>
              {/* <li class="font-bold text-md text-[#541e50]">Comment:  <span class="ml-auto font-normal text-gray-900"></span></li> */}
              <li class=" border-t pt-4"></li>
            </ul>
          </div>
                
              </div>
            </div>
            <label className="flex items-start space-x-3 cursor-pointer mb-40 px-6">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className="text-gray-700">
        By ticking this box,  you are agreeing with the{" "}
          <a href="/terms" target="_blank"  className="text-blue-600 underline hover:text-blue-800">
            Terms & Conditions
          </a>{" "}
          for this booking.
        </span>
      </label>
            <div class="absolute flex flex-row justify-between gap-4 left-0 bottom-0 bg-[#541e50] w-full p-4">
            <button onClick={handleBack} type="button" class="w-full px-6 py-3.5 font-bold  bg-[#c9d454] text-[#541e50] rounded-md max-sm:order-1">Back</button>
            <button
  onClick={initiatePayment}
  type="button"
  className={`w-full px-6 py-3.5  font-bold bg-[#c9d454] text-[#541e50] rounded-md hover:bg-[#c9d454] relative ${
    isChecked
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
  disabled={!isChecked}

>
  {loading ? (
    <span className="flex items-center justify-center">
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.014 8.014 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.86 0-7.218-1.549-9.728-4.057l1.729-1.729z"
        ></path>
      </svg>
      Processing...
    </span>
  ) : (
    <>Confirm payment ₹ {selectedPrice}</>
  )}
</button>


            </div>
          </div>
        </div>
       
      </div>
    </div>
    </div>
  )
}

export default BookingSummary