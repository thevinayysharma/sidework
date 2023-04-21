import React, { useState } from "react";
import axios from "axios";
import "./orderdetails.css";
import nofileimg from "../../assets/notfound.png";

function OrderDetails() {
  const [clientId, setclientId] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileExist, setFileExist] = useState(true);

  const handleSearch = async () => {
    if (clientId === "") {
      return;
    }
    setLoading(true);

    try {
      const response = await axios.get(`/orders/single/${clientId}`);
      const data = response.data;
      console.log(data);
      if (data && data.length > 0) {
        setUserExists(true);
        setUserDetails(data);
        setFileExist(true);
      } else {
        setFileExist(false);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="ordercheck-container">
      <h1 className="ordercheck-heading">Order Details</h1>
      <div className="ordercheck-input">
        <label> Enter your Client Id</label>
        <input
          type="text"
          value={clientId}
          onChange={(e) => setclientId(e.target.value)}
        />
        <button
          className="ordercheck-button"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>
      {!fileExist && (
        <div>
          <p className="notfoundmsg" >Order doesn't exist, check ID again.</p>
        <img
          src={nofileimg}
          alt="File Not Found"
          className="ordercheck-message"
        />
        </div>
      )}
      {userExists ? (
        userDetails.map((user, index) => (
          <div className="ordercheck-info" key={index}>
            <h3> Submitted Details:</h3>
            <div className="ordercheck-info-item">
              <p>Order ID: {user.clientId}</p>
              <p>firstName: {user.firstName}</p>
              <p>lastName: {user.lastName} </p>
              <p>Email: {user.email}</p>
              <p>dob: {user.dob}</p>
              <p>Gender: {user.gender}</p>
              <p>Phone: {user.phone}</p>
              <p>Payment Status: {user.paymentStatus}</p>
              <p>Payment Amount: {user.amount}</p>
            </div>
          </div>
        ))
      ) :  (
        <>
          {/* {!fileExist && <img src={nofileimg} alt="File not found" />} */}
          {fileExist && (
            <p className="ordercheck-message">
              Find your form and payment details.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default OrderDetails;
