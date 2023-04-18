import React, { useState } from "react";
import "./epfo.css";
import epfoImg from "../../assets//epfoimg.jpg";

const EPFOConsulting = () => {


  return (
    <div className="epfo-consulting-container">
      <div className="epfo-consulting-form-container">
        <h2>EPFO Consulting </h2>
        <div className="epfo-consulting-form">
            <p>We provide smooth assistance to all your Pf queries <br/> regarding registration and PF withdrawal for individuals.</p>
            <img id="epfoimg" src={epfoImg} alt="img" />
        </div>
        <div className="epfocta">Consult Now @9912323399 for <strong>₹99/-</strong></div>
      </div>
    </div>
  );
};

export default EPFOConsulting;
