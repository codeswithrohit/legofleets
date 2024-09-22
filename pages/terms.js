import React from 'react';

const Terms = () => {
  return (
    <div className="bg-gray-100 py-10 px-5 lg:px-40">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">APPENDIX-A</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Legofleets Booking Terms & Conditions</h2>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">1. General Terms Applicable to all services and bookings:</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              We do not provide any specific vehicle, although you will receive the type of car you have booked, provided it can accommodate the number of passengers and luggage. We adhere to RTO rules, prioritizing safety by not providing any additional carriers.
            </li>
            <li>
              Booking confirmation is based on your selection of passenger and luggage capacity. If your passenger or luggage doesn't fit in the car, no refunds will be given, and additional vehicle provisions may incur charges.
            </li>
            <li>
              Please check your belongings before leaving the vehicle. The company will not be responsible for any losses, and delivery of left-behind items may incur charges.
            </li>
            <li>
              <strong>Cancellation policy:</strong> (Except Pune Local and Mumbai Local Packages)
              <ul className="list-disc ml-6 space-y-2">
                <li>Before 96 hours: 90% refundable</li>
                <li>Before 48 hours: 80% refundable</li>
                <li>Before 24 hours: 20% refundable</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">2. Mumbai Airport Transfer</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>All general terms as mentioned above are applicable.</li>
            <li>Booking cost includes toll charges. Parking charges are payable at actuals.</li>
            <li>Booking covers 1 pick-up to 1 drop-off point, without additional stops other than a food court break.</li>
            <li>Local car use is not permitted.</li>
            <li>The vehicle will wait a maximum of 30 minutes after the informed reporting time; extra charges apply thereafter.</li>
            <li>Company is not responsible for missed flights or cancellations due to weather or other unforeseen circumstances.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">3. Pune &lt;&gt; Mumbai (Other than Mumbai Airport)</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>All general terms as mentioned above are applicable.</li>
            <li>Booking cost is one-way only and includes toll charges.</li>
            <li>One pick-up to one drop-off point without additional stops except for a 30-minute food court break.</li>
            <li>Local car use is not included in the booking cost.</li>
            <li>The vehicle will wait a maximum of 30 minutes after the informed reporting time; extra charges apply thereafter.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">4. Pune -&gt; Local & Mumbai -&gt; Local</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>All general terms (except cancellation policy) are applicable.</li>
            <li>Local package car will not cross city limits.</li>
            <li>Toll charges and parking fees are not included in the booking cost.</li>
            <li>Basic fare is charged as per the rate card; balance payment is based on extra kilometers or hours.</li>
            <li>
              <strong>Cancellation policy:</strong>
              <ul className="list-disc ml-6 space-y-2">
                <li>Before 24 hours: 90% refundable</li>
                <li>Before 12 hours: 80% refundable</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">5. Pune -&gt; National & Mumbai -&gt; National</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>All general terms are applicable.</li>
            <li>Booking excludes toll, state border tax charges, and parking fees.</li>
            <li>A minimum of 300 km average is charged per day.</li>
            <li>Basic fare is charged as per the rate card; additional payment is based on extra kilometers or days.</li>
          </ul>
        </section>

       
      </div>
    </div>
  );
};

export default Terms;
