import { useState } from 'react';
import { firebase } from '../Firebase/config'; // Import Firestore configuration

const locationPrices = {
  'Destination Type A': {
    locations: [
      'Lonavala', 'Panvel', 'Khopoli', 'Khandala', 'Belapur', 'Kharghar', 'Nerul', 'Sanpada',
      'Seawood', 'Vashi', 'Airoli', 'Rabale', 'Mulund East', 'Mulund West', 'Bhandup East',
      'Bhandup West', 'Mankhurd', 'Ghatkopar East', 'Ghatkopar West', 'Koparkhirane', 'Ghansoli',
      'Chembur', 'Sion', 'Vikroli', 'Vile Parle', 'Andheri East', 'Andheri West', 'Sakinaka',
      'Powai', 'Kanjurmarg East', 'Kanjurmarg West', 'Chandivali', 'Kurla East', 'Kurla West',
      'Bandra Kurla Complex (BKC)', 'Bandra East', 'Matunga', 'Kingcircle', 'Dadar East',
      'Dadar West', 'Shivajipark', 'Mahim', 'Parel', 'Lower Parel', 'Sidhhivinayak mandir', 'Wadala'
    ],
    prices: {
      sedan: 3500,
      minisuv: 4500,
      suv: 6000
    }
  },
  // Define other destination types similarly
};

const SubmitForm = () => {
  const [destinationType, setDestinationType] = useState('');
  const [location, setLocation] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.firestore().collection('prices').add({
        destinationType,
        location,
        vehicleType,
        price: locationPrices[destinationType].prices[vehicleType]
      });
      // Reset form fields after successful submission
      setDestinationType('');
      setLocation('');
      setVehicleType('');
      console.log('Data submitted successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="destinationType">Destination Type:</label>
        <select
          id="destinationType"
          value={destinationType}
          onChange={(e) => setDestinationType(e.target.value)}
        >
          {Object.keys(locationPrices).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <select
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          {destinationType && locationPrices[destinationType].locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="vehicleType">Vehicle Type:</label>
        <select
          id="vehicleType"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          {destinationType && Object.keys(locationPrices[destinationType].prices).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmitForm;
