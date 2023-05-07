import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation} from "react-i18next";
import "./navbar.css";
import docsimg from "../../assets/docsspacelogo.png";
export default function Navbar() {
  const [showAadharMenu, setShowAadharMenu] = useState(false);
  const [showPanCardMenu, setShowPanCardMenu] = useState(false);
  const [showPassportMenu, setShowPassportMenu] = useState(false);
  const [showLicenseMenu, setShowLicenseMenu] = useState(false);
  const [clicked, setClicked] = useState(false);

  const { t } = useTranslation();

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
            <Link to="/about-us">{t("About Us")}</Link>
          </li>

          <li
            className="anchor"
            onMouseEnter={handlePanCardMenu}
            onMouseLeave={handlePanCardMenu}
          >
            {t("Pan Card")}
            <span className="arrow-down"></span>
            {showPanCardMenu && (
              <ul className="dropdown">
                <li>
                  <Link to="/pan-apply">{t("Apply New Pan")}</Link>
                </li>
                <li>
                  <Link to="/pan-correction">{t("Pan Card Correction")}</Link>
                </li>
              </ul>
            )}
          </li>
          <li
            className="anchor"
            onMouseEnter={handlePassportMenu}
            onMouseLeave={handlePassportMenu}
          >
            {t("Passport")}
            <span className="arrow-down"></span>
            {showPassportMenu && (
              <ul className="dropdown">
                <li>
                  <Link to="/passport-apply">
                    {t("Apply For Fresh Passport")}
                  </Link>
                </li>
                <li>
                  <Link to="/passport-renewal">{t("Passport Renewal")}</Link>
                </li>
              </ul>
            )}
          </li>
          <li
            className="anchor"
            onMouseEnter={handleLicenseMenu}
            onMouseLeave={handleLicenseMenu}
          >
            {t("License")}
            <span className="arrow-down"></span>
            {showLicenseMenu && (
              <ul className="dropdown">
                <li>
                  <Link to="/license-apply">
                    {t("Apply New Driving License")}
                  </Link>
                </li>
                <li>
                  <Link to="/license-duplicate">
                    {t("Issue Of Duplicate Driving License")}
                  </Link>
                </li>
                <li>
                  <Link to="/license-renewal">
                    {t("Change Of Address In Driving License")}
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li
            className="anchor"
            onMouseEnter={handleAadharMenu}
            onMouseLeave={handleAadharMenu}
          >
            {t("Vehicle RC")}
            <span className="arrow-down"></span>
            {showAadharMenu && (
              <ul className="dropdown">
                <li>
                  <Link to="/rc-apply">
                    {t("Apply Registration Certificate (RC)")}
                  </Link>
                </li>
                <li>
                  <Link to="/rc-correction">
                    {t("Change Of Address in RC")}
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="anchor">
            <Link to="/epfoConsulting">{t("Epfo")}</Link>
          </li>
          <li className="anchor">
            <Link to="/orderDetails">{t("Check Order")}</Link>
          </li>

          <li className="anchor">
            <Link to="/contact">{t("Contact")}</Link>
          </li>
          {/* <li className="anchor">
            <Link to="/login"> Admin</Link>
          </li> */}
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
            eCafeIndia
          </a>
        </div>
      </div>
    </div>
  );
}
