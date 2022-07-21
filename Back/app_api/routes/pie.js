var express = require("express");
var router = express.Router();

const pieController = require("../controllers/pie");

router.get("/", pieController.getList);

router.delete("/", pieController.delete);

router.post("/", pieController.add);

router.put("/", pieController.update);

router.get("/:id", pieController.getById);

module.exports = router;
