const express = require("express");
const router = express.Router();

const controller = require("../controllers/jobController");

// CRUD
router.post("/create__job", controller.createJob);
router.get("/get__all__job", controller.getAllJobs);
router.get("/get__job__by__id/:id", controller.getJobById);
router.put("/update__job/:id", controller.updateJob);
router.delete("/delete__job/:id", controller.deleteJob);

module.exports = router;