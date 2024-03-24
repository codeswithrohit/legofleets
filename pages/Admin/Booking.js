import React, { useState, useEffect } from 'react';
import { firebase } from '../../Firebase/config';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const snapshot = await firebase.firestore().collection('bookings').get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);
  console.log(bookings)

  return (
    <div className="min-h-screen bg-white ">
      <h1 className='text-black font-bold text-xl text-center py-8' >Booking Data</h1>
     <div className="overflow-x-auto">
     <div className="flex justify-center">
        <ReactHTMLTableToExcel
          id="exportButton"
          className="bg-blue-500 hover:bg-blue-700 mb-2 text-white font-bold py-2 px-4 rounded mt-4"
          table="bookingTable"
          filename="booking_data"
          sheet="booking_data"
          buttonText="Download Booking Data"
        />
      </div>
        <table id="bookingTable" className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drop-off Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Date/Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drop-off Date/Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Address</th>
            </tr>
          </thead>
        <tbody className="bg-white divide-y divide-gray-200">
  {bookings.map((booking, index) => (
    <tr key={booking.id}>
      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.id}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.firstName} {booking.lastName}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.selectedDistance}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.email}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.phoneNumber}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.selectedService}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.selectedPickupLocation}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.selectedDropoffLocation}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.selectedPickupDate}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.selectedDropoffDate}</td>
      <td className="px-6 py-4 whitespace-nowrap uppercase">{booking.selectedVehicleType}</td>
      <td className="px-6 py-4 whitespace-nowrap uppercase">{booking.youaddress}</td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default Booking;
