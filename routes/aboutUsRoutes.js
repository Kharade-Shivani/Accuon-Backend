const express = require("express");
const router = express.Router();

const controller = require("../controllers/aboutUsController");

// CRUD APIs
router.post("/create__aboutus", controller.createAboutUs);
router.get("/get__all__aboutus", controller.getAllAboutUs);
router.get("/get__aboutus__by__id/:id", controller.getAboutUsById);
router.put("/update__aboutus/:id", controller.updateAboutUs);
router.delete("/delete__aboutus/:id", controller.deleteAboutUs);

module.exports = router;