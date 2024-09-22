import React from 'react';
import { useSpring, animated } from 'react-spring';

const Services = () => {
  const fadeProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <div className='bg-white' >
    <animated.div style={fadeProps} className="container mx-auto p-6">
      <h2 className="text-4xl text-[#541e50] font-bold mb-6">Experience Hassle-Free Car Rental Services in Pune and Mumbai</h2>
      <p className="mb-6 text-lg">
        At LEGOFLEETS, we offer competitive and affordable car rental packages for all your travel needs.
        Whether you are traveling from Pune to Mumbai airports or planning a local or national journey, we have the perfect car for you.
        Our rates are designed to fit your budget, without compromising on quality and comfort.
      </p>
      <p className="mb-6 text-lg">
        Choose from our wide range of well-maintained and reliable vehicles that cater to different needs and preferences.
        We have Sedans, Mini-SUVs & SUVs for solo travellers or couples, for families, and larger groups or those seeking extra space.
        Our transparent pricing policy ensures there are no hidden costs.
      </p>
      <p className="mb-6 text-lg">
        Our pricing structure is designed to be transparent and flexible, ensuring that you get the best value for your money.
        We offer competitive rates for airport transfers, local trips, and long-distance journeys.
        With LEGOFLEETS, you can enjoy the convenience of renting a car at affordable prices.
      </p>
      <p className="mb-6 text-lg">
        While you can choose a Mini-SUV, Sedan, or SUV, you may be provided any of these cars within your chosen car type, depending on their availability.
      </p>
      <p className="mb-6 text-lg">
        To ensure you have a safe and comfortable journey, we recommend you to keep luggage to boot capacity and avoid putting large bags on passenger seats.
        Following table is for guidance.
      </p>
      <table className="w-full mb-8 border-collapse border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-4">Car Types</th>
            <th className="border p-4">Cars Like</th>
            <th className="border p-4">Passenger Capacity</th>
            <th className="border p-4">Boot Capacity</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="border p-4">Sedan</td>
            <td className="border p-4">Toyota Etios<br />Maruti Dzire<br />Honda Amaze</td>
            <td className="border p-4">4</td>
            <td className="border p-4">2 Medium & 1 Small<br />OR<br />1 Large & 2 Small</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border p-4">Mini SUV</td>
            <td className="border p-4">Maruti Ertiga<br />Kia Carens</td>
            <td className="border p-4">5</td>
            <td className="border p-4">2 Medium<br />OR<br />1 Large & 1 Small</td>
          </tr>
          <tr className="bg-white">
            <td className="border p-4">SUV</td>
            <td className="border p-4">Toyota Innova<br />Toyota Innova Crysta<br />Mahindra Xylo<br />Mahindra Marazzo</td>
            <td className="border p-4">5</td>
            <td className="border p-4">2 Medium & 1 Small<br />OR<br />1 Large & 1 Medium</td>
          </tr>
        </tbody>
      </table>
      <h2 className="text-2xl font-bold mb-6 text-[#541e50]">Our services:</h2>
      <ul className="list-disc pl-6">
        <li className="text-lg">Airport Services</li>
        <li className="text-lg">Pune ↔ Mumbai</li>
        <li className="text-lg">Pune Local</li>
        <li className="text-lg">Mumbai Local</li>
        <li className="text-lg">Pune ↔ National</li>
        <li className="text-lg">Mumbai ↔ National</li>
      </ul>
    </animated.div>
    </div>
  );
};

export default Services;
