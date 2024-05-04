import React, { useState, useEffect } from 'react';
import { firebase } from '../../Firebase/config';
import 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNav from '../../components/AdminNav';
const db = firebase.firestore();

const DestinationForm = () => {
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('Destination Type A');
  const [editedFormData, setEditedFormData] = useState({});
  const [loading, setLoading] = useState(true); // New state to track loading status
  const [isUpdating, setIsUpdating] = useState(false); // New state to track update process

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await db.collection('PuneMumbai').get();
        const data = snapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data();
          return acc;
        }, {});
        setFormData(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    fetchData();
  }, []);

  console.log("formdata",formData)

  const handlePriceChange = (destination, vehicle, price) => {
    // Create a copy of editedFormData or initialize it if it's null
    const updatedFormData = { ...editedFormData };
  
    // Check if the destination exists in the editedFormData
    if (!updatedFormData[destination]) {
      updatedFormData[destination] = { prices: { ...formData[destination]?.prices }, locations: [...formData[destination]?.locations] };
    }
  
    // Update the price for the specific vehicle
    updatedFormData[destination].prices[vehicle] = price;
  
    // Set the editedFormData state with the updated value
    setEditedFormData(updatedFormData);
  };
  
  

  const handleLocationChange = (destination, index, location) => {
    // Create a copy of editedFormData or initialize it if it's null
    const updatedFormData = { ...editedFormData };
  
    // Check if the destination exists in the editedFormData
    if (!updatedFormData[destination]) {
      updatedFormData[destination] = { prices: { ...formData[destination]?.prices }, locations: [...formData[destination]?.locations] };
    }
  
    // Update the location at the specified index
    updatedFormData[destination].locations[index] = location;
  
    // Set the editedFormData state with the updated value
    setEditedFormData(updatedFormData);
  };
  

  const handleSubmit = () => {
    setIsUpdating(true); // Set isUpdating to true when update process starts
    Promise.all(
      Object.keys(editedFormData).map(destination => {
        const docRef = db.collection('PuneMumbai').doc(destination);
        return docRef.update(editedFormData[destination]);
      })
    )
      .then(() => {
        toast.success('Form data updated successfully!');
      })
      .catch(error => {
        toast.error('Error updating form data: ' + error.message);
      })
      .finally(() => {
        setIsUpdating(false); // Set isUpdating to false after update process finishes
      });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setEditedFormData({});
  };

  return (
    <div className="px-16 py-12 min-h-screen bg-white flex flex-col justify-center">
          <AdminNav />
        <div className='lg:ml-64' >
      {loading ? ( // Render spinner if loading is true
        <div className="flex justify-center items-center h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-12 h-12 animate-spin"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
            />
            <path
              fillRule="evenodd"
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
            />
          </svg>
        </div>
      ) : (
        <><div className="flex-grow">
            <ul className="flex mb-4">
              {Object.keys(formData).map(destination => (
                <li
                  key={destination}
                  className={`mr-4 cursor-pointer px-4 py-2 rounded-md ${activeTab === destination ? 'bg-[#541e50] text-white' : 'bg-gray-500 text-white'}`}
                  onClick={() => handleTabClick(destination)}
                >
                  {destination}
                </li>
              ))}
            </ul>
            {activeTab && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">{activeTab}</h2>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Vehicle Prices:</h3>
                  <div className="flex flex-wrap">
                    {Object.keys(formData[activeTab]?.prices || {}).map(vehicle => (
                      <div key={vehicle} className="flex items-center mb-2 mr-4">
                        <label className="mr-2 uppercase font-bold">{vehicle}:</label>
                        <input
                          type="number"
                          value={editedFormData[activeTab]?.prices?.[vehicle] || formData[activeTab]?.prices[vehicle] || ''}
                          onChange={e => handlePriceChange(activeTab, vehicle, e.target.value)}
                          className="px-2 py-1 border border-gray-400 rounded w-24" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Locations:</h3>
                  <div className="flex flex-wrap">
                    {formData[activeTab]?.locations.map((location, index) => (
                      <div key={index} className="w-1/4 px-2 mb-2">
                        <input
                          type="text"
                          value={editedFormData[activeTab]?.locations?.[index] || location}
                          onChange={e => handleLocationChange(activeTab, index, e.target.value)}
                          className="px-2 py-1 border border-gray-400 rounded w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div><button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
              {isUpdating ? 'Updating...' : 'Update'}
            </button></>
      )}

</div>

      <ToastContainer />
    </div>
  );
};

export default DestinationForm;
