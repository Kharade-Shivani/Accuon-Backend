const express = require("express");
const router = express.Router();

const footerController = require("../controllers/footerController");

// CRUD APIs
router.post("/create__footer__", footerController.createFooter);
router.get("/get__all__footer", footerController.getAllFooter);
router.get("/get__footer__by__id/:id", footerController.getFooterById);
router.put("/update__footer/:id", footerController.updateFooter);
router.delete("/delete__footer/:id", footerController.deleteFooter);

module.exports = router;