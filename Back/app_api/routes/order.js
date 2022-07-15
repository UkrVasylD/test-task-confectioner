var express = require("express");
var router = express.Router();

const orderController = require("../controllers/order");

router.get("/", orderController.getList);


router.post("/", orderController.add);

router.get("/:id", orderController.getById);

module.exports = router;
