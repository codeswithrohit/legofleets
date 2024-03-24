import twilio from 'twilio';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed', message: 'Only POST requests are allowed' });
  }

  const formData = req.body;
  const textBody = `
    Booking Confirmation By Legofleets

    Dear ${formData.firstName} ${formData.lastName},

    Thank you for booking with us!
    
    Here are your booking details:
    - Vehicle Type: ${formData.selectedVehicleType}
    - Price: ${formData.selectedPrice}
    - Passenger: ${formData.selectedPassenger}
    - Suitcase: ${formData.selectedSuitcase}
    - Pickup Location: ${formData.selectedPickupLocation}
    - Dropoff Location: ${formData.selectedDropoffLocation}
    - Pickup Date: ${formData.selectedPickupDate}
    - Distance: ${formData.selectedDistance}
    - Service: ${formData.selectedService}
    - Dropoff Date: ${formData.selectedDropoffDate}
    - Email: ${formData.email}
    - Phone Number: ${formData.phoneNumber}
    - Your Address: ${formData.yourAddress}
    - Comment: ${formData.comment}
    
    We look forward to serving you!
    
    Best regards,
    LegoFleets
  `;

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  try {
    const message = await client.messages.create({
      body: textBody,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:+917667411501`
    });

    console.log('Message SID:', message.sid);
    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Error sending message' });
  }
}
