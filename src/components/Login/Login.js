import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import "./Login.css";
function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState(false);
  const [error, setError] = useState("");
  const [passworError, setPassworError] = useState(false);
  const [submit, setSubmit] = useState(false);
  const handleSubmit = () => {
    setSubmit(true);
    setError("");
    if (form.email.length === 0) {
      setEmailError(true);
      setSubmit(false);
      return;
    } else {
      setEmailError(false);
    }
    if (form.password.length === 0) {
      setPassworError(true);
      setSubmit(false);
      return;
    } else {
      setPassworError(false);
    }
    //
    axios
      .post("/login", { email: form.email, password: form.password })
      .then((res) => {
        if (res.data.status == 1) {
          localStorage.setItem("intern-token", res.data.access_token);
          window.location.href = "/home";
        } else {
          setError(res.data.message);
          setSubmit(false);
        }
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("intern-token");
    if (token) {
      window.location.href = "/home";
    }
  }, []);
  return (
    <div className="login-container">
      <p className="login-title">Log in</p>
      <div className="login-form">
        <input
          className={`login-input ${emailError && "login-error"}`}
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className={`login-input ${passworError && "login-error"}`}
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="login-button" onClick={handleSubmit}>
          {submit ? <Loader /> : "Login"}
        </button>{" "}
        <p
          className={
            "login-error-message " + (error && "login-error-message-active")
          }
        >
          Invalid credentials
        </p>
      </div>
    </div>
  );
}

export default Login;
