const express = require("express");
const router = express.Router();

const controller = require("../controllers/serviceSubCategoryController");

// CRUD
router.post("/create__service__subcategory", controller.createSubCategory);

router.get(
    "/get__all__service__subcategory",
    controller.getAllSubCategories
);

router.get(
    "/get__service__subcategory__by__id/:id",
    controller.getSubCategoryById
);

router.put(
    "/update__service__subcategory/:id",
    controller.updateSubCategory
);

router.delete(
    "/delete__service__subcategory/:id",
    controller.deleteSubCategory
);

module.exports = router;