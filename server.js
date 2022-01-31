const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI, () =>
  console.log("Connected to database")
);
const loginRouter = require("./routes/login.router");
app.use("/login", loginRouter);
const userRouter = require("./routes/users.router");
app.use("/users", userRouter);
