import React, { useState, useEffect } from "react";
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
    services: "",
    info: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    const fetchCarData = async () => {
      setLoading(true);
      try {
        const snapshot = await db.collection("CarData").get();
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCarData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching car data:", error);
        setLoading(false);
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
      });
  };

  const handleDeleteImage = () => {
    // Delete the current image from Firebase Storage
    const storageRef = storage.refFromURL(formData.carImage);
    storageRef
      .delete()
      .then(() => {
        // After deletion, clear the carImage URL from formData
        setFormData({ ...formData, carImage: "" });
        toast.success('Image deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting image: ', error);
        toast.error('Error deleting image.');
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.carImage) {
      const operation = editingCarId ? "update" : "add";
      let operationRef;

      if (operation === "update") {
        operationRef = db.collection("CarData").doc(editingCarId);
      } else {
        operationRef = db.collection("CarData").doc();
      }

      operationRef
        .set(formData, { merge: true })
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
            services: "",
          });
          setEditingCarId(null);
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
    <div className='bg-white min-h-screen'>
      <AdminNav />
      <div className="lg:ml-64 w-full bg-white">
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

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carImage">Car Image:</label>
                  {formData.carImage && (
                    <div className="mb-2">
                      <img src={formData.carImage} alt="Current Car" className="w-full h-auto rounded" />
                      <button
                        type="button"
                        onClick={handleDeleteImage}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mt-2"
                      >
                        Delete Image
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    id="carImage"
                    onChange={handleFileUpload}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pricePerKm">Price:</label>
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
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="services">Select Services:</label>
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
                    <option value="Mumbai Local">Mumbai Local</option>
                  </select>
                </div>

                {/* <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="info">Information:</label>
                  <textarea
                    id="info"
                    value={formData.info}
                    onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div> */}

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-bold mb-4">Manage Car Data</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {/* <div className="mb-4">
                <button
                  onClick={() => {
                    setShowForm(true);
                    setEditingCarId(null);
                    setFormData({
                      vehicleType: "",
                      brand: "",
                      carImage: "",
                      suitcase: '',
                      passenger: '',
                      pricePerKm: '',
                      services: "",
                      info: '',
                    });
                  }}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add New Car
                </button>
              </div> */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Vehicle Type</th>
                      <th className="py-2 px-4 border-b">Brand</th>
                      <th className="py-2 px-4 border-b">Price</th>
                      <th className="py-2 px-4 border-b">Services</th>
                      <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCarData.map((car) => (
                      <tr key={car.id}>
                        <td className="py-2 px-4 border-b text-center flex flex-row"> <img src={car.carImage} alt={car.brand} className="w-16 h-16 rounded-xl object-cover" /> <span className="ml-4 text-md uppercase" >{car.vehicleType}</span> </td>
                        <td className="py-2 px-4 border-b">{car.brand}</td>
                       
                        <td className="py-2 px-4 border-b">{car.pricePerKm}</td>
                        <td className="py-2 px-4 border-b">{car.services}</td>
                        <td className="py-2 px-4 border-b">
                          <button
                            onClick={() => handleEdit(car)}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              db.collection("CarData").doc(car.id).delete()
                                .then(() => {
                                  toast.success('Car deleted successfully!');
                                })
                                .catch((error) => {
                                  toast.error('Error deleting car: ', error);
                                });
                            }}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
