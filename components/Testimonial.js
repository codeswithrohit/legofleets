import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    place: 'Mumbai',
    comment: 'LEGOFLEETS made my trip to Pune a breeze! The car was clean and reliable, and the service was exceptional.',
  },
  {
    id: 2,
    name: 'Rajesh S.',
    place: 'Pune',
    comment: 'I highly recommend LEGOFLEETS for their professional and prompt service. They made my airport transfer seamless and stress-free.',
  },
  {
    id: 3,
    name: 'Lisa G.',
    place: 'Mumbai',
    comment: 'The convenience of LEGOFLEETS car rental service exceeded my expectations. I will definitely choose them again for my future trips.',
  },
 
  // Add more testimonials as needed
];

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
    }, 5000); // Change the interval duration (in milliseconds) as needed

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const renderTestimonials = () => {
    return testimonials.slice(currentSlide, currentSlide + 3).map((testimonial) => (
      <div key={testimonial.id} className="max-w-screen-md mx-auto mb-8 lg:w-1/3 lg:mx-4">
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
    <section className="bg-white dark:bg-white -mt-16">
      <div className="flex flex-col items-center justify-center w-full px-6 mx-auto text-center">
        <div className="text-sm font-bold tracking-wider text-[#541e50] uppercase">Testimonials</div>
        <h2 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">Heres what our customers said</h2>
      </div>
      <div className="flex flex-wrap justify-center px-4 py-2 mx-auto text-center lg:py-4 lg:px-6">
        {renderTestimonials()}
      </div>
    </section>
  );
};

export default Testimonial;
