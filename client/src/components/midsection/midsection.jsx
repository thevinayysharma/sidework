import React from "react";
import "./midsection.css";
import msoneimagebg from "../../assets/msimage.png";
import workimg from "../../assets/work_image.png";
// ICONS
import rcIcon from "../../assets/icons/rc.jpeg";
import panIcon from "../../assets/icons/pan.jpg";
import passportIcon from "../../assets/icons/passport.jpg";
import dlIcon from "../../assets/icons/license.png";
import epfoIcon from "../../assets/icons/epfo.jpg";
import { useTranslation } from "react-i18next";

function MidSection() {
  const { t } = useTranslation();
  return (
    <div className="midContainer">
      <div className="services">
        <img id="imgbg" src={msoneimagebg} className="imagems" />
        <p className="msHeader">{t("Our Services")}</p>
        <p className="msHeader msHeaderpara ">
          {t("Avail lots of services, from Consulting to applying documents!")}
        </p>
        <div className="card-container">
          <div className="card">
            <div className="imageIcon">
              <img id="imge" src={panIcon} alt="yo" />
            </div>
            <div className="title">
            <p className="text">{t("PAN")}</p>
              <ul className="list-unstyled">
                <li>
                <span className="arrow"> &#9733; </span>{t("Apply new PAN")}
                </li>
                <li>
                <span className="arrow"> &#9733; </span>{t("Pan Correction")}
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="imageIcon">
              <img id="imge" src={rcIcon} alt="yo" />
            </div>
            <div className="title">
            <p className="text">{t("VEHICLE RC")}</p>
              <ul className="list-unstyled">
              <li>
              <span className="arrow"> &#9733; </span>{t("Apply new vehicle RC")}
            </li>
            <li>
              <span className="arrow"> &#9733; </span>{t("Duplicate RC")}
            </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="imageIcon">
              <img id="imge" src={passportIcon} alt="yo" />
            </div>
            <div className="title">
            <p className="text">{t("PASSPORT")}</p>
          <ul className="list-unstyled">
            <li>
              <span className="arrow"> &#9733; </span>{t("Apply new passport")}
            </li>
            <li>
              <span className="arrow"> &#9733; </span>{t("Passport Renewal")}
            </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="imageIcon">
              <img id="imge" src={dlIcon} alt="yo" />
            </div>
            <div className="title">
            <p className="text">{t("LICENSE")}</p>
          <ul className="list-unstyled">
            <li>
              <span className="arrow"> &#9733; </span>{t("Apply new License")}
            </li>
            <li>
              <span className="arrow"> &#9733; </span>{t("License Renew")}
            </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="imageIcon">
              <img id="imge" src={epfoIcon} alt="yo" />
            </div>
            <div className="title">
              <p className="text">{t("EPFO")}</p>
              <ul className="list-unstyled">
                <li>
                  <span className="arrow"> &#9733; </span>{t("EPFO Consulting")}
                </li>
                <li>
                  <span className="arrow"> &#9733; </span>{t("EPFO services")}{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="quesms">{t("Want to know more or have a Question?")}</p>
      </div>

      <div className="workdesc-container">
        <img id="imgee" className="workimg" src={workimg} alt="" />
      </div>
    </div>
  );
}

export default MidSection;
