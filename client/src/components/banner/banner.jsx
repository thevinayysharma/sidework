import React from "react";
import "./banner.css";
import image from "../../assets/banner.png";

function Banner() {
  return (
    <div>
      <section className="ban_sec">
          <div className="ban_img">
            <img
              src={image}
              alt="banner"
            />
            <div className="ban_text">
              <strong>
                <span>Government Services</span> &nbsp; 
              </strong>
              <p>
                Apply for pancard, aadhar and all documents <br />
              </p>
              <a href="#">Apply Now!</a>
            </div>
          </div>
      </section>
    </div>
  );
}

export default Banner;
