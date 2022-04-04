import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ZinariLogo from "../../assets/images/zinarilogo.png";
import ConnectImg from "../../assets/images/connectImg.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">
            <img src={ZinariLogo} alt="zinari-logo" />
          </Link>
        </div>

        <div className={`nav-links ${open && "open"}`}>
          <ul>
            <li className="nav-link">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-link">
              <Link to="/#mint">Mint</Link>
            </li>
            <li className="nav-link">
              <Link to="/#features">Features</Link>
            </li>
            <li className="nav-link">
              <Link to="/#team">Team</Link>
            </li>
            <li className="nav-link">
              <Link to="/">Contact</Link>
            </li>
            <li className="nav-link">
              <a href="/">
                <button className="nav-btn">
                  Connect
                  <span>
                    <img src={ConnectImg} alt="connect" />
                  </span>
                </button>
              </a>
            </li>
          </ul>
        </div>

        <div
          className={`nav-toggle ${open && "open"}`}
          onClick={() => setOpen(!open)}
        >
          <div className="bar"></div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
