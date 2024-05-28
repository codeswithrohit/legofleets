import React, { useState,useEffect } from "react";
import { firebase } from "../../Firebase/config";
import "firebase/firestore";
import "firebase/storage";
import AdminNav from '../../components/AdminNav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
  sedan: ["Toyota", "Honda"],
  miniSuv: ["Ertiga", "Kia Carens"],
  suv: ["Innova", "Xylo"],
};

const db = firebase.firestore();
const storage = firebase.storage();

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState("Pune To Mumbai Airport"); 
  const [vehicleType, setVehicleType] = useState("");
  const [brand, setBrand] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);
  const [formData, setFormData] = useState({
    vehicleType: "",
    brand: "",
    carImage: "", // Store the image URL
    suitcase: '',
    passenger: '',
    pricePerKm: '',
    services:"",
    info: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

console.log("formdata",formData)
const [carData, setCarData] = useState([]);
useEffect(() => {
  const fetchCarData = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const snapshot = await db.collection("CarData").get();
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCarData(data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching car data:", error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  fetchCarData();
}, []);

  const handleEdit = (car) => {
    setVehicleType(car.vehicleType);
    setBrand(car.brand);
    setFormData({
      vehicleType: car.vehicleType,
      brand: car.brand,
      carImage: car.carImage,
      suitcase: car.suitcase,
      passenger: car.passenger,
      pricePerKm: car.pricePerKm,
      services: car.services,
      info: car.info,
    });
    setEditingCarId(car.id);
    setShowForm(true);
  };
  console.log(formData)

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);

    fileRef
      .put(file)
      .then(() => fileRef.getDownloadURL())
      .then((url) => {
        setFormData({ ...formData, carImage: url }); // Update the carImage URL
      })
      .catch((error) => {
        console.error('Error uploading file: ', error);
        // Handle error if needed
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if carImage exists
    if (formData.carImage) {
      // Determine whether to add or update data based on editingCarId
      const operation = editingCarId ? "update" : "add";
      let operationRef;

      if (operation === "update") {
        operationRef = db.collection("CarData").doc(editingCarId);
      } else {
        operationRef = db.collection("CarData").doc();
      }

      operationRef
        .set(formData, { merge: true }) // Use merge to update only the fields that are present in formData
        .then(() => {
          toast.success(`${operation === "update" ? 'Data updated' : 'Data added'} successfully!`);
          setIsSubmitting(false);
          setFormData({
            vehicleType: "",
            brand: "",
            carImage: "",
            suitcase: '',
            passenger: '',
            pricePerKm: '',
            info: '',
            services:"",
          });
          setEditingCarId(null); // Reset editing state
          setShowForm(false);
        })
        .catch((error) => {
          toast.error(`Error ${operation === "update" ? 'updating' : 'adding'} document: ${error.message}`);
          setIsSubmitting(false);
        });
    } else {
      toast.error('Please upload a car image');
      setIsSubmitting(false);
    }
  };

  const filterCarData = (service) => {
    setSelectedService(service);
  };

  const filteredCarData = selectedService
    ? carData.filter((car) => car.services === selectedService)
    : carData;




  return (
    <div className=' bg-white min-h-screen'>
    <AdminNav />
    <div className="lg:ml-64 w-full  bg-white">
  

  
        {showForm && (
                 <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-30 flex justify-center items-center">
                 <div className="max-w-lg p-6 bg-white rounded-lg shadow-md overflow-y-auto" style={{ maxHeight: '80vh' }}>
                 
      <form onSubmit={handleFormSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
  
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleType">Select Vehicle Type:</label>
          <select
            id="vehicleType"
            onChange={(e) => {
              setVehicleType(e.target.value);
              setFormData({ ...formData, vehicleType: e.target.value });
            }}
            value={vehicleType}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Vehicle Type</option>
            <option value="sedan">Sedan</option>
            <option value="miniSuv">Mini SUV</option>
            <option value="suv">SUV</option>
          </select>
        </div>
  
        {vehicleType && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">Select Brand:</label>
            <select
              id="brand"
              onChange={(e) => {
                setBrand(e.target.value);
                setFormData({ ...formData, brand: e.target.value });
              }}
              value={brand}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Brand</option>
              {options[vehicleType].map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
  
  <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carImage">Car Image:</label>
          <input
            type="file"
            id="carImage"
            onChange={handleFileUpload}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="suitcase">Suitcase:</label>
          <input
          required
            type="number"
            id="suitcase"
            value={formData.suitcase}
            onChange={(e) => setFormData({ ...formData, suitcase: e.target.value })}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passenger">Passenger:</label>
          <input
          required
            type="number"
            id="passenger"
            value={formData.passenger}
            onChange={(e) => setFormData({ ...formData, passenger: e.target.value })}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pricePerKm">Price per KM:</label>
          <input
          required
            type="number"
            id="pricePerKm"
            value={formData.pricePerKm}
            onChange={(e) => setFormData({ ...formData, pricePerKm: e.target.value })}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="info">Info</label>
          <textarea
            type="text"
            id="info"
            value={formData.info}
            onChange={(e) => setFormData({ ...formData, info: e.target.value })}
            className="h-40 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
       
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleType">Select Services:</label>
          <select
            id="services"
            value={formData.services}
            onChange={(e) => setFormData({ ...formData, services: e.target.value })}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Services</option>
            <option value="Pune To Mumbai Airport">Pune To Mumbai Airport</option>
            <option value="Mumbai To Pune Airport">Mumbai To Pune Airport</option>
            <option value="Pune Mumbai">Pune Mumbai</option>
            <option value="Mumbai Pune">Mumbai Pune</option>
            <option value="Pune Local">Pune Local</option>
            <option value="Pune National">Pune National</option>
            <option value="Mumbai Local">Mumbai Local</option>
            <option value="Mumbai National">Mumbai National</option>
          </select>
        </div>
  
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white justify-center items-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <button
          onClick={() => setShowForm(!showForm)} // Toggle the state when the button is clicked
          className=" bg-red-500 mb-8 hover:bg-red-700 mt-2 ml-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {showForm ? 'Close Form' : 'Add Data'}
        </button>
      </form>
      </div>
      </div>
        )}
    </div>
    <div className=" lg:ml-64 overflow-x-auto">
    {loading ? (
         <div class='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
         <span class='sr-only'>Loading...</span>
          <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
      </div>
        ) : (
          <div>
              <button
          onClick={() => setShowForm(!showForm)} // Toggle the state when the button is clicked
          className=" bg-blue-500 hover:bg-blue-700 mt-2 ml-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {showForm ? 'Close Form' : 'Add Data'}
        </button>
        <div className="flex flex-wrap md:justify-start justify-center sm:grid-cols-3 text-xs lg:grid-cols-6 gap-4 py-4">
  <button
    onClick={() => filterCarData("Pune To Mumbai Airport")}
    className={`py-2 px-4 rounded ${
      selectedService === "Pune To Mumbai Airport" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
    }`}
  >
    Pune To Mumbai Airport
  </button>
  <button
    onClick={() => filterCarData("Mumbai To Pune Airport")}
    className={`py-2 px-4 rounded ${
      selectedService === "Mumbai To Pune Airport" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
    }`}
  >
    Mumbai To Pune Airport
  </button>
  <button
    onClick={() => filterCarData("Pune Local")}
    className={`py-2 px-4 rounded ${
      selectedService === "Pune Local" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
    }`}
  >
    Pune Local
  </button>
  <button
    onClick={() => filterCarData("Mumbai Local")}
    className={`py-2 px-4 rounded ${
      selectedService === "Mumbai Local" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
    }`}
  >
    Mumbai Local
  </button>
  <button
    onClick={() => filterCarData("Pune National")}
    className={`py-2 px-4 rounded ${
      selectedService === "Pune National" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
    }`}
  >
    Pune National
  </button>
  <button
    onClick={() => filterCarData("Mumbai National")}
    className={`py-2 px-4 rounded ${
      selectedService === "Mumbai National" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
    }`}
  >
    Mumbai National
  </button>
</div>

      <h1 className="text-black font-bold text-center text-2xl mb-2" >All Car Data</h1>
      <div className="lg:overflow-x-auto">
  <div className="lg:min-w-full overflow-hidden lg:rounded-lg">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Type</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredCarData.map((car) => (
          <tr key={car.id} className="hover:bg-gray-100 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap uppercase">{car.vehicleType}</td>
            <td className="px-6 py-4 whitespace-nowrap">{car.brand}</td>
            <td className="px-6 py-4 whitespace-nowrap">{car.pricePerKm}</td>
            <td className="px-6 py-4 whitespace-nowrap">{car.services}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button onClick={() => handleEdit(car)} className="text-blue-600 hover:text-blue-900">Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

          </div>
        )}
        </div>
        
    <ToastContainer/>
  </div>
  
  );
}
