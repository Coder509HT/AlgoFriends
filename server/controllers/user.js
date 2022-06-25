const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const addUser = asyncHandler(async (req, res) => {
  const addedUser = await User.create(req.body);
  res.status(201).json(addedUser);
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });

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

  //?
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

module.exports = {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
