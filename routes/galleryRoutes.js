const express = require("express");
const router = express.Router();
const multer = require("multer");

const galleryController = require("../controllers/galleryController");

// 🔥 IMPORT upload function from Banner Controller
const { uploadBannerImage } = require("../controllers/bannerController");

// Multer Config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CRUD APIs
router.post("/create__gallery__", galleryController.createGallery);
router.get("/get__all__gallery", galleryController.getAllGallery);
router.get("/get__gallery__by__id/:id", galleryController.getGalleryById);
router.put("/update__gallery/:id", galleryController.updateGallery);
router.delete("/delete__gallery/:id", galleryController.deleteGallery);

// ✅ Reuse same upload API
router.post(
    "/upload",
    upload.single("image"),
    uploadBannerImage
);

module.exports = router;