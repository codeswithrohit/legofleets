import React from 'react'
import Image from 'next/image'
const aboutus = () => {
  return (
    <div className='bg-white min-h-screen' >
        <div class="font-[sans-serif] text-gray-800 bg-white px-6 py-4">
      <div class="grid lg:grid-cols-2 gap-8 max-lg:max-w-2xl mx-auto">
        <div class="text-left">
          <h2 class="text-4xl font-extrabold mb-6">About Us</h2>
          <p class="mb-4 text-sm">Established in 1997 as Amit Tours & Travels, now called LEGOFLEETS, we take pride in providing reliable and punctual car rental services in Pune, catering to the needs of both locals and tourists. With our extensive fleet of well-maintained vehicles, we ensure a hassle-free and comfortable travel experience.</p>
          <p class="mb-4 text-sm">With years of experience in the industry, LEGOFLEETS has established a reputation for providing reliable and customer-centric car rental solutions. Our dedicated team strives to ensure a seamless and comfortable experience for every customer, with a strong focus on safety and satisfaction.</p>
          <p class="text-sm">Our car rental services cover not only Pune but also Mumbai and other national destinations, making it convenient for you to travel across various cities with ease. Whether you need a car for business meetings, airport transfers, or exploring the beautiful sights, LEGOFLEETS has got you covered.</p>
          <p class="text-sm">Our experienced drivers are well-versed with the local routes and can take you to your destination safely and efficiently. With LEGOFLEETS, you can explore the bustling streets of Pune, the vibrant nightlife of Mumbai, or the iconic landmarks of national cities with ease and comfort.</p>
          <p class="text-sm">With a focus on customer satisfaction, we strive to provide exceptional service, competitive prices, and a wide range of car options to suit your preferences. Our team of professional and experienced drivers ensures your safety and comfort throughout your journey. Trust LEGOFLEETS for all your car rental needs and experience a smooth and enjoyable ride.</p>
          <div class="grid xl:grid-cols-3 sm:grid-cols-2 gap-8 mt-12">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" class="fill-green-500 shrink-0" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000"></path>
              </svg>
              <h6 class="text-base font-semibold ml-4">Safety First</h6>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" class="fill-green-500 shrink-0" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000"></path>
              </svg>
              <h6 class="text-base font-semibold ml-4">Reasonable Rates</h6>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" class="fill-green-500 shrink-0" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000"></path>
              </svg>
              <h6 class="text-base font-semibold ml-4">Largest Fleet</h6>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" class="fill-green-500 shrink-0" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000"></path>
              </svg>
              <h6 class="text-base font-semibold ml-4">Nationwide Service</h6>
            </div>
           
          </div>
        </div>
        <div class="flex justify-center items-center">
          <img src="https://readymadeui.com/management-img.webp" alt="Placeholder Image" class="rounded-lg object-cover w-full h-full" />
        </div>
      </div>
    </div>
    </div>
  )
}

export default aboutus