const express = require("express");
const router = express.Router();
const multer = require("multer");

const certificationController = require("../controllers/certificationController");

// 🔥 Reuse upload from Banner
const { uploadBannerImage } = require("../controllers/bannerController");

// Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CRUD APIs
router.post("/create__certification__", certificationController.createCertification);
router.get("/get__all__certification", certificationController.getAllCertification);
router.get("/get__certification__by__id/:id", certificationController.getCertificationById);
router.put("/update__certification/:id", certificationController.updateCertification);
router.delete("/delete__certification/:id", certificationController.deleteCertification);

// ✅ Upload reuse
router.post(
    "/upload",
    upload.single("image"),
    uploadBannerImage
);

module.exports = router;