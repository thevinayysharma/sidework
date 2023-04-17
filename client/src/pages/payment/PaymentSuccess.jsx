// import { Alert } from "../../components/elements/Alert";
import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
const params = new URLSearchParams(window.location.search);
const razorpayId = params.get("razorpayId");
const clientId = params.get("clientId");

  const successPageStyle = {
    maxWidth: "500px",
    margin: "50px auto 90px",
    padding: "50px",
    color: "#4b5563",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    marginBottom: "10px",
    textAlign: "center",
  };

  const messageStyle = {
    fontSize: "1rem",
    textAlign: "left",
  };

  const linkStyle ={
    color:"#0e7490",
    marginTop: "10px",
    fontWeight: "500",
  }

  return (
    <div style={successPageStyle}>
      <h2 style={titleStyle}>Payment <span style={{color: "green"}}>Successful</span> <i class="fa-sharp fa-solid fa-thumbs-up" style={{color: "#247556"}}></i></h2>
    
      <p style={messageStyle}>
        Your payment with paymentId <span style={{fontWeight : 500}}>{razorpayId}</span>was successful. Your order {clientId} will be processed shortly.
        Thank you for connecting with us! Please Wait, we"ll contact you shortly. You can see your Orderdetails from here by entering your OrderId:
         <li style={linkStyle}>
          <Link to="/orderDetails"><span style={{color: "#0e7490"}}>Check OrderDetails</span></Link>
        </li>

      </p>
    </div>
  );
};

export default PaymentSuccess; 



