import React from 'react'

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8 md:p-12">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            About Us
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Welcome to our company! We are dedicated to providing the best
            services for our clients. Our mission is to bring innovation and
            quality to the industry while maintaining a customer-focused approach.
            We believe in hard work, integrity, and delivering exceptional
            results. Join us as we continue to grow and make a positive impact.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Quisque egestas diam in arcu cursus euismod. Nullam vehicula
                ipsum a arcu cursus vitae congue. Ultrices neque ornare aenean
                euismod elementum nisi quis eleifend quam adipiscing vitae.
              </p>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default AboutUs
