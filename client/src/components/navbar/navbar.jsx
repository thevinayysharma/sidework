import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import docsimg from "../../assets/docsspacelogo.png";

export default function Navbar() {
  const [showAadharMenu, setShowAadharMenu] = useState(false);
  const [showPanCardMenu, setShowPanCardMenu] = useState(false);
  const [showPassportMenu, setShowPassportMenu] = useState(false);

  const handleAadharMenu = () => {
    setShowAadharMenu(!showAadharMenu);
  };

  const handlePanCardMenu = () => {
    setShowPanCardMenu(!showPanCardMenu);
  };

  const handlePassportMenu = () => {
    setShowPassportMenu(!showPassportMenu);
  };

  return (
    <div className="navmenu">
       <div className="navbarlogo">
        <img src={docsimg} alt="Logo" />
      </div>
      <div className="navitems">
        <li className="anchor" href="#">
          <Link to="/">Home</Link>
        </li>
        <li
          className="anchor"
          onMouseEnter={handleAadharMenu}
          onMouseLeave={handleAadharMenu}
        >
          Aadhar
          {showAadharMenu && (
            <ul className="submenu">
              <li>
                <Link to="/aadhar-apply">Apply New Aadhar</Link>
              </li>
              <li>
                <Link to="/aadhar-correction">Aadhar Correction</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className="anchor"
          onMouseEnter={handlePanCardMenu}
          onMouseLeave={handlePanCardMenu}
        >
          Pan Card 
          {showPanCardMenu && (
            <ul className="submenu">
              <li>
                <Link to="/panform">Apply New Pan Card</Link>
              </li>
              <li>
                <Link to="/pan-correction">Pan Card Correction</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className="anchor"
          onMouseEnter={handlePassportMenu}
          onMouseLeave={handlePassportMenu}
        >
          PassPort
          {showPassportMenu && (
            <ul className="submenu">
              <li>
                <Link to="/passport">Apply New PassPort</Link>
              </li>
              <li>
                <Link to="/passport-correction">Passport Correction</Link>
              </li>
            </ul>
          )}
        </li>
        <li  className="anchor">
          <Link to="/orderDetails">Check Order </Link>
        </li>
        <li  className="anchor">
          <Link to="/admin"> Admin</Link>
        </li>
      </div>
    </div>
  );
}

