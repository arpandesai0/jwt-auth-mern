import React, { useState } from "react";
import { Route } from "react-router-dom";
import CreateUser from "../CreateUser/CreateUser";
import FetchUsers from "../FetchUsers/FetchUsers";
import HomeNavbar from "../HomeNavbar/HomeNavbar";
import "./Home.css";
function Home() {
  const [active, setActive] = useState(0);
  const token = localStorage.getItem("intern-token");
  if (token.length > 2) {
    return (
      <div className="home-container">
        <HomeNavbar active={active} setActive={setActive} />
        {active === 0 ? <CreateUser /> : <FetchUsers />}
      </div>
    );
  } else {
    return <p>Invalid token</p>;
  }
}

export default Home;
