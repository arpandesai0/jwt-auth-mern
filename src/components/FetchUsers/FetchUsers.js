import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader2 from "../Loader2/Loader2";
import UserCard from "../UserCard/UserCard";
import "./FetchUsers.css";
function FetchUsers() {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const fetchData = () => {
    axios.get("/users").then((res) => {
      if (res.data.status == 1) {
        setData(res.data.data);
        setLoader(false);
      } else {
        alert("Token expired or invalid");
        localStorage.removeItem("intern-token");
        window.location.href = "/";
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="fetch-users-container">
      {loader ? (
        <Loader2 />
      ) : (
        <>
          {data
            .slice(0)
            .reverse()
            .map((item, index) => (
              <UserCard
                key={index}
                index={index + 1}
                username={item.username}
                email={item.email}
                phone={item.phone}
                address={item.address}
                id={item._id}
                fetchData={fetchData}
              />
            ))}
        </>
      )}
    </div>
  );
}

export default FetchUsers;
