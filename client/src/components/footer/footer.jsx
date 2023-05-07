import React from "react";
import "./footer.css";
import docsimg from "../../assets/docsspacelogo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// import Logo from "../assets/logo.png"
export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footerContainer">
    <div className="footer-section">
        <div className="footer-cta pt-5 ">
          <div className="row">
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="fas fa-map-marker-alt"></i>
                <div className="cta-text">
                  <h4>Find us</h4>
                  <span>
                  {t("1484, babu park, kotla Mubarakpur, New Delhi 110003")}{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="fas fa-phone"></i>
                <div className="cta-text">
                  <h4>{t("Call us")}</h4>
                  <span>+91 9650673487</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="far fa-envelope-open"></i>
                <div className="cta-text">
                  <h4>{t("Mail us")}</h4>
                  <span>ecafeindiahub@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-content pt-5 pb-1">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-logo">
                  <a href="index.html">
                    <img
                      src={docsimg}
                      className="img-fluid"
                      alt="logo"
                    />
                  </a>
                </div>
                <div className="footer-text">
                  <p>
                  {t("eCafeIndia aids in applying to various government documents in an easy and conveninent way")}
                  </p>
                </div>
                <div className="footer-social-icon">
                  <span>{t("Follow us")}</span>
                  <ul className="social_icon">
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Useful Links</h3>
                </div>
                <ul>
                <li>
                  <Link to="/contact">{t("Contact Us")}</Link>
                  </li>
                  <li>
                    <a href="/about-us">{t("About Us")}</a>
                  </li>
                  <li>
                    <a href="#">{t("Blog")}</a>
                  </li>
                  <li>
                    <a href="/pp">{t("Privacy Policy")}</a>
                  </li>
                  <li>
                  <Link to="/t&c">{t("T&c")}</Link>
                  </li>
                  <li>
                  <li>
                      <Link to="/login">{t("Admin")}</Link>
                  </li>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>{t("Have a Query ?")}</h3>
                </div>
                <div className="footer-text mb-25">
                  <p>
                  {t("Email us right await and let us know how we can help you. kindly fill the submission form below.")}
                  </p>
                </div>
                <div className="subscribe-form">
                  <form action="#">
                    <input type="text" placeholder="Email Address" />
                    <button>
                      <i className="fab fa-telegram-plane"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 text-center text-lg-center">
              <div className="copyright-text">
                <p>
                  Copyright &copy; 2023, All Right Reserved{" "}
                  <a href="#">eCafeIndia</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
    