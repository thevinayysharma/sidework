import React from "react";
import "./banner.css";
import image from "../../assets/image.svg";
import imagepan from "../../assets/imagepan.jpg";
import imagepassport from "../../assets/imagepassport.png";


function Banner() {
  return (
      <div className="bannercontainer">
      <div className="flex-container1">
       
        <div >
          <p className="text">The document service platform, built for all your needs</p>
          <p className="description">Effortlessly apply online for documents, with speedy process checkouts. </p>
          <button className="checkout">Apply today</button>
        </div>
       
        <div className="collage-container">
          <div className="collage">
            <img src={image} className="collage-image1" alt="natasha" />
            <img src={imagepassport} className="collage-image2" alt="passport" />
          </div>
        </div>

    </div>
    </div>
  );
}

export default Banner;
