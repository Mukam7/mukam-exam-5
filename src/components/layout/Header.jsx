import { Button } from "antd";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import logo2 from "../../assets/images/logo.svg";

import "./Header.scss";

const Header = () => {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler

    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const body = document.querySelector("body");
    body.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 1000);
  };
  return (
    <header className="header">
      <div className="container">
        <nav className="nav  ">
          <Link to={"/"} className="nav__brand">
            <img src={logo2} alt="logo" />
          </Link>
          <ul className={active}>
            <li className="nav__item">
              <NavLink to={`/`} className="nav__link">
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="posts" className="nav__link">
                Blog
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="about" className="nav__link">
                About Us
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="register" className="nav__link">
                Register
              </NavLink>
            </li>
            <div className="login">
              <Link to="/login">
                <Button
                  className="loginbtn"
                  style={{ width: "110px", height: "45px" }}
                  // type="primary"
                  loading={loadings[1]}
                  onClick={() => enterLoading(1)}
                >
                  Login
                </Button>
              </Link>
            </div>

            <div className={`app ${darkMode ? "dark" : ""}`}>
              <button className="btn-dark" onClick={toggleDarkMode}>
                {darkMode ? "Light" : "Dark"}
              </button>
            </div>
          </ul>
          <div onClick={navToggle} className={icon}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
