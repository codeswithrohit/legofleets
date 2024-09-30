import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc, getDocs } from "firebase/firestore"; // Firestore methods
import { getFirestore } from 'firebase/firestore';
import { AiOutlinePlus } from 'react-icons/ai'; // For add button icon
import AdminNav from '../../components/AdminNav';

const Testimonial = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', place: '', comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(); // Initialize Firestore

  // Fetch testimonials data from Firestore
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonialsRef = collection(db, 'testimonials');
        const snapshot = await getDocs(testimonialsRef);
        if (snapshot.empty) {
          setTestimonials([]);
        } else {
          const testimonialsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTestimonials(testimonialsData);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        toast.error('Error fetching testimonials.');
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, [db]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const testimonialsRef = collection(db, 'testimonials');
      await addDoc(testimonialsRef, {
        name: formData.name,
        place: formData.place,
        comment: formData.comment,
        createdAt: new Date(),
      });

      setIsSubmitting(false);
      toast.success('Testimonial submitted successfully!');
      setFormData({ name: '', place: '', comment: '' });
      handleClose();

      // Refresh the testimonials list after submission
      setLoading(true);
      const snapshot = await getDocs(testimonialsRef);
      const testimonialsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTestimonials(testimonialsData);
      setLoading(false);
      
    } catch (error) {
      setIsSubmitting(false);
      toast.error('Error submitting testimonial.');
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <AdminNav />
      <div className="lg:ml-64 p-4">
        {/* Add Testimonial Button */}
        <button
          onClick={handleOpen}
          className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition"
        >
          <AiOutlinePlus className="mr-2" /> Add Testimonial
        </button>

        {/* Testimonial heading */}
        <h1 className="text-3xl font-semibold mb-4">Testimonials</h1>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <>
            {/* No Data Available */}
            {testimonials.length === 0 ? (
              <div className="text-center py-10">No testimonials available</div>
            ) : (
              <table className="min-w-full bg-white border rounded-lg shadow-md">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Place</th>
                    <th className="px-4 py-2 border">Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((testimonial) => (
                    <tr key={testimonial.id} className="text-center">
                      <td className="px-4 py-2 border">{testimonial.name}</td>
                      <td className="px-4 py-2 border">{testimonial.place}</td>
                      <td className="px-4 py-2 border">{testimonial.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {/* Modal for adding testimonials */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Add a Testimonial</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Place</label>
                  <input
                    type="text"
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Comment</label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-2 text-4xl right-2 text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>

      {/* React Toastify container */}
      <ToastContainer />
    </div>
  );
};

export default Testimonial;
