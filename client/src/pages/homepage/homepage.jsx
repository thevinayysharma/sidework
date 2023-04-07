import React from "react";
import MidSection from "../../components/midsection/midsection";
// import Footer from "../../components/footer/footer";
import "./homepage.css";
import Banner from "../../components/banner/banner";

export default function HomePage() {
  return (
    <div className="homepage">
      <Banner />
      <MidSection />
    </div>
  );
}
