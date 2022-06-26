const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username field is missing"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email field is missing"]
  },
  password: {
    type: String,
    required: [true, "Password field is missing"]
  }
});

module.exports = mongoose.model("users", schema);
