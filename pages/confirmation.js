import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { firebase } from '../Firebase/config';

const db = firebase.firestore();
import Link from 'next/link';
const Invoice = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      const fetchData = async () => {
        try {
          const doc = await db.collection('bookings').doc(id).get();
          if (doc.exists) {
            setBookingData(doc.data());
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      };
      fetchData();
    }
  }, [router.query]);

  const printInvoice = () => {
    window.print();
  };
  return (
    <div className='min-h-screen' >
       {bookingData ? (
    <div className="bg-white dark:bg-white">
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto ">
        <div className="sm:w-11/12 lg:w-3/4 mx-auto py-4">
        <div className="flex bg-[#541e50] justify-between">
              <div className='p-4' >
              <Link href="/">
                            <img
                                src="logo.png"
                                width={120}
                                height={50}
                                alt="Float UI logo"
                            />
                        </Link>

  
              </div>

              <div className="text-end p-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-white dark:text-white">Invoice #</h2>
                <span className="mt-1 block text-white">{bookingData.orderId}</span>

                <address className="mt-4 not-italic text-white dark:text-white">
                Add : Undri, Pune. 
                </address>
              </div>
            </div>
          <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-sm dark:bg-gray-800">
           

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <div>
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">{bookingData.firstName} {bookingData.lastName}</h3>
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">{bookingData.email}</h3>
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">{bookingData.phoneNumber}</h3>
                <h6 className="text-sm font-bold text-gray-800 dark:text-gray-200">Pickup location:</h6>
                <address className=" not-italic text-gray-500">
                 {bookingData.selectedPickupLocation}
                </address>
                <h6 className="text-sm font-bold text-gray-800 dark:text-gray-200">Drop-off location:</h6>
                <address className="mt-2 not-italic text-gray-500">
                  {bookingData.selectedDropoffLocation}
                </address>
              </div>

              <div className="sm:text-end space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Booking date:</dt>
                    <dd className="col-span-2 text-gray-500">{bookingData.bookingDate}</dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Pickup date:</dt>
                    <dd className="col-span-2 text-gray-500">{bookingData.selectedPickupDate}</dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
  <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Drop-off date:</dt>
  <dd className="col-span-2 text-gray-500">
    {bookingData ? (
      bookingData.selectedDropoffDate ? (
        bookingData.selectedDropoffDate
      ) : (
        // Calculate six hours after pickup date if drop-off date is not available
        bookingData.selectedPickupDate ? (
          new Date(new Date(bookingData.selectedPickupDate).getTime() + 6 * 60 * 60 * 1000).toLocaleString()
        ) : (
          "---------"
        )
      )
    ) : (
      "----------"
    )}
  </dd>
</dl>


                </div>
              </div>

            </div>
            <div class="mt-6">
  <div class="overflow-x-auto">
    <table class="table-auto w-full border-collapse border border-gray-200">
      <thead class="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Service</th>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Vehicle</th>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Passenger</th>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Suitcase</th>
          <th class="px-4 py-2 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Distance</th>
          <th class="px-4 py-2 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Amount</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        <tr>
          <td class="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">{bookingData.selectedService}</td>
          <td class="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 uppercase">{bookingData.selectedVehicleType}</td>
          <td class="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">{bookingData.selectedPassenger}</td>
          <td class="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">{bookingData.selectedSuitcase}</td>
          <td class="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-200">{bookingData.selectedDistance}</td>
          <td class="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-200">₹{bookingData.selectedPrice}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

        <div class="mt-8 flex sm:justify-end">
          <div class="w-full max-w-2xl sm:text-end space-y-2">
         
            <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl class="grid sm:grid-cols-5 gap-x-3">
                <dt class="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Subtotal:</dt>
                <dd class="col-span-2 text-gray-500">₹{bookingData.selectedPrice}</dd>
              </dl>

              <dl class="grid sm:grid-cols-5 gap-x-3">
                <dt class="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Total:</dt>
                <dd class="col-span-2 text-gray-500">₹{bookingData.selectedPrice}</dd>
              </dl>

              {/* <dl class="grid sm:grid-cols-5 gap-x-3">
                <dt class="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Tax:</dt>
                <dd class="col-span-2 text-gray-500">$39.00</dd>
              </dl>

              <dl class="grid sm:grid-cols-5 gap-x-3">
                <dt class="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Amount paid:</dt>
                <dd class="col-span-2 text-gray-500">$2789.00</dd>
              </dl>

              <dl class="grid sm:grid-cols-5 gap-x-3">
                <dt class="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Due balance:</dt>
                <dd class="col-span-2 text-gray-500">$0.00</dd>
              </dl> */}
            </div>
          </div>
        </div>
        <div class="mt-8 sm:mt-12">
          <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Thank you! with </h4>
          <p class="text-gray-500">“If you have any questions concerning this invoice, use the following contact information”</p>
          <div class="mt-2">
            <p class="block text-sm font-medium text-gray-800 dark:text-gray-200">legofleets@info.com</p>
            <p class="block text-sm font-medium text-gray-800 dark:text-gray-200">+91 7875120099</p>
          </div>
        </div>
            {/* Other invoice details */}
            <p class="mt-5 text-sm text-gray-500">© 2024 Legofleets.</p>
            <div class="mt-6 flex justify-end gap-x-3">
       
        <button
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  onClick={printInvoice}
                >
                  <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect width="12" height="8" x="6" y="14" />
                  </svg>
                  Print Invoice
                </button>
      </div>
          </div>
          
        </div>
      </div>
    </div>
      ) : (
        <div class='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
        <span class='sr-only'>Loading...</span>
         <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
       <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
       <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
     </div>
      )}
    </div>
  );
}

export default Invoice;
