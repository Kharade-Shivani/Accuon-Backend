const express = require("express");
const router = express.Router();
const controller = require("../controllers/turnkeyController");

router.post("/create__turnkey", controller.create);
router.get("/get__turnkey", controller.getAll);
router.put("/update__turnkey/:id", controller.update);
router.delete("/delete__turnkey/:id", controller.delete);

module.exports = router;