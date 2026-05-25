const express = require("express");
const router = express.Router();

const accreditationsMasterController = require("../controllers/accreditationsMasterController");

// CRUD APIs

router.post(
  "/create__accreditations__master",
  accreditationsMasterController.createAccreditationsMaster
);

router.get(
  "/get__all__accreditations__master",
  accreditationsMasterController.getAllAccreditationsMaster
);

router.get(
  "/get__accreditations__master__by__id/:id",
  accreditationsMasterController.getAccreditationsMasterById
);

router.put(
  "/update__accreditations__master/:id",
  accreditationsMasterController.updateAccreditationsMaster
);

router.delete(
  "/delete__accreditations__master/:id",
  accreditationsMasterController.deleteAccreditationsMaster
);

module.exports = router;