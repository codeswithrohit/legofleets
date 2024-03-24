// components/SendMessage.js
import React, { useState } from 'react';
import axios from 'axios';

const SendMessage = () => {
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      await axios.post('/api/send-message', { to, body: message });
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  return (
    <div>
      <input type="text" placeholder="To (WhatsApp number)" value={to} onChange={(e) => setTo(e.target.value)} />
      <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default SendMessage;
