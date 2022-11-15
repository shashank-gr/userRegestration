const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.get("/", userController.getAllUsers);
router.post("/add-user", userController.addUserToDb);
router.delete("/delete-user/:userId", userController.deleteUser);

module.exports = router;
