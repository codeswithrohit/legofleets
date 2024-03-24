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
    <div className='min-h-screen'>
      <div class="font-[sans-serif] bg-gray-50">
      <div class="grid lg:grid-cols-1 xl:grid-cols-1 gap-4 h-full">
        <div class="bg-[#3f3f3f]  lg:sticky lg:top-0">
          <div class="relative h-full">
            <div class="p-8 lg:overflow-auto ">
              <div class="space-y-6 mt-10">
              <div class="lg:border-l lg:pl-8">
            <h3 class="text-xl font-bold text-white">Customer Details</h3>
            <ul class="text-white mt-6 space-y-4">
              <li class="flex flex-wrap gap-4 text-sm">Name <span class="ml-auto font-bold">{firstName} {lastName}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Email <span class="ml-auto font-bold">{email}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Mobile No. <span class="ml-auto font-bold">{phoneNumber}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Flat /House<span class="ml-auto font-bold">{youaddress}</span></li>
              <li class=" border-t pt-4"></li>
                          <h3 class="text-xl font-bold text-white">Booking Details</h3>
                           <li class="flex flex-wrap gap-4 text-sm">Service <span class="ml-auto font-bold">{selectedService}</span></li>
                           <li class="flex flex-wrap gap-4 text-sm">Pickup location <span class="ml-auto font-bold">{selectedPickupLocation}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Drop-off location <span class="ml-auto font-bold">{selectedDropoffLocation}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Vehicle<span class="ml-auto font-bold uppercase">{selectedVehicleType}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Passenger<span class="ml-auto font-bold">{selectedPassenger}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Suitcase<span class="ml-auto font-bold">{selectedSuitcase}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Pickup Date<span class="ml-auto font-bold">{selectedPickupDate}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Dop-off Date<span class="ml-auto font-bold">{selectedDropoffDate}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Distance<span class="ml-auto font-bold">{selectedDistance}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Comment<span class="ml-auto font-bold">{comment}</span></li>
              <li class=" border-t pt-4"></li>
            </ul>
          </div>
                
              </div>
            </div>
            <div class="absolute flex flex-wrap justify-between gap-4 left-0 bottom-0 bg-[#444] w-full p-4">
            <button type="button" class="min-w-[150px] px-6 py-3.5 text-sm bg-white text-[#333] rounded-md max-sm:order-1">Back</button>
            <button
  onClick={initiatePayment}
  type="button"
  className="min-w-[150px] px-6 py-3.5 text-sm bg-[#333] text-white rounded-md hover:bg-[#111] relative"
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