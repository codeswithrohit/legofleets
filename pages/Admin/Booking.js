import React, { useState, useEffect } from 'react';
import { firebase } from '../../Firebase/config';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // State variable to track loading status

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const snapshot = await firebase.firestore().collection('bookings').get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort bookings by bookingDate in descending order to get the nearest booking at the top
        data.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
        setBookings(data);
        setLoading(false); // Set loading to false when data fetching is complete
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false); // Set loading to false in case of error as well
      }
    };

    fetchBookings();
  }, []);

  

  return (
    <div className="min-h-screen bg-white ">
      <div className='lg:ml-64' >
      <h1 className='text-black font-bold text-xl text-center py-8' >Booking Data</h1>
     <div className="overflow-x-auto">
     <div className="flex justify-center">
       {loading && ( // Show the loading spinner while loading is true
          <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
       )}
      </div>
        <table id="bookingTable" className={`min-w-full divide-y divide-gray-200 ${loading ? 'hidden' : ''}`}>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View Invoice</th>
            </tr>
          </thead>
        <tbody className="bg-white divide-y divide-gray-200">
  {bookings.map((booking, index) => (
    <tr key={booking.id}>
      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.firstName} {booking.lastName}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.selectedDistance}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.email}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.phoneNumber}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.selectedService}</td>
      <td className="px-6 py-4 whitespace-nowrap">
  <a href={`/Admin/order?id=${booking.id}`}>
    View
  </a>
</td>

    </tr>
  ))}
</tbody>

        </table>
      </div>
      </div>
    </div>
  );
};

export default Booking;
