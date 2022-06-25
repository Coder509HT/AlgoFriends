const express = require("express");
const {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/user");

const validateUser = require("../validations/user");

const router = express.Router();

router.post("/", validateUser, addUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", validateUser, updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
