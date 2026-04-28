const express = require("express");
const router = express.Router();
const multer = require("multer");

const controller = require("../controllers/candidateController");

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/create__candidate", upload.single("resume"), controller.createCandidate);
router.get("/get__all__candidate", controller.getAllCandidates);
router.get("/get__candidate__by__id/:id", controller.getCandidateById);
router.get("/download__candidate__resume/:id", controller.downloadCandidateResume);
router.put("/update__candidate/:id", upload.single("resume"), controller.updateCandidate);
router.delete("/delete__candidate/:id", controller.deleteCandidate);

module.exports = router;
