const express = require("express");
const router = express.Router();

const controller = require("../controllers/serviceCategoryController");

// CRUD
router.post("/create__service__category", controller.createCategory);
router.get("/get__all__service__category", controller.getAllCategories);
router.get("/get__service__category__by__id/:id", controller.getCategoryById);
router.put("/update__service__category/:id", controller.updateCategory);
router.delete("/delete__service__category/:id", controller.deleteCategory);

module.exports = router;