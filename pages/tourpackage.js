import React from 'react';
import { useRouter } from 'next/router';
const TourPackage = () => {
    const router = useRouter();

 
    const handleBookNow = (packageId) => {
        // Redirect to the Home page with the selected packageId
        router.push(`/Home?activeTab=0&selectedPackage=${packageId}`);
      };
  return (
    <div className='bg-white' >
    <div className="container mx-auto p-6">
      <h2 className="text-4xl text-[#541e50] font-bold mb-6">Explore Our Exclusive Tour Packages</h2>

      {/* Package 1: Mumbai Airport Transport */}
      <div className="mb-12 bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4">1. Mumbai Airport Transport</h3>
        <p className="mb-4">
          For a fixed rate for pick-up from Mumbai airport to Pune or from Pune to drop-off at Mumbai airport,
          this package is specifically designed for your comfortable journey to & from Mumbai airport. The prices are;
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Sedan: Rs. 3500</li>
          <li>Mini-SUV: Rs. 4500</li>
          <li>SUV: Rs. 6000</li>
        </ul>
        <button
          onClick={() => handleBookNow(0)}
          className="bg-[#541e50] text-white px-6 py-3 rounded-full hover:bg-blue-700"
        >
          Book Now
        </button>
      </div>

      {/* Package 2: Pune ↔ Mumbai (other than Airport) */}
      <div className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">2. Pune ↔ Mumbai (other than Airport)</h3>
          <p className="mb-4">
            Whether you are on a business trip or attending a family function in Pune or Mumbai, choose this package if you just need a drop to/from anywhere in Mumbai other than the airport. Depending upon your pick-up or drop-off locations in Mumbai, the price ranges are;
          </p>
          <div className="mb-4">
            <strong>Destination Type - A</strong>
            <ul className="list-disc pl-6">
              <li>Lonavala, Panvel, Khopoli, Khandala, Belapur, Kharghar, Nerul, Sanpada, Seawood, Vashi, Airoli, Rabale, Mulund East, Mulund West, Bhandup East, Bhandup West, Mankhurd, Ghatkopar East, Ghatkopar West, Koparkhirane, Ghansoli, Chembur, Sion, Vikroli, Vile Parle, Andheri East, Andheri West, Sakinaka, Powai, Kanjurmarg East, Kanjurmarg West, Chandivali, Kurla East, Kurla West, Bandra Kurla Complex (BKC), Bandra East, Matunga, Kingcircle, Dadar East, Dadar West, Shivajipark, Mahim, Parel, Lower Parel, Siddhivinayak Mandir, Wadala</li>
              <li>Sedan: Rs. 3500</li>
              <li>Mini-SUV: Rs. 4500</li>
              <li>SUV: Rs. 6000</li>
            </ul>
          </div>
          <div className="mb-4">
            <strong>Destination Type - B</strong>
            <ul className="list-disc pl-6">
              <li>Mahalaxmi, Byculla, Mazgaon, Mumbadevi, Kalbadevi, Mumbai Central, Taj Hotel Mumbai, Santacruz East, Santacruz West, Colaba, Nariman Point, Gateway of India, Churchgate, Victoriya Terminus, Worli, Girgaon, Girgaon Chowpatty, Haji Ali, Charni Road, Grant Road, Mazgaon Dock Yard, Malabar Hill, Juhu Chowpatty, Khar, Juhu, Yari Road, Bandra West, Prabha Devi, Goregaon East, Goregaon West, Malad East, Malad West, Kandivali East, Kandivali West, Charkop, Juhu Beach, Versova, Borivali East, Borivali West, Thane East, Thane West</li>
              <li>Sedan: Rs. 4000</li>
              <li>Mini-SUV: Rs. 5000</li>
              <li>SUV: Rs. 7000</li>
            </ul>
          </div>
          <div className="mb-4">
            <strong>Destination Type - C</strong>
            <ul className="list-disc pl-6">
              <li>Dahisar East, Dahisar West, Mira Road East, Mira Road West, Vasai East, Vasai West, Bhayandar East, Bhayandar West, Virar East, Virar West</li>
              <li>Sedan: Rs. 5000</li>
              <li>Mini-SUV: Rs. 6000</li>
              <li>SUV: Rs. 8000</li>
            </ul>
          </div>
          <div className="mb-4">
            <strong>Destination Type - D</strong>
            <ul className="list-disc pl-6">
              <li>Kalyan East, Kalyan West, Dombivli East, Dombivli West, Badlapur, Karjat</li>
              <li>Sedan: Rs. 4500</li>
              <li>Mini-SUV: Rs. 5500</li>
              <li>SUV: Rs. 7500</li>
            </ul>
          </div>
          <button
          onClick={() => handleBookNow(1)}
          className="bg-[#541e50] text-white px-6 py-3 rounded-full hover:bg-blue-700"
        >
          Book Now
        </button>
        </div>

      {/* Package 3: Pune Local */}
      <div className="mb-12 bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4">3. Pune Local</h3>
        <p className="mb-4">
          This package is designed when you need a car for a day with pick-up and drop in Pune including PCMC (Pimpri-Chinchwad Municipal Corporation) area.
          This affordable option works for a rate of 8 hours/80 kilometers. Most of the time, 80km covers your day of 8 hours or less, but in case of any additional kilometers or hours, they will be calculated at the end of the journey.
          This package is recommended for Pune sightseeing tours as well.
        </p>
        <div className="mb-4">
          <strong>Sedan</strong>
          <ul className="list-disc pl-6">
            <li>For 8 hours, up to 80 kms: Rs. 2600</li>
            <li>After 8 hours - Additional charges/hour: Rs. 250</li>
            <li>After 80km - Additional charges/Km: Rs. 15</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Mini SUV</strong>
          <ul className="list-disc pl-6">
            <li>For 8 hours, up to 80 kms: Rs. 3400</li>
            <li>After 8 hours - Additional charges/hour: Rs. 300</li>
            <li>After 80km - Additional charges/Km: Rs. 18</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>SUV</strong>
          <ul className="list-disc pl-6">
            <li>For 8 hours, up to 80 kms: Rs. 4300</li>
            <li>After 8 hours - Additional charges/hour: Rs. 350</li>
            <li>After 80km - Additional charges/Km: Rs. 22</li>
          </ul>
        </div>
        <button
          onClick={() => handleBookNow(2)}
          className="bg-[#541e50] text-white px-6 py-3 rounded-full hover:bg-blue-700"
        >
          Book Now
        </button>
      </div>

      {/* Package 4: Mumbai Local */}
      <div className="mb-12 bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4">4. Mumbai Local</h3>
        <p className="mb-4">
          This package is designed when you need a car for a day with pick-up and drop in Mumbai.
          This affordable option works for a rate of 8 hours/80 kilometers. Most of the time, 80km covers your day of 8 hours or less, but in case of any additional kilometers or hours, they will be calculated at the end of the journey.
          This package is recommended for Mumbai sightseeing tours as well.
        </p>
        <div className="mb-4">
          <strong>Sedan</strong>
          <ul className="list-disc pl-6">
            <li>For 8 hours, up to 80 kms: Rs. 3000</li>
            <li>After 8 hours - Additional charges/hour: Rs. 300</li>
            <li>After 80km - Additional charges/Km: Rs. 17</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Mini SUV</strong>
          <ul className="list-disc pl-6">
            <li>For 8 hours, up to 80 kms: Rs. 4000</li>
            <li>After 8 hours - Additional charges/hour: Rs. 400</li>
            <li>After 80km - Additional charges/Km: Rs. 20</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>SUV</strong>
          <ul className="list-disc pl-6">
            <li>For 8 hours, up to 80 kms: Rs. 4700</li>
            <li>After 8 hours - Additional charges/hour: Rs. 450</li>
            <li>After 80km - Additional charges/Km: Rs. 25</li>
          </ul>
        </div>
        <button
          onClick={() => handleBookNow(3)}
          className="bg-[#541e50] text-white px-6 py-3 rounded-full hover:bg-blue-700"
        >
          Book Now
        </button>
      </div>

      {/* Package 5: Pune -> National */}
      <div className="mb-12 bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4">5. Pune - National</h3>
        <p className="mb-4">
          Journeys from Pune to anywhere in India other than Karnataka State.
          National packages are designed for those holidays, family get-togethers, or any such journeys where you need a car for a couple of days for your comfortable stays at your desired destinations.
          You can drop the car or keep it with you throughout your journey. These packages work purely based on kilometers (Minimum charge for 300Kms) with additional driver allowances and charges depending on the number of days and nights he is out with you.
        </p>
        <div className="mb-4">
          <strong>Sedan</strong>
          <ul className="list-disc pl-6">
            <li>Per KM (Min 300 Km): 15</li>
            <li>Driver Charges per night: 500</li>
            <li>Driver allowance per day: 500</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Mini SUV</strong>
          <ul className="list-disc pl-6">
            <li>Per KM: 18</li>
            <li>Driver Charges per night: 500</li>
            <li>Driver allowance per day: 500</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>SUV</strong>
          <ul className="list-disc pl-6">
            <li>Per KM: 22</li>
            <li>Driver Charges per night: 500</li>
            <li>Driver allowance per day: 500</li>
          </ul>
        </div>
        <button
          onClick={() => handleBookNow(4)}
          className="bg-[#541e50] text-white px-6 py-3 rounded-full hover:bg-blue-700"
        >
          Book Now
        </button>
      </div>

      {/* Package 6: Mumbai -> National */}
      <div className="mb-12 bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4">6. Mumbai - National</h3>
        <p className="mb-4">
          Journeys from Mumbai (including Airport) to anywhere in India other than Pune and Karnataka State.
          National packages are designed for those holidays, family get-togethers, or any such journeys where you need a car for a couple of days for your comfortable stays at your desired destinations.
          You can drop the car or keep it for your return journey. These packages work purely based on kilometers (Minimum charge for 300Kms) with additional driver allowances and charges depending on the number of days and nights he is out with you.
        </p>
        <div className="mb-4">
          <strong>Sedan</strong>
          <ul className="list-disc pl-6">
            <li>Per KM (Min 300 Km): 17</li>
            <li>Driver Charges per night: 500</li>
            <li>Driver allowance per day: 500</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Mini SUV</strong>
          <ul className="list-disc pl-6">
            <li>Per KM: 20</li>
            <li>Driver Charges per night: 500</li>
            <li>Driver allowance per day: 500</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>SUV</strong>
          <ul className="list-disc pl-6">
            <li>Per KM: 25</li>
            <li>Driver Charges per night: 500</li>
            <li>Driver allowance per day: 500</li>
          </ul>
        </div>
        <button
          onClick={() => handleBookNow(5)}
          className="bg-[#541e50] text-white px-6 py-3 rounded-full hover:bg-blue-700"
        >
          Book Now
        </button>
      </div>
      </div>
      </div>
      );
};

export default TourPackage;