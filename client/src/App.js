import "./App.css";
import { useState, useEffect, Suspense } from "react";
import Protected from "./Protected";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import LocaleContext from "./LocaleContext";
import HomePage from "./pages/homepage/homepage";
import Admin from "./pages/admin/admin";
import OrderDetails from "./pages/orderspage/orderdetails";
import Login from "./pages/login/login";
import Payment from "./pages/payment/payment";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import ContactUs from "./pages/contactpage/contact";
import EPFOConsulting from "./pages/epfo/epfo";
import TermsandConditions from "./pages/t&c";
// pages
import AboutUs from "./pages/about/about";
import Pan from "./pages/formspage/pan";
import PanCorrection from "./pages/formspage/panCorrection";
import RC from "./pages/formspage/rc";
import RCCorrrection from "./pages/formspage/rcCorrection";
import License from "./pages/formspage/license";
import LicenseRenewal from "./pages/formspage/licenseRenewal";
import LicenseDuplicate from "./pages/formspage/licenseDuplicate";
import Passport from "./pages/formspage/passport";
import PassportRenewal from "./pages/formspage/passportRenewal";
import Loading from "./components/Loading";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import PrivacyPolicy from "./pages/privacy/privacy";

const hideFooter = window.location.pathname === "/payment";

function App() {
  const [locale, setLocale] = useState(i18n.language);
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const changeLocale = (l) => {
    if (locale !== l) {
      i18n.changeLanguage(l);
      setLocale(l);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <LocaleContext.Provider value={[locale, setLocale]}>
        <BrowserRouter>
          <div className="App">
            <div className="language-dropdown">
              <nav>
                <ul>
                  <li><i className="fa fa-home fa-text-color"></i><Link to="/">{t("Home")}</Link></li>
                  <li onClick={() => changeLocale("en")}>English</li>
                  <li onClick={() => changeLocale("hn")}>हिंदी</li>
                </ul>
              </nav>
            </div>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/rc-apply" element={<RC />} />
              <Route path="/rc-correction" element={<RCCorrrection />} />

              <Route path="/license-apply" element={<License />} />
              <Route path="/license-duplicate" element={<LicenseDuplicate />} />
              <Route path="/license-renewal" element={<LicenseRenewal />} />

              <Route path="/pan-apply" element={<Pan />} />
              <Route path="/pan-correction" element={<PanCorrection />} />

              <Route path="/passport-apply" element={<Passport />} />
              <Route path="/passport-renewal" element={<PassportRenewal />} />

              <Route path="/orderDetails" element={<OrderDetails />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/paymentSuccess" element={<PaymentSuccess />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/epfoConsulting" element={<EPFOConsulting />} />
              <Route path="/t&c" element={<TermsandConditions />} />
              <Route path="/pp" element={<PrivacyPolicy />} />
              <Route
                path="/login"
                element={<Login setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route
                path="/admin"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <Admin handleLogout={handleLogout} />
                  </Protected>
                }
              />
              <Route path="*" element={<HomePage />} />
            </Routes>
            {!hideFooter && <Footer />}
          </div>
        </BrowserRouter>
      </LocaleContext.Provider>
    </Suspense>
  );
}

export default App;
