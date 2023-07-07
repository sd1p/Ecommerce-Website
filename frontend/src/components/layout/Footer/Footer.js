import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS.</p>
        <img src={playStore} alt="playStore logo" />
        <img src={appStore} alt="appStore logo" />
      </div>
      <div className="midFooter">
        <h1>E-STORE</h1>
        <p>Delivering The Best Products Around The World.</p>
        <p>Copyrights 2023 &copy; SKM</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="/">Linkedin</a>
        <a href="/">GitHub</a>
        <a href="/">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
