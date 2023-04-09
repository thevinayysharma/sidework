import "./App.css";
import { BrowserRouter, Route, Routes,  useLocation } from "react-router-dom";
import HomePage from "./pages/homepage/homepage";
import Admin from "./pages/admin/admin";
import PanForm from "./pages/formspage/panform";
import OrderDetails from "./pages/orderspage/orderdetails";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
import Payment from "./pages/payment/payment";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import ContactUs from "./pages/contactpage/contact";

const hideFooter = window.location.pathname === "/payment";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/panform" element={<PanForm />} />
          <Route path="/orderDetails" element={<OrderDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/paymentSuccess" element={<PaymentSuccess />} />
          <Route path="/contact" element={<ContactUs />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          <Route component={<HomePage />} />
        </Routes>
        {!hideFooter && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
