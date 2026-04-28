const express = require("express");
const router = express.Router();
const multer = require("multer");

const bannerController = require("../controllers/bannerController");

// Multer Config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CRUD APIs
router.post("/create__banner__", bannerController.createBanner);
router.get("/get__all__banner", bannerController.getAllBanners);
router.get("/get___banner___by___Id/:id", bannerController.getBannerById);
router.put("/update___banner/:id", bannerController.updateBanner);
router.delete("/delete___banner/:id", bannerController.deleteBanner);

// Upload Image
router.post(
    "/upload",
    upload.single("image"),
    bannerController.uploadBannerImage
);

module.exports = router;