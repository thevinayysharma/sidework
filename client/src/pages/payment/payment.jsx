import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./payment.css";
import paymentimage from "../../assets/payment.png";

function Payment() {
  const { state } = useLocation();
  const clientId = state?.clientId;
  const amount = state?.amount;

  //gateway
  async function displayRazorpay() {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const response = await fetch("http://localhost:5001/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response) {
      alert("Server error. Are you online?");
      return;
    }

    var options = {
      key: "rzp_test_JordB2SkkjmaW5",
      name: "Docs space",
      amount: state.amount,
      currency: response.currency,
      order_id: response.orderId,
      description: "Test Transaction",
      image: "https://manuarora.in/logo.png", // {logo}to add image: { logo },
      prefill: {
        name: "docszone",
        email: "docszone@example.com",
        contact: "9911897878",
      },
      theme: {
        color: "#61dafb",
      },
      handler: async function (response) {
        const razdata = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          clientId: state.clientId,
        };

        const result = await axios.post(
          "http://localhost:5001/verify-payment",
          razdata
        );
        if (result.status === "success") {
          // Redirect the user to the payment confirmation page along with params
          const razorpay_order_id = razdata.razorpay_order_id;
          const paymentSuccessUrl =
            "/paymentSuccess?razorpayId=" +
            razorpay_order_id +
            "&clientId=" +
            clientId;
          window.location.href = paymentSuccessUrl;
        } else {
          alert(result.status);
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  return (
    <div className="payment-container">

        <div className="item-container">
          <div className="item-details">
            <div className="content">
              <h3 className="payment-header">Payment Details</h3>
              <div className="payment-details">
                <p>ClientId: <span className="boldmsg">{clientId}</span></p>
                <p>Amount: &#8377;  <span className="boldmsg">{amount}</span></p>
                <hr/>
              </div>
              <p className="payment-message">
                *Thank you for proceeding to payment gateway! To complete your
                purchase, please click the payment button below. We appreciate
                your patience and look forward to serving you again in the
                future.
              </p>
              <button className="checkout-btn" onClick={displayRazorpay}>
                Pay Now
              </button>
            </div>
          </div>
          <div className="payment-image">
            <img className="pay-img" id="item-image" src={paymentimage} alt="name" />
            <div className="sub-details">
              <ul className="sub-details-list">
                <li>Price Gst Included</li>
                <li>Payment-gateway: razorpay</li>
              </ul>
              <p className="companyname">Docsspace pvt. ltd.</p>
            </div>
          </div>

      </div>
    </div>
  );
}

export default Payment;
