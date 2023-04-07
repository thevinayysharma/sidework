// import { Alert } from "../../components/elements/Alert";
import React from "react";

const PaymentSuccess = () => {
const params = new URLSearchParams(window.location.search);
const razorpayId = params.get("razorpayId");
const clientId = params.get("clientId");

  const successPageStyle = {
    maxWidth: "500px",
    margin: "50px auto 90px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    fontSize: "2rem",
    marginBottom: "10px",
    textAlign: "center",
  };

  const messageStyle = {
    fontSize: "1.2rem",
    textAlign: "center",
  };

  return (
    <div style={successPageStyle}>
      <h2 style={titleStyle}>Payment <span style={{color: "green"}}>*Successful*</span></h2>
      <p style={messageStyle}>
        Your payment <span style={{fontWeight : 500}}>{razorpayId}</span>was successful. Your order {clientId} will be processed shortly.
        Thank you for connecting with us! Please Wait, we"ll contact you shortly.
      </p>
    </div>
  );
};

export default PaymentSuccess;



