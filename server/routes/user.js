const express = require("express");
const {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  authUser
} = require("../controllers/user");
const { createUserValidation } = require("../validations/user");

const router = express.Router();

router.route("/").post(createUserValidation, addUser).get(getUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/login").post(authUser);

module.exports = router;
