import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from "firebase/firestore"; // Firestore methods
import { getFirestore } from 'firebase/firestore';
import { FaSpinner } from 'react-icons/fa'; // For loading spinner
import { toast } from 'react-toastify'; // Assuming toast is being used for notifications

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  // Auto-carousel for testimonials
  useEffect(() => {
    if (testimonials.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
      }, 5000); // Change slides every 5 seconds

      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [testimonials]);

  const renderTestimonials = () => {
    if (testimonials.length === 0) return <p>No testimonials available.</p>;
    return testimonials.slice(currentSlide, currentSlide + 1).map((testimonial) => (
      <div key={testimonial.id} className="max-w-screen-md mx-auto mb-8 lg:w-1/3 lg:mx-4 transition-transform duration-700 ease-in-out transform scale-100">
        <blockquote className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <p className="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">
            {testimonial.comment}
          </p>
          <div className="flex items-center justify-center mt-6 space-x-3">
            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <div className="pr-3 font-medium text-gray-900 dark:text-white">{testimonial.name}</div>
              <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">{testimonial.place}</div>
            </div>
          </div>
        </blockquote>
      </div>
    ));
  };

  return (
    <section className="bg-white dark:bg-white mt-16">
      <div className="flex flex-col items-center justify-center w-full px-6 mx-auto text-center">
        <div className="text-sm font-bold tracking-wider text-[#541e50] uppercase">Testimonials</div>
        <h2 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
          Here's what our customers said
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-gray-500" />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center px-4 py-2 mx-auto text-center lg:py-4 lg:px-6">
          {renderTestimonials()}
        </div>
      )}

      {/* Carousel controls */}
      {!loading && testimonials.length > 1 && (
        <div className="flex justify-center mt-4 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-[#541e50]' : 'bg-gray-300'}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Testimonial;
