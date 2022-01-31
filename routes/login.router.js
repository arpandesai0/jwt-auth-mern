const jwt = require("jsonwebtoken");
const router = require("express").Router();
const AdminSchema = require("../models/Admin.model");
require("dotenv").config();
router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  var admin = await AdminSchema.findOne({ email: email });
  if (admin) {
    admin = JSON.parse(JSON.stringify(admin));
    if (admin.password === password) {
      const token = jwt.sign(
        { email: email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      return res.json({
        status: 1,
        message: "Login successfull",
        access_token: token,
      });
    } else {
      return res.json({ status: 0, message: "Invalid credentials" });
    }
  } else {
    return res.json({ status: 0, message: "Invalid credentials" });
  }
});

module.exports = router;
