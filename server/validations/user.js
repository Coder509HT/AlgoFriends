const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const createUserValidation = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    res.status(400);
    throw new Error("Username is already exists");
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error("Username is already exists");
  }

  next();
});

module.exports = {
  createUserValidation
};
