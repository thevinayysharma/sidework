import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./payment.css";

function Payment() {
  const { state } = useLocation();
  const amount = 200000;
  const clientId = "sddfd2";
  // const clientId = state?.clientId;
  // const amount = state?.amount;

  //gateway
  async function displayRazorpay() {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

   // const response = await fetch('http://localhost:5001/razorpay', { method: 'POST' });
    const response = await fetch("http://localhost:5001/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
    console.log(response);
   
    if (!response) {
      alert("Server error. Are you online?");
      return;
    }

    var options = {
      key: "rzp_test_JordB2SkkjmaW5",
      name: "web and Machines",
      amount: response.amount,
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
    <div className="payment">
      <p>Please Pay for succesfull execution</p>
      <button className="payment-link" onClick={displayRazorpay}>
        Pay
      </button>
    </div>
  );
}

export default Payment;
