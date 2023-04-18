// import React from 'react';

// const ContactUs = () => {
//   return (
//     <div className="contact-us-container">
//       <h2>Contact Us</h2>
//       <div className="contact-info">
//         <h3>Contact Information</h3>
//         <p>Address: 123 Main Street</p>
//         <p>Phone: 555-555-5555</p>
//         <p>Email: info@company.com</p>
//       </div>
//     </div>
//   );
// }

// export default ContactUs;


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
          Address: 123 Main Street, Anytown, USA 12345<br />
          Phone: 555-555-5555<br />
          Email: docsspace@gmail.com
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
