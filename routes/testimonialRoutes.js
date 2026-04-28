const express = require("express");
const router = express.Router();
const multer = require("multer");

const testimonialController = require("../controllers/testimonialController");

// 🔥 Reuse upload from Banner
const { uploadBannerImage } = require("../controllers/bannerController");

// Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CRUD APIs
router.post("/create____testimonial__", testimonialController.createTestimonial);
router.get("/Get__ByAll__testimonial", testimonialController.getAllTestimonials);
router.get("/get___testimonial__by__id/:id", testimonialController.getTestimonialById);
router.put("/update___testimonial/:id", testimonialController.updateTestimonial);
router.delete("/delete___testimonial/:id", testimonialController.deleteTestimonial);

// ✅ Upload reuse
router.post(
    "/upload",
    upload.single("image"),
    uploadBannerImage
);

module.exports = router;