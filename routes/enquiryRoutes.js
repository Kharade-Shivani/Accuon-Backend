const express = require("express");
const router = express.Router();

const { submitEnquiry } = require("../controllers/enquiryController");

router.post("/Enquiry", submitEnquiry);

module.exports = router;