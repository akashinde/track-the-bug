import logo from "../../logo/Logo.png";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [navState, setNavState] = useState("");

  let navClass = "navbar-item navbar-item-active";

  const handleClick = () => {
    localStorage.setItem("user", "");
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <div className="logo-container">
        <img src={logo} alt="Logo"></img>
      </div>
      <ul className="navbar">
        <Link
          className={navState === "dashboard" ? navClass : "navbar-item"}
          to="/dashboard"
          onClick={() => setNavState("dashboard")}
        >
          <li>Dashboard</li>
        </Link>
        <Link
          className={navState === "tickets" ? navClass : "navbar-item"}
          to="/tickets"
          onClick={() => setNavState("tickets")}
        >
          <li>Tickets</li>
        </Link>
        <Link
          className={navState === "some-random-page" ? navClass : "navbar-item"}
          to="/some-random-page"
          onClick={() => setNavState("some-random-page")}
        >
          <li>Some random page</li>
        </Link>
      </ul>
      <div className="container center-container">
        <button className="button font-medium" onClick={handleClick}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
