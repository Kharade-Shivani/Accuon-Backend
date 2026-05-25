const express = require("express");
const router = express.Router();

const whyChooseUsMasterController = require("../controllers/whyChooseUsMasterController");

// CRUD APIs

router.post(
  "/create__why__choose__us__master",
  whyChooseUsMasterController.createWhyChooseUsMaster
);

router.get(
  "/get__all__why__choose__us__master",
  whyChooseUsMasterController.getAllWhyChooseUsMaster
);

router.get(
  "/get__why__choose__us__master__by__id/:id",
  whyChooseUsMasterController.getWhyChooseUsMasterById
);

router.put(
  "/update__why__choose__us__master/:id",
  whyChooseUsMasterController.updateWhyChooseUsMaster
);

router.delete(
  "/delete__why__choose__us__master/:id",
  whyChooseUsMasterController.deleteWhyChooseUsMaster
);

module.exports = router;