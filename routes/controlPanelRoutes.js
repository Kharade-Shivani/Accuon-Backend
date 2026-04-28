const express = require("express");
const router = express.Router();
const controller = require("../controllers/controlPanelController");

router.post("/create__control_panel", controller.create);
router.get("/get__control_panel", controller.getAll);
router.put("/update__control_panel/:id", controller.update);
router.delete("/delete__control_panel/:id", controller.delete);

module.exports = router;