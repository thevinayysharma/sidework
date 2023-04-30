import React, { useState } from "react";
import "./contact.css";

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailContent = {
      email: email,
      message: message,
    };
    // Send email to docsspace@gmail.com
    console.log(emailContent);
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-us-container">
      <div className="contact-us-info">
        <h2>Doc's Space</h2>
        <p>
          Address: 1484, babu park, kotla Mubarakpur, New Delhi 110003<br />
          Phone: +91 9650673487<br />
          Email: ecafeindiahub@gmail.com
        </p>
      </div>
      <form className="contact-us-form" onSubmit={handleSubmit}>
        <h3>Contact Us</h3>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactUs;
