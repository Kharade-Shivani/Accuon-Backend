const express = require("express");
const router = express.Router();

const statMasterController = require("../controllers/statMasterController");

// CRUD APIs

router.post(
  "/create__stat__master",
  statMasterController.createStatMaster
);

router.get(
  "/get__all__stat__master",
  statMasterController.getAllStatMaster
);

router.get(
  "/get__stat__master__by__id/:id",
  statMasterController.getStatMasterById
);

router.put(
  "/update__stat__master/:id",
  statMasterController.updateStatMaster
);

router.delete(
  "/delete__stat__master/:id",
  statMasterController.deleteStatMaster
);

module.exports = router;