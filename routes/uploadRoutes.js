const express = require("express");
const router = express.Router();
const multer = require("multer");

const { uploadResume } = require("../controllers/uploadController");

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/upload-resume", upload.single("resume"), uploadResume);

module.exports = router;