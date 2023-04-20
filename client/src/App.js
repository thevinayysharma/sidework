import "./App.css";
import { useState, useEffect } from "react";
import Protected from "./Protected";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/homepage/homepage";
import Admin from "./pages/admin/admin";
import PanForm from "./pages/formspage/panform";
import OrderDetails from "./pages/orderspage/orderdetails";
import Login from "./pages/login/login";
import Payment from "./pages/payment/payment";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import ContactUs from "./pages/contactpage/contact";
import EPFOConsulting from "./pages/epfo/epfo";
import TermsandConditions from "./pages/t&c";
const hideFooter = window.location.pathname === "/payment";

function App() {
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

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pan-apply" element={<PanForm />} />
          <Route path="/orderDetails" element={<OrderDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/paymentSuccess" element={<PaymentSuccess />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/epfoConsulting" element={<EPFOConsulting />} />
          <Route path="/t&c" element={<TermsandConditions />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/admin" element={ <Protected isLoggedIn={isLoggedIn}><Admin handleLogout={handleLogout} /></Protected> }/>
          <Route path="*" element={<HomePage />} />
        </Routes>
        {!hideFooter && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
