const express = require("express");
const router = express.Router();
const multer = require("multer");

const imageMasterController = require("../controllers/imageMasterController");

// IMPORT upload function from Banner Controller
const {
  uploadBannerImage,
} = require("../controllers/bannerController");

// Multer Config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CRUD APIs

router.post(
  "/create__image__master",
  imageMasterController.createImageMaster
);

router.get(
  "/get__all__image__master",
  imageMasterController.getAllImageMaster
);

router.get(
  "/get__image__master__by__id/:id",
  imageMasterController.getImageMasterById
);

router.put(
  "/update__image__master/:id",
  imageMasterController.updateImageMaster
);

router.delete(
  "/delete__image__master/:id",
  imageMasterController.deleteImageMaster
);

// Reuse Banner Upload API

router.post(
  "/upload",
  upload.single("image"),
  uploadBannerImage
);

module.exports = router;