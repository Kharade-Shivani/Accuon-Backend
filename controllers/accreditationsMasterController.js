const AccreditationsMaster = require("../models/AccreditationsMaster");

/* -------------------------------------------------------------------------- */
/* 🟢 Create Accreditations Master */
/* -------------------------------------------------------------------------- */
exports.createAccreditationsMaster = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newAccreditation = await AccreditationsMaster.create({
      title,
      description,
    });

    res.status(201).json({
      message: "Accreditations Master created successfully",
      status: true,
      data: newAccreditation,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error creating accreditations master: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get All Accreditations Master */
/* -------------------------------------------------------------------------- */
exports.getAllAccreditationsMaster = async (req, res) => {
  try {
    const accreditations = await AccreditationsMaster.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      status: true,
      count: accreditations.length,
      data: accreditations,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching accreditations master: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get Accreditations Master By ID */
/* -------------------------------------------------------------------------- */
exports.getAccreditationsMasterById = async (req, res) => {
  try {
    const accreditation = await AccreditationsMaster.findById(req.params.id);

    if (!accreditation) {
      return res.status(404).json({
        message: "Accreditations Master not found",
        status: false,
      });
    }

    res.status(200).json({
      status: true,
      data: accreditation,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching accreditations master: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Update Accreditations Master */
/* -------------------------------------------------------------------------- */
exports.updateAccreditationsMaster = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updated = await AccreditationsMaster.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Accreditations Master not found",
        status: false,
      });
    }

    res.status(200).json({
      message: "Accreditations Master updated successfully",
      status: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error updating accreditations master: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Delete Accreditations Master */
/* -------------------------------------------------------------------------- */
exports.deleteAccreditationsMaster = async (req, res) => {
  try {
    const accreditation = await AccreditationsMaster.findById(req.params.id);

    if (!accreditation) {
      return res.status(404).json({
        message: "Accreditations Master not found",
        status: false,
      });
    }

    await AccreditationsMaster.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Accreditations Master deleted successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error deleting accreditations master: ${error.message}`,
      status: false,
    });
  }
};