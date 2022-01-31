const UserDetails = require("../models/Users.model");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
require("dotenv").config();
router.get("/", async (req, res) => {
  const auth_headers = req.headers["authorization"];
  console.log(auth_headers.split(" ")[1]);
  const token = auth_headers && auth_headers.split(" ")[1];
  if (token === null) {
    res.json({ status: 0, message: "Invalid Token", data: [] });
    console.log("first");
    return;
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        res.json({ status: 0, message: "Invalid Token", data: [] });
      } else {
        const data = await UserDetails.find();
        res.json({
          status: 1,
          message: "Found users successfully",
          data: data,
        });
      }
    });
  }
});
router.post("/", async (req, res) => {
  const auth_headers = req.headers["authorization"];
  const token = auth_headers && auth_headers.split(" ")[1];
  if (token === null) {
    res.json({ status: 0, message: "Invalid Token", data: [] });
    return;
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        res.json({ status: 0, message: "Invalid Token", data: [] });
      } else {
        const username = req.body.username;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        var isUnique = await UserDetails.exists({
          username: username,
        });
        if (isUnique) {
          return res.json({ status: 0, message: "Enter unique username" });
        }
        isUnique = await UserDetails.exists({
          email: email,
        });
        if (isUnique) {
          return res.json({ status: 0, message: "Enter unique email" });
        }
        isUnique = await UserDetails.exists({
          phone: phone,
        });
        if (isUnique) {
          return res.json({ status: 0, message: "Enter unique phone number" });
        }
        try {
          const data = await UserDetails.create({
            username: username,
            phone: phone,
            email: email,
            address: address,
          });
          res.json({
            status: 1,
            message: "New user created successfully",
            data: data,
          });
        } catch {
          res.json({ status: 0, message: "Invalid details", data: data });
        }
      }
    });
  }
});
router.post("/delete", async (req, res) => {
  const auth_headers = req.headers["authorization"];
  const token = auth_headers && auth_headers.split(" ")[1];
  if (token === null) {
    res.json({ status: 0, message: "Invalid Token", data: [] });
    return;
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        res.json({ status: 0, message: "Invalid Token", data: [] });
      } else {
        const id = req.body.id;
        try {
          const data = await UserDetails.deleteOne({ _id: id });
          res.json({
            status: 1,
            message: "Deleted user successfully",
          });
        } catch {
          res.json({ status: 0, message: "Invalid details" });
        }
      }
    });
  }
});
module.exports = router;
