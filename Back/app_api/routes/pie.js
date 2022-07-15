var express = require("express");
var router = express.Router();

const pieController = require("../controllers/pie");

/* GET список книг. */
router.get("/", pieController.getList);

/* GET видалення книги за id. */
router.delete("/", pieController.delete);

/* POST Створення нової книги. */
router.post("/", pieController.add);

// Оновлення інформації про книгу після редагування
router.put("/", pieController.update);

/* Відображення інформації про одну книгу */
router.get("/:id", pieController.getById);

module.exports = router;
