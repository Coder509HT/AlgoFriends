const asyncHandler = require("express-async-handler");
const { hashPassword } = require("../helpers/helper");
const User = require("../models/user");

const addUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    username,
    email,
    password: hashedPassword
  });

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id }).select("-password");

  if (!user) {
    res.status(404);
    throw new Error(`User with id:${id} not found`);
  }

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });

  if (!user) {
    res.status(404);
    throw new Error(`User with id:${id} not found`);
  }

  const updatedUser = await User.findByIdAndUpdate(
    { _id: id },
    { $set: req.body }
  );

  res.status(201).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });

  if (!user) {
    res.status(404);
    throw new Error(`User with id:${id} not found`);
  }

  const deletedUser = await User.findByIdAndDelete({ _id: id });

  res.status(202).json({ id: deletedUser._id });
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

module.exports = {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  authUser
};
