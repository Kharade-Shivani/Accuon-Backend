const express = require("express");
const router = express.Router();
const controller = require("../controllers/engineeringController");

router.post("/create__engineering", controller.create);
router.get("/get__engineering", controller.getAll);
router.put("/update__engineering/:id", controller.update);
router.delete("/delete__engineering/:id", controller.delete);

module.exports = router;