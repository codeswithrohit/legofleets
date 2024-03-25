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
      <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); padding: 24px;">
        <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Booking Confirmation</h1>
        <p style="font-size: 16px;">Dear ${formData.firstName} ${formData.lastName},</p>
        <p style="font-size: 16px;">Thank you for booking with us!</p>
        <p style="font-size: 16px;">Here are your booking details:</p>
        <ul style="list-style: none; padding: 0; margin: 16px 0;">
          <li style="font-size: 16px;">Vehicle Type: ${formData.selectedVehicleType}</li>
          <li style="font-size: 16px;">Price: ${formData.selectedPrice}</li>
          <li style="font-size: 16px;">Passenger: ${formData.selectedPassenger}</li>
          <li style="font-size: 16px;">Suitcase: ${formData.selectedSuitcase}</li>
          <li style="font-size: 16px;">Pickup Location: ${formData.selectedPickupLocation}</li>
          <li style="font-size: 16px;">Dropoff Location: ${formData.selectedDropoffLocation}</li>
          <li style="font-size: 16px;">Pickup Date: ${formData.selectedPickupDate}</li>
          <li style="font-size: 16px;">Distance: ${formData.selectedDistance}</li>
          <li style="font-size: 16px;">Service: ${formData.selectedService}</li>
          <li style="font-size: 16px;">Dropoff Date: ${formData.selectedDropoffDate}</li>
          <li style="font-size: 16px;">Email: ${formData.email}</li>
          <li style="font-size: 16px;">Phone Number: ${formData.phoneNumber}</li>
          <li style="font-size: 16px;">Your Address: ${formData.youaddress}</li>
          <li style="font-size: 16px;">Comment: ${formData.comment}</li>
        </ul>
        <p style="font-size: 16px;">We look forward to serving you!</p>
        <a href="${process.env.NEXT_PUBLIC_HOST}/confirmation?id=${formData.docId}" style="text-decoration: none;">
          <button style="background-color: #007bff; color: #ffffff; border: none; border-radius: 4px; padding: 12px 24px; cursor: pointer; font-size: 16px;">
            <span style="margin-right: 8px;">View & Download Booking Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
              <path d="M7 0a1 1 0 0 1 1 1v9.586l2.793-2.793a1 1 0 1 1 1.414 1.414l-4.5 4.5a1 1 0 0 1-1.414 0l-4.5-4.5a1 1 0 1 1 1.414-1.414L6 10.586V1a1 1 0 0 1 1-1z"/>
            </svg>
          </button>
        </a>
        <div style="margin-top: 24px; font-size: 14px; color: #6c757d;">
          <p>Best regards,</p>
          <p style="color: #dc3545;">LegoFleets</p>
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
