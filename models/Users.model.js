const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    collection: "user",
  }
);
module.exports = mongoose.model("UserSchema", UserSchema);
