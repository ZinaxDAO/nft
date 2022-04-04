import React from "react";
import "./Footer.css";
import TelegramIcon from "../../assets/images/telegram.png";
import TwitterIcon from "../../assets/images/twitter.png";
import GithubIcon from "../../assets/images/github.png";
import MediumIcon from "../../assets/images/medium.png";
import CubesFive from "../../assets/images/cube-five.png";
import BgImg from "../../assets/images/introbg2.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div>
          <h6>ZINARI FINANCE</h6>
          <a href="https://fixgang.com">
            <p>Fixgang</p>
          </a>
          <a href="https://zinax.org">
            <p>zinax.org</p>
          </a>
          <a href="#">
            <p>Privacy-Terms</p>
          </a>
          <p>© 2022</p>
        </div>
        <div>
          <h6>Products</h6>
          <a href="https://zinari.org">
            <p>Payment</p>
          </a>
          <a href="https://api.zinari.org/docs">
            <p>Developers</p>
          </a>
          <a href="https://v2.zinax.org">
            <p>Pools</p>
          </a>
          <a href="https://v2.zinax.org">
            <p>Farms</p>
          </a>
        </div>
        <div>
          <h6>Legal</h6>
          <a href="#">
            <p>Privacy</p>
          </a>
          <a href="#">
            <p>Disclaimer</p>
          </a>
          <a href="#">
            <p>Terms</p>
          </a>
          <a href="#">
            <p>Company</p>
          </a>
        </div>
        <div>
          <h6>Contact</h6>
          <a href="#">
            <p>About</p>
          </a>
          <a href="#">
            <p>Services</p>
          </a>
          <a href="#team">
            <p>Teams</p>
          </a>
          <a href="#">
            <p>FAQ</p>
          </a>
        </div>
      </div>
      <h6>Stay Connected to Zinari</h6>
      <div className="footer-links-div">
        <a href="http://medium.com/@zinari" className="footer-links">
          <img src={MediumIcon} alt="medium-icon" />
        </a>
        <a href="https://twitter.com/zinaxtoken" className="footer-links">
          <img src={TwitterIcon} alt="twitter-icon" />
        </a>
        <a href="https://t.me/zinaxtoken" className="footer-links">
          <img src={TelegramIcon} alt="telegram-icon" />
        </a>
        <a href="#" className="footer-links">
          <img src={GithubIcon} alt="github-icon" />
        </a>
      </div>
      <img src={CubesFive} alt="cubes-five" className="cubes-five" />
      <img src={BgImg} alt="bgimg" className="bg-img" />
    </div>
  );
};

export default Footer;
