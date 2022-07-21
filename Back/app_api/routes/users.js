var express = require("express");
var router = express.Router();

const usersController = require("../controllers/users");

router.get("/", usersController.getList);

router.post("/signup", usersController.signup);

router.post("/login", usersController.login);

router.put("/", usersController.update);

module.exports = router;
