import React from "react";
import "./midsection.css";

function MidSection() {
  return (
    <div className="midContainer">
      <div className="header">
        <h1>Our Services</h1>
      </div>

      <div className="services">
        <div className="card">
          <div className="image"></div>
          <div className="title">
            <p className="text">AADHAR</p>
          </div>
        </div>

        <div className="card">
          <div className="image"></div>
          <div className="title">
            <p className="text">PAN</p>
          </div>
        </div>

        <div className="card">
          <div className="image"></div>
          <div className="title">
            <p className="text">PASSPORT</p>
          </div>
        </div>
      </div>

      <div className="workdesc">
        <div className="header">
          <h1>Our Services</h1>
        </div>

        <div className="card">
          <div className="card1">
            <h2 className="card__title">1. Get set Write</h2>
            <p className="card__text">
              Please fill the form with required details with an easy to fill
              from. All documents filling with only a handful of details.
            </p>
          </div>

          <div className="card2">
            <h2 className="card__title">2. Pay in Seconds</h2>
            <p className="card__text">
              Pay a small fee for our serrvices with a secure razorpay checkout.
              All feedback is appreciated to help us improve our offering!
            </p>
          </div>

          <div className="card3">
            <h2 className="rating-card__title">3. Get your Work ticket</h2>
            <p className="rating-card__text">
              Get requested details along with confrimation on whatsapp
              automatically. All sevices and tickes on whatsapp enabled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MidSection;
