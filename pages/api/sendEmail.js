import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const formData = req.body; // Retrieve form data

  // Print all form data received
  console.log("Form Data:", formData);

  // Create a Nodemailer transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hrohit320@gmail.com", // Your email address
      pass: "fmyhsearwbhwcwct", // Your email password
    },
  });

  try {
    // Email content
    const info = await transporter.sendMail({
      from: "hrohit320@gmail.com", // Sender address
      to: formData.email, // Receiver address
      subject: "Booking Confirmation By Legofleets", // Subject line
      html: `
      <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold mb-4">Booking Confirmation</h1>
      <p class="text-lg">Dear ${formData.firstName} ${formData.lastName},</p>
      <p class="text-lg">Thank you for booking with us!</p>
      <p class="text-lg">Here are your booking details:</p>
      <ul>
        <li>Vehicle Type: ${formData.selectedVehicleType}</li>
        <li>Price: ${formData.selectedPrice}</li>
        <li>Passenger: ${formData.selectedPassenger}</li>
        <li>Suitcase: ${formData.selectedSuitcase}</li>
        <li>Pickup Location: ${formData.selectedPickupLocation}</li>
        <li>Dropoff Location: ${formData.selectedDropoffLocation}</li>
        <li>Pickup Date: ${formData.selectedPickupDate}</li>
        <li>Distance: ${formData.selectedDistance}</li>
        <li>Service: ${formData.selectedService}</li>
        <li>Dropoff Date: ${formData.selectedDropoffDate}</li>
        <li>Email: ${formData.email}</li>
        <li>Phone Number: ${formData.phoneNumber}</li>
        <li>Your Address: ${formData.youaddress}</li>
        <li>Comment: ${formData.comment}</li>
      </ul>
      <p class="text-lg">We look forward to serving you!</p>
      <div class="mt-6 text-sm text-gray-600">
        <p>Best regards,</p>
        <p class="text-red-600">LegoFleets</p>
      </div>
    </div>
    `,
    });

    console.log("Email sent: %s", info.messageId);

    // Send response with a confirmation message
    return res.status(200).json({ message: "Booking confirmed. Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
