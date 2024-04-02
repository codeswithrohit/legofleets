import { useState,useEffect } from "react";
import { firebase } from "../../Firebase/config";
import "firebase/firestore";
import "firebase/storage";
import AdminNav from '../../components/AdminNav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
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
  const [isFormOpen, setIsFormOpen] = useState(false); // State to track form visibility
  const router = useRouter(); 
  const [formData, setFormData] = useState({
    vehicleType: "",
    carImage: "", // Store the image URL
    pricePerKm: '',
    services:"",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is an admin when the component mounts
  useEffect(() => {
    const isAdminInLocalStorage = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(isAdminInLocalStorage);
    if (!isAdminInLocalStorage) {
      // If the user is not an admin, show a loading message or redirect them to the login page
      router.push("/Admin/adminlogin");
    } else {
    }
  }, [router]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading state

  const [carData, setCarData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(10);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const snapshot = await db.collection("CarData").get();
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCarData(data);
        setIsLoading(false); // Set loading state to false when data is loaded
      } catch (error) {
        console.error("Error fetching car data:", error);
        setIsLoading(false); // Set loading state to false if there's an error
      }
    };

    fetchCarData();
  }, []);

  // Get current cars
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = carData.slice(indexOfFirstCar, indexOfLastCar);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
            carImage: "",
            pricePerKm: '',
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

  const handleDelete = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("CarData").doc(id).delete();
      const updatedData = carData.filter((item) => item.id !== id);
      setCarData(updatedData);
      toast.success("Deletion successful!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast.error("Deletion failed. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };



  const [showPopup, setShowPopup] = useState(false);
  const [selectedcar, setSelectedCar] = useState(null);
  const [editedcar, setEditedCar] = useState(null);


    // Function to handle showing E details
    const handleEditDetails = (car) => {
      setSelectedCar(car);
      setEditedCar({ ...car });
      setShowPopup(true);
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditedCar((prevcar) => ({
        ...prevcar,
        [name]: value,
      }));
    };
  
    const handleDeleteImage = async () => {
      try {
        const storage = firebase.storage();
        const imageRef = storage.refFromURL(editedcar.carImage);
        await imageRef.delete();
        setEditedCar({ ...editedcar, carImage: "" });
        toast.success("Image deleted successfully!");
      } catch (error) {
        console.error("Error deleting image: ", error);
        toast.error("Error deleting image. Please try again.");
      }
    };
  
    const handleReplaceImage = async (e) => {
      const { files } = e.target;
      if (files.length === 0) return;
  
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const carImageFile = files[0];
      const carImageRef = storageRef.child(carImageFile.name);
  
      try {
        await carImageRef.put(carImageFile);
        const carImageUrl = await carImageRef.getDownloadURL();
        setEditedCar({ ...editedcar, carImage: carImageUrl });
        toast.success("New image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading new image: ", error);
        toast.error("Error uploading new image. Please try again.");
      }
    };

    const handleClosePopup = () => {
      setSelectedCar(null);
      setShowPopup(false);
    };
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        if (editedcar) {
          const db = firebase.firestore();
          const PrasadamRef = db.collection("CarData").doc(editedcar.id);
          await PrasadamRef.update({
            vehicleType: editedcar.vehicleType,
            carImage: editedcar.carImage,
            pricePerKm: editedcar.pricePerKm,
            services: editedcar.services,
          });
          setShowPopup(false);
          setEditedCar(null);
          toast.success("Changes saved successfully!");
          router.reload();
        }
      } catch (error) {
        console.error("Error saving changes:", error);
        toast.error("An error occurred while saving changes.");
      }
    };



  return (
    <div className=' bg-white min-h-screen'>
    <AdminNav />
   
    {!isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)} // Open the form when clicked
            className="bg-blue-500 lg:ml-64 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 ml-4"
          >
            Add Vehicle
          </button>
        )}
    <div className="lg:ml-64 w-full  bg-white">
    {isFormOpen && (
      <form onSubmit={handleFormSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-wrap">
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleType">Select Vehicle Type:</label>
        <select
          id="vehicleType"
          required
          onChange={(e) => {
            setVehicleType(e.target.value);
            setFormData({ ...formData, vehicleType: e.target.value });
          }}
          value={vehicleType}
          className="appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Vehicle Type</option>
          <option value="sedan">Sedan</option>
          <option value="miniSuv">Mini SUV</option>
          <option value="suv">SUV</option>
        </select>
      </div>
    
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carImage">Car Image:</label>
        <input
          required
          type="file"
          id="carImage"
          onChange={handleFileUpload}
          className="appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pricePerKm">Price per KM:</label>
        <input
          required
          type="text"
          id="pricePerKm"
          onChange={(e) => setFormData({ ...formData, pricePerKm: e.target.value })}
          className="appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="services">Select Services:</label>
        <select
          required
          id="services"
          onChange={(e) => setFormData({ ...formData, services: e.target.value })}
          className="appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        className="bg-red-500 ml-4 hover:bg-red-700 text-white justify-center items-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => setIsFormOpen(false)}
      >
        Close
      </button>
    
    </form>
    
    )}
    </div>
    {isLoading ? ( // Show loading spinner if data is still loading
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
    <div className=" lg:ml-64 overflow-x-auto mt-8">
        <h1 className="text-black font-bold text-center text-2xl mb-2" >All Car Data</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCars.map((car) => (
              <tr key={car.id}>
                <td className="px-6 py-4 whitespace-nowrap uppercase">{car.vehicleType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{car.pricePerKm}</td>
                <td className="px-6 py-4 whitespace-nowrap">{car.services}</td>
                <td class="px-6 py-4">
          <button   onClick={() => handleEditDetails(car)} class="mr-4" title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-blue-500 hover:fill-blue-700"
              viewBox="0 0 348.882 348.882">
              <path
                d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                data-original="#000000" />
              <path
                d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                data-original="#000000" />
            </svg>
          </button>
          <button  onClick={() => handleDelete(car.id)} class="mr-4" title="Delete">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
              <path
                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                data-original="#000000" />
              <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                data-original="#000000" />
            </svg>
          </button>
        </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <nav className="flex justify-center mt-4">
          <ul className="flex items-center">
            {Array.from({ length: Math.ceil(carData.length / carsPerPage) }, (_, i) => (
              <li key={i}>
                <button
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    currentPage === i + 1 ? 'bg-blue-500 text-white' : 'text-blue-500'
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
        )}
      {showPopup && selectedcar && (
        <div className="fixed lg:ml-64  overflow-y-auto inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg mt-80">
            {editedcar.carImage && (
              <div>
                <img
                  className="w-32 h-32 object-cover mb-4"
                  src={editedcar.carImage}
                />
                <button
                  onClick={handleDeleteImage}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-300 rounded-md mr-2"
                >
                  Delete Image
                </button>
              </div>
            )}

            {/* Input to upload a new image */}
            <div>
              <label className="block text-sm font-medium text-black">
                Upload New Image
              </label>
              <input
                type="file"
                onChange={handleReplaceImage}
                className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="vehicleType"
                    className="block text-sm font-medium text-black"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="vehicleType"
                    name="vehicleType"
                    value={editedcar.vehicleType}
                    onChange={(e) =>
                      setEditedCar({
                        ...editedcar,
                        vehicleType: e.target.value,
                      })
                    }
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pricePerKm"
                    className="block text-sm font-medium text-black"
                  >
                    pricePerKm
                  </label>
                  <input
                    type="text"
                    id="pricePerKm"
                    name="pricePerKm"
                    value={editedcar.pricePerKm}
                    onChange={(e) =>
                      setEditedCar({
                        ...editedcar,
                        pricePerKm: e.target.value,
                      })
                    }
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
  <label htmlFor="services" className="block text-sm font-medium text-black">
   services
  </label>
  <select
    id="services"
    name="services"
    value={editedcar.services}
    onChange={(e) =>
      setEditedCar({
        ...editedcar,
        services: e.target.value,
      })
    }
    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
  >
    <option value="">Select services</option>
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
             
              </div>
              

              <div className="mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-300 rounded-md mr-2"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded-md"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    <ToastContainer/>
  </div>
  
  );
}
