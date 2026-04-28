const express = require("express");
const router = express.Router();
const controller = require("../controllers/industrialController");

router.post("/create__industrial", controller.create);
router.get("/get__industrial", controller.getAll);
router.put("/update__industrial/:id", controller.update);
router.delete("/delete__industrial/:id", controller.delete);

module.exports = router;