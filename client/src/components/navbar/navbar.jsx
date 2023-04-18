import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import docsimg from "../../assets/docsspacelogo.png";

export default function Navbar() {
  const [showAadharMenu, setShowAadharMenu] = useState(false);
  const [showPanCardMenu, setShowPanCardMenu] = useState(false);
  const [showPassportMenu, setShowPassportMenu] = useState(false);
  const [showLicenseMenu, setShowLicenseMenu] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleAadharMenu = () => {
    setShowAadharMenu(!showAadharMenu);
  };

  const handlePanCardMenu = () => {
    setShowPanCardMenu(!showPanCardMenu);
  };

  const handlePassportMenu = () => {
    setShowPassportMenu(!showPassportMenu);
  };

  const handleLicenseMenu = () => {
    setShowLicenseMenu(!showLicenseMenu);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="outerNavContainer">
      <div className="navmenu">
        {/* <div className="navitems"> */}
        <div className={`navitems ${clicked ? "active" : ""}`}>
          <div className="navbarlogo">
            <img src={docsimg} alt="Logo" />'
          </div>
          <li className="anchor">
            <Link to="/">Home</Link>
          </li>
          <li
            className="anchor"
            onMouseEnter={handleAadharMenu}
            onMouseLeave={handleAadharMenu}
          >
            Aadhaar
            <span className="arrow-down"></span>
            {showAadharMenu && (
              <ul className="dropdown">
                <li>
                  <Link to="/aadhaar-apply">Apply New Aadhaar</Link>
                </li>
                <li>
                  <Link to="/aadhaar-correction">Aadhaar Correction</Link>
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
            <span className="arrow-down"></span>
            {showPanCardMenu && (
              <ul className="dropdown">
                <li>
                  <Link to="/pan-apply">Apply New Pan</Link>
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
            <span className="arrow-down"></span>
            {showPassportMenu && (
              <ul className="dropdown">
                <li>
                  <Link to="/passport-apply">Apply New PassPort</Link>
                </li>
                <li>
                  <Link to="/passport-correction">Passport Correction</Link>
                </li>
              </ul>
            )}
          </li>
          <li
            className="anchor"
            onMouseEnter={handleLicenseMenu}
            onMouseLeave={handleLicenseMenu}
          >
            License
            <span className="arrow-down"></span>
            {showLicenseMenu && (
              <ul className="dropdown">
                <li>
                  <Link to="/license-apply">Apply New License</Link>
                </li>
                <li>
                  <Link to="/license-correction">License Duplicate</Link>
                </li>
                <li>
                  <Link to="/license-renewal">License Renewal</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="anchor">
            <Link to="/orderDetails">Check Order</Link>
          </li>
          <li className="anchor" href="#">
            <Link to="/epfoConsulting">EPFO</Link>
          </li>
          <li className="anchor" href="#">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="anchor">
            <Link to="/admin"> Admin</Link>
          </li>
        </div>
        <div className="nav-bg-fostrap">
          {/* <div className="navbar-fostrap" onClick={handleClick}> */}
          <div
            className={`navbar-fostrap ${clicked ? "clicked" : ""}`}
            onClick={handleClick}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <a href="/" className="title-mobile">
            DocsZone
          </a>
        </div>
      </div>
    </div>
  );
}
