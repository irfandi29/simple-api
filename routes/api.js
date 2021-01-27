const express = require("express");
const router = express.Router();
const Users = require("../models/Users");

router.get("/users", Users.getAllUser);
router.get("/users/:userid", Users.getOneUser);
router.post("/users", Users.createUser);
router.put("/users/:userid", Users.updateUser);
router.delete("/users/:userid", Users.deleteUser);

module.exports = router;
