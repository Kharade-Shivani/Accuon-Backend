const express = require("express");
const router = express.Router();
const multer = require("multer");

const newsController = require("../controllers/newsController");
const { uploadMedia } = require("../controllers/bannerController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// CRUD
router.post("/create__news__", newsController.createNews);
router.get("/get__all__news", newsController.getAllNews);
router.get("/get__news__by__id/:id", newsController.getNewsById);
router.put("/update__news/:id", newsController.updateNews);
router.delete("/delete__news/:id", newsController.deleteNews);

// ✅ THIS MUST BE ANY()
router.post(
    "/upload",
    upload.any(),   // 🔥 IMPORTANT
    uploadMedia
);

module.exports = router;