import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./payment.css";
//add logo

function Payment() {
  const { state } = useLocation();
  // const amount = state?.amount;
  // const clientId = state?.userclientId;
  const amount  = 200;
  const clientId = "dfhjds";

  //gateway
  async function displayRazorpay() {
    const res = await loadRazorpay();;
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    // console.log("parmams_values", amount, clientId);
    //API CALL to server
      const data = await axios.post("http://localhost:5000/payment", {
        // clientId: state?.clientId,
        // amount: state?.amount,
        clientId: clientId,
        amount:amount
      }).then((t) =>
      t.json()
    );

    console.log(data);

    if (!data) {
      alert("Server error. Are you online?");
      return;
    }

    var options = {
      key: 'rzp_test_JordB2SkkjmaW5', // Enter the Key ID generated from the Dashboard
      name: "Docs Zone",
      amount: data.amount,
      currency: data.currency,
      order_id: data.orderId,
      description: "Test Transaction",
      image: "https://manuarora.in/logo.png", // {logo}to add image: { logo },
      prefill: {
        name: "docszone",
        email: "docszone@example.com",
        contact: "9911897878",
      },
      notes: {
        clientId: data.clientId,
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
          "http://localhost:5000/verify-payment",
          razdata
        );
        if (result.status === "success") {
          // Redirect the user to the payment confirmation page along with params
          const razorpay_order_id = razdata.razorpay_order_id;
          const paymentSuccessUrl = "/paymentSuccess?razorpayId=" + razorpay_order_id + "&clientId=" + clientId;
          window.location.href = paymentSuccessUrl;
        } else {
          alert(result.status);
        }
      }
    };
    
    const paymentObject = new window.Razorpay(options);
    // console.log(paymentObject);
    paymentObject.open();
  }

  const loadRazorpay = ()  => {
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
  }

  // useEffect(() => {
  //   displayRazorpay();
  // }, []);

  return (
    <div className="payment">
        <p>Please Pay for succesfull execution</p>
        <a className="payment-link" onClick={displayRazorpay}>
          Pay
        </a>
    </div>
  );
}

export default Payment;
