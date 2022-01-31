import React from "react";
import "./UserCard.css";
import img from "../../assets/delete.png";
import axios from "axios";
function UserCard({
  index,
  id,
  username,
  email,
  phone,
  address,
  isCard = true,
  fetchData,
}) {
  const handleClick = () => {
    axios.post("/users/delete", { id }).then((res) => {
      console.log(res.data);
      fetchData();
    });
  };
  return (
    <div className="user-card-container ">
      <p className="user-card-item user-card-index">{index}.</p>
      <p className="user-card-item user-card-ueraname">{username}</p>
      <p className="user-card-item user-card-email">{email}</p>
      <p className="user-card-item user-card-phome">{phone}</p>
      <p className="user-card-item user-card-address">{address}</p>
      {isCard ? (
        <img
          className="user-card-delete"
          src={img}
          alt=""
          onClick={handleClick}
        />
      ) : (
        <p className="user-card-item user-card-header">Delete</p>
      )}
    </div>
  );
}

export default UserCard;
