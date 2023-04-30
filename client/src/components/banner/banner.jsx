import React from "react";
import "./banner.css";
import image from "../../assets/image.svg";
import imagepan from "../../assets/imagepan.jpg";
import imagepassport from "../../assets/imagepassport.png";
import { useTranslation } from "react-i18next";

function Banner() {
  const { t } = useTranslation();
  return (
    <div className="bannercontainer">
      <div className="flex-container1">
        <div className="bantext-container">
          <p className="bantext">{t("documentServicePlatform")}</p>
          <p className="description">{t("applyOnline")}</p>
          <button className="checkout">{t("applyToday")}</button>
        </div>

        <div className="collage-container">
          <div className="collage">
            <img src={image} className="collage-image1" alt="natasha" />
            <img
              src={imagepassport}
              className="collage-image2"
              alt="passport"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
