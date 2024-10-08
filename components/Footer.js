import {
    FaPhoneAlt,
    FaMapMarkedAlt,
    FaRegClock,
    FaAngleRight,
    FaMapMarkerAlt,
    FaPhone,
    FaPhoneSquareAlt,
    FaVoicemail,
    FaCalendarWeek,
    FaFacebook,
    FaInstagram,
    FaWhatsapp,
    FaEnvelope,
    
  } from "react-icons/fa";
  import Image from "next/image";
  import Logo from "../public/logo.png";
  import { useRouter } from 'next/router';
  const Footer = () => {
    const router = useRouter();

 
    const handleBookNow = (packageId) => {
        // Redirect to the Home page with the selected packageId
        router.push(`/Home?activeTab=0&selectedPackage=${packageId}`);
      };
    return (
      <div>
        <div className="bg-gray-100 py-16 px-16">
          <div className="container mx-auto flex flex-col space-y-24 ">
            {/* <div className="grid lg:grid-cols-3 gap-20">
              <div className="col-span-1 flex flex-row space-x-3">
                <FaMapMarkedAlt className="w-12 h-12 text-[#541e50]  p-1" />
                <div className="space-y-2">
                  <p className="text-gray-500">ADDRESS</p>
                  <p className="text-gray-600 font-medium">
                    2507 PARKER BOULEVARD Pune, CA 76107
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex flex-row space-x-3">
                <FaPhoneAlt className="w-12 h-12 text-[#541e50]  p-1" />
                <div className="space-y-2">
                  <p className="text-gray-500">PHONES</p>
                  <p className="text-gray-600 font-medium">
                    BOOK A RIDE: +91 7875120099
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex flex-row space-x-3">
                <FaRegClock className="w-12 h-12 text-[#541e50]  p-1" />
                <div className="space-y-2">
                  <p className="text-gray-500">WORKING HOURS</p>
                  <p className="text-gray-600 font-medium">
                    MON-SAT: 07:00 - 17:00 SUN: CLOSED
                  </p>
                </div>
              </div>
            </div> */}
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="col-span-1 space-y-8">
              <Image src='/logo.png'
        alt='logo'
        width={100}
        height={100}
        />
  
                <p className="text-gray-500">
                Established in 1997 as Amit Tours & Travels, now called LEGOFLEETS, we take pride in providing reliable and punctual car rental services  from Pune and Mumbai to all over India, catering to the needs of national and international tourists.
                </p>
              </div>
              <div className="col-span-1 space-y-8">
                <div className="flex flex-col space-y-2">
                  <p className="text-gray-600 font-medium">OUR SERVICES</p>
                  {/* <p className="border-solid border border-[#541e50]  w-1/4 "></p> */}
                </div>
                <div className="flex flex-col space-y-1">
                  <div  onClick={() => handleBookNow(0)} className="flex flex-row cursor-pointer items-center space-x-2">
                   
                    <p className="text-gray-500">Airport Services</p>
                  </div>
                  <div  onClick={() => handleBookNow(1)} className="flex flex-row cursor-pointer items-center space-x-2">
                   
                    <p className="text-gray-500">Pune-Mumbai</p>
                  </div>
                  <div  onClick={() => handleBookNow(2)} className="flex flex-row cursor-pointer items-center space-x-2">
                   
                    <p className="text-gray-500">Pune Local</p>
                  </div>
                  <div  onClick={() => handleBookNow(3)} className="flex flex-row cursor-pointer items-center space-x-2">
                   
                    <p className="text-gray-500">Mumbai Local</p>
                  </div>
                  <div  onClick={() => handleBookNow(4)} className="flex flex-row cursor-pointer items-center space-x-2">
                   
                    <p className="text-gray-500">Pune National</p>
                  </div>
                  <div  onClick={() => handleBookNow(5)} className="flex flex-row cursor-pointer items-center space-x-2">
                   
                    <p className="text-gray-500">Mumbai National</p>
                  </div>
                </div>
              </div>
              <div className="col-span-1 space-y-8">
              <div className="flex flex-col space-y-4">
  <p className="text-gray-600 font-medium">LEGOFLEETS</p>

</div>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-row items-center space-x-4">
                    <FaMapMarkerAlt className="w-6 h-6 text-gray-500  font-light" />
                    <p className="text-gray-500">
                    Undri, Pune. 
                    </p>
                  </div>
                  <div className="flex flex-row items-center space-x-4">
                    <FaPhone className="w-6 h-6 text-gray-500 " />
                    <p className="text-gray-500">+91 7875120099</p>
                  </div>
                  <div className="flex flex-row items-center space-x-4">
                  <FaEnvelope className="w-6 h-6 text-gray-500" />
                    <p className="text-gray-500"> Info@Legofleets.com</p>
                  </div>
                  {/* <div className="flex flex-row items-center space-x-4">
                    <FaCalendarWeek className="w-6 h-6 text-gray-500 " />
                    <p className="text-gray-500">Mon-Sat: 07:00 - 17:00</p>
                  </div> */}
                </div>
              </div>
              <div className="col-span-1 space-y-8">
              <div className="flex flex-col space-y-4">
  <p className="text-gray-600 font-medium uppercase">Connect with us</p>
  
  <div className="flex space-x-4 items-center">
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-500 hover:text-green-600 transition duration-300"
    >
      <FaWhatsapp size={24} />
    </a>
    <a
      href="https://facebook.com/yourprofile"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-700 transition duration-300"
    >
      <FaFacebook size={24} />
    </a>
    <a
      href="https://instagram.com/yourprofile"
      target="_blank"
      rel="noopener noreferrer"
      className="text-pink-500 hover:text-pink-600 transition duration-300"
    >
      <FaInstagram size={24} />
    </a>
  </div>
  <a className="underline" href="/contactus" >Contact Us</a>
</div>
            
              </div>
            
            </div>
          </div>
        </div>
  
        <div className="p-8 container mx-auto flex flex-row justify-between">
          <p>Copyright 2024 LEGOFLEETS </p>
          <div className="flex flex-row space-x-3">
            {/* <FaFacebook className="w-5 h-5 text-gray-500" />
            <FaInstagram className="w-5 h-5 text-gray-500" />
            <FaWhatsapp className="w-5 h-5 text-gray-500" /> */}
          </div>
        </div>
      </div>
    );
  };
  export default Footer;
  