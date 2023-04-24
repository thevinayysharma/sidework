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

function MidSection() {
  return (
    <div className="midContainer">
      <div className="services">
        <img id="imgbg" src={msoneimagebg} className="imagems" />
        <p className="msHeader">Our Services</p>
        <p className="msHeader msHeaderpara ">
          Avail lots of services, from Consulting to applying documents!
        </p>
        <div className="card-container">
          

          <div className="card">
            <div className="imageIcon">
              <img id="imge" src={panIcon} alt="yo" />
            </div>
            <div className="title">
              <p className="text">PAN</p>
              <ul className="list-unstyled">
                <li>
                  <span className="arrow"> &#9733; </span>Apply new PAN
                </li>
                <li>
                  <span className="arrow"> &#9733; </span>Pan Correction{" "}
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="imageIcon">
              <img id="imge" src={rcIcon} alt="yo" />
            </div>
            <div className="title">
              <p className="text">Vehicle RC</p>
              <ul className="list-unstyled">
                <li>
                  <span className="arrow"> &#9733; </span>Apply new vehicle RC
                </li>
                <li>
                  <span className="arrow"> &#9733; </span>Duplicate RC{" "}
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="imageIcon">
              <img id="imge" src={passportIcon} alt="yo" />
            </div>
            <div className="title">
              <p className="text">PASSPORT</p>
              <ul className="list-unstyled">
                <li>
                  <span className="arrow"> &#9733; </span>Apply new passport
                </li>
                <li>
                  <span className="arrow"> &#9733; </span>Passport Renewal{" "}
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="imageIcon">
              <img id="imge" src={dlIcon} alt="yo" />
            </div>
            <div className="title">
              <p className="text">LICENSE</p>
              <ul className="list-unstyled">
                <li>
                  <span className="arrow"> &#9733; </span>Apply new License
                </li>
                <li>
                  <span className="arrow"> &#9733; </span>License Renew{" "}
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="imageIcon">
              <img id="imge" src={epfoIcon} alt="yo" />
            </div>
            <div className="title">
              <p className="text">EPFO</p>
              <ul className="list-unstyled">
                <li>
                  <span className="arrow"> &#9733; </span>EPFO Consulting
                </li>
                <li>
                  <span className="arrow"> &#9733; </span>EPFO services{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="quesms">Want to know more or have a Question?</p>
      </div>

      <div className="workdesc-container">
        <img id="imgee" className="workimg" src={workimg} alt=""/>
      </div>

    </div>
  );
}

export default MidSection;
