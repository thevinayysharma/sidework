import React, { useState } from "react";
import axios from "axios";
import "./orderdetails.css"; // Import CSS file

function OrderDetails() {
  const [clientId, setclientId] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    if(clientId !== ""){
    
    try {
      const response = await axios.get(`/orders/${clientId}`);
      const data  = response.data;
      console.log(data);
      if(data && data.length > 0){
        setUserExists(!userExists);
      }
      setUserDetails(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
}

  return (
    <div className="order-details-container">
      <h1 className="order-details-heading">Order Details</h1>
      <label>
        Client ID:
        <input type="text" value={clientId} onChange={(e) => setclientId(e.target.value)} />
      </label>
      <button className="order-details-button" onClick={handleSearch} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>
      {userExists ? (
        userDetails.map((user, index) => (
          <div className="order-details-info" key={index}>
            <h2> Your Details:</h2>
                       <p className="order-details-info-item">Order ID: {user.clientId}</p>
            <p className="order-details-info-item">Name: {user.firstName} {user.lastName}</p>
            <p className="order-details-info-item">Email: {user.email}</p>
            <p className="order-details-info-item">Payment Status: {user.paymentStatus}</p>
            <p className="order-details-info-item">Order Amount: {user.amount}</p>
          </div>
        ))
      ) : (
        <p className="order-details-message">Please Search with your clientId.</p>
      )}
    </div>
  );
}

export default OrderDetails;
