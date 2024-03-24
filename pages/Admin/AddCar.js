import { useState,useEffect } from "react";
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
  const [vehicleType, setVehicleType] = useState("");
  const [brand, setBrand] = useState("");
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


  const [carData, setCarData] = useState([]);
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const snapshot = await db.collection("CarData").get();
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCarData(data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, []);
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
      db.collection("CarData")
        .add(formData)
        .then(() => {
          toast.success('Data submitted successfully!');
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
        })
        .catch((error) => {
          toast.error('Error writing document: ' + error.message);
          setIsSubmitting(false);
        });
    } else {
      toast.error('Please upload a car image');
      setIsSubmitting(false);
    }
  };



  return (
    <div className=' min-h-screen'>
    <AdminNav />
    <div className="lg:ml-64 w-full  bg-white">
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
            onChange={(e) => setFormData({ ...formData, pricePerKm: e.target.value })}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="info">Info</label>
          <textarea
            type="text"
            id="info"
            onChange={(e) => setFormData({ ...formData, info: e.target.value })}
            className="h-40 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
       
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleType">Select Services:</label>
          <select
            id="services"
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
  
      </form>
    </div>
    <div className=" lg:ml-64 overflow-x-auto mt-8">
      <h1 className="text-black font-bold text-center text-2xl mb-2" >All Car Data</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suitcase</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passenger</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Info</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {carData.map((car) => (
                <tr key={car.id}>
                  <td className="px-6 py-4 whitespace-nowrap uppercase">{car.vehicleType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{car.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{car.suitcase}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{car.passenger}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{car.pricePerKm}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{car.services}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{car.info}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    <ToastContainer/>
  </div>
  
  );
}
