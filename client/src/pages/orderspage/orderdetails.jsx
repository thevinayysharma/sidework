import React, { useState } from "react";
import axios from "axios";
import "./orderdetails.css"; // Import CSS file

function OrderDetails() {
  const [orderId, setOrderId] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/order/${orderId}`);
      const { userExists, userDetails, paymentStatus, orderId } = response.data;
      setUserExists(userExists);
      setUserDetails(userDetails);
      setPaymentStatus(paymentStatus);
      setOrderId(orderId);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="order-details-container">
      <h1 className="order-details-heading">Order Details</h1>
      <label>
        Order ID:
        <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
      </label>
      <button className="order-details-button" onClick={handleSearch} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>
      {userExists ? (
        <div className="order-details-info">
          <p className="order-details-info-item">User Details:</p>
          <p className="order-details-info-item">Name: {userDetails.name}</p>
          <p className="order-details-info-item">Email: {userDetails.email}</p>
          <p className="order-details-info-item">Payment Status: {paymentStatus}</p>
          <p className="order-details-info-item">Order ID: {orderId}</p>
        </div>
      ) : (
        <p className="order-details-message">Please Search for Past orders with your orderId.</p>
      )}
    </div>
  );
}

export default OrderDetails;

