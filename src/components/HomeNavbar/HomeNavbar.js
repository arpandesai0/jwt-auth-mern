import React from "react";
import { Link } from "react-router-dom";
import "./HomeNavbar.css";
function HomeNavbar({ active, setActive }) {
  return (
    <div className="home-navbar-container">
      <p
        className={`home-navbar-item ${active === 0 && "home-navbar-active"}`}
        onClick={() => setActive(0)}
      >
        Create User
      </p>
      <p
        className={`home-navbar-item ${active === 1 && "home-navbar-active"}`}
        onClick={() => setActive(1)}
      >
        Fetch Users
      </p>
      <Link
        to="/"
        className="home-navbar-item"
        onClick={() => {
          localStorage.removeItem("intern-token");
        }}
      >
        <p>Logout</p>
      </Link>
    </div>
  );
}

export default HomeNavbar;
