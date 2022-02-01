import axios from "axios";
import React, { useState } from "react";
import Alert from "../Alert/Alert";
import Loader from "../Loader/Loader";
import "./CreateUser.css";
function CreateUser() {
  const [created, setCreated] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "Enter all details properly"
  );
  const [submitError, setSubmitError] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState({
    username: false,
    phone: false,
    email: false,
    address: false,
  });
  const handleSubmit = () => {
    if (username.length === 0) {
      setError({ ...error, username: true });
      setSubmitError(true);
    } else if (phone.length !== 10) {
      setError({ ...error, phone: true });
      setSubmitError(true);
    } else if (email.length <= 5) {
      setError({ ...error, email: true });
      setSubmitError(true);
    } else if (address.length === 0) {
      setError({ ...error, address: true });
      setSubmitError(true);
    } else {
      //perform api request
      setSubmit(true);
      axios
        .post("/users", {
          username,
          email,
          phone,
          address,
        })
        .then((res) => {
          if (res.data.status == 1) {
            setSubmit(false);
            setError({
              username: false,
              phone: false,
              email: false,
              address: false,
            });
            setErrorMessage("");
            setAddress("");
            setUsername("");
            setEmail("");
            setPhone("");
            setCreated(true);
            setTimeout(() => {
              setCreated(false);
            }, 3000);
          } else {
            setErrorMessage(res.data.message + ". Login again");
            setSubmitError(true);
            setSubmit(false);
          }
        });
    }
  };
  const handleUsernameChange = (e) => {
    if (!/^[a-zA-Z0-9]+$/.test(e.target.value) && e.target.value.length >= 1) {
      setError({ ...error, username: true });
    } else {
      setError({ ...error, username: false });
      setUsername(e.target.value);
    }
  };
  const handlePhoneChange = (e) => {
    if (!/^[0-9]+$/.test(e.target.value) && e.target.value.length >= 1) {
      setError({ ...error, phone: true });
    } else {
      setError({ ...error, phone: false });
      if (e.target.value.length <= 10) {
        setPhone(e.target.value);
      }
    }
  };
  const handleEmailChange = (e) => {
    if (
      !/^[a-zA-Z0-9@.]+$/.test(e.target.value) &&
      e.target.value.length >= 1
    ) {
      setError({ ...error, email: true });
    } else {
      setError({ ...error, email: false });
      setEmail(e.target.value);
    }
  };
  return (
    <div className="create-user-container">
      {created && (
        <div className="create-user-alert">
          <Alert />
        </div>
      )}
      <p className="create-user-title">Add new user details</p>
      <div className="create-user-form">
        <input
          className={`create-user-input ${
            error.username && "create-user-error"
          }`}
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />

        <input
          type="tel"
          className={`create-user-input ${error.phone && "create-user-error"}`}
          placeholder="Mobile number"
          value={phone}
          onChange={handlePhoneChange}
        />
        <input
          type="email"
          className={`create-user-input ${error.email && "create-user-error"}`}
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <textarea
          className="create-user-input create-user-textarea "
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <p
          className={`create-user-error-message ${
            submitError && "create-user-error-message-active"
          }`}
        >
          {errorMessage}
        </p>
        <button className="create-user-button" onClick={handleSubmit}>
          {submit ? <Loader /> : "Create"}
        </button>
      </div>
    </div>
  );
}

export default CreateUser;
