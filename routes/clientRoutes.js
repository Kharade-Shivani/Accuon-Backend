const express = require("express");
const router = express.Router();
const multer = require("multer");

const clientController = require("../controllers/clientController");

// 🔥 Reuse upload from Banner
const { uploadBannerImage } = require("../controllers/bannerController");

// Multer Config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CRUD APIs
router.post("/create__client__", clientController.createClient);
router.get("/get__all__client", clientController.getAllClients);
router.get("/get__client__by__id/:id", clientController.getClientById);
router.put("/update__client/:id", clientController.updateClient);
router.delete("/delete__client/:id", clientController.deleteClient);

// ✅ Upload (reused)
router.post(
    "/upload",
    upload.single("image"),
    uploadBannerImage
);

module.exports = router;