import React, { useState, useEffect } from 'react';
import { firebase } from '../../Firebase/config';
import { useRouter } from 'next/router';
import { format, isToday, isThisWeek, isThisMonth, isThisYear } from 'date-fns';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // Default filter
  const router = useRouter();

  useEffect(() => {
    const isAdminInLocalStorage = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(isAdminInLocalStorage);
    if (!isAdminInLocalStorage) {
      router.push('/Admin/adminlogin');
    }
  }, [router]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const snapshot = await firebase.firestore().collection('bookings').get();
        const data = snapshot.docs.map(doc => {
          const bookingData = { id: doc.id, ...doc.data() };
          // Parse bookingDate to a Date object
          bookingData.bookingDate = new Date(bookingData.bookingDate);
          return bookingData;
        });
        data.sort((a, b) => b.bookingDate - a.bookingDate); // No need for new Date here
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchBookings();
  }, []);

  const filterBookings = (filter) => {
    const now = new Date();
    return bookings.filter(booking => {
      const bookingDate = booking.bookingDate; // Now this is a Date object
      switch (filter) {
        case 'today':
          return isToday(bookingDate);
        case 'thisWeek':
          return isThisWeek(bookingDate, { weekStartsOn: 0 }); // Sunday start
        case 'thisMonth':
          return isThisMonth(bookingDate);
        case 'thisYear':
          return isThisYear(bookingDate);
        case 'all':
          return true;
        default:
          return false;
      }
    });
  };
  

  const displayedBookings = filterBookings(activeFilter);

  // Button Component for Filter
  const FilterButton = ({ filter, label }) => (
    <button
      onClick={() => setActiveFilter(filter)}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {label} ({filterBookings(filter).length})
    </button>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="lg:ml-64">
        <h1 className="text-black font-bold text-xl text-center py-8">Booking Data</h1>
        {/* <div className="flex justify-center space-x-4 mb-4">
          <FilterButton filter="today" label="Today" />
          <FilterButton filter="thisWeek" label="This Week" />
          <FilterButton filter="thisMonth" label="This Month" />
          <FilterButton filter="thisYear" label="This Year" />
          <FilterButton filter="all" label="All" />
        </div> */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <table id="bookingTable" className="min-w-full divide-y divide-gray-200">
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
                {displayedBookings.map((booking, index) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{`${booking.firstName} ${booking.lastName}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.selectedDistance}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.selectedService}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={`/Admin/order?id=${booking.id}`}>View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
