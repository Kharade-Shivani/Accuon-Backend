const StatMaster = require("../models/StatMaster");

/* -------------------------------------------------------------------------- */
/* 🟢 Create Stat Master */
/* -------------------------------------------------------------------------- */
exports.createStatMaster = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newStat = await StatMaster.create({
      title,
      description,
    });

    res.status(201).json({
      message: "Stat Master created successfully",
      status: true,
      data: newStat,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error creating stat master: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get All Stat Master */
/* -------------------------------------------------------------------------- */
exports.getAllStatMaster = async (req, res) => {
  try {
    const statMaster = await StatMaster.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      status: true,
      count: statMaster.length,
      data: statMaster,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching stat master: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get Stat Master By ID */
/* -------------------------------------------------------------------------- */
exports.getStatMasterById = async (req, res) => {
  try {
    const statMaster = await StatMaster.findById(req.params.id);

    if (!statMaster) {
      return res.status(404).json({
        message: "Stat Master not found",
        status: false,
      });
    }

    res.status(200).json({
      status: true,
      data: statMaster,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching stat master: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Update Stat Master */
/* -------------------------------------------------------------------------- */
exports.updateStatMaster = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updated = await StatMaster.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Stat Master not found",
        status: false,
      });
    }

    res.status(200).json({
      message: "Stat Master updated successfully",
      status: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error updating stat master: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Delete Stat Master */
/* -------------------------------------------------------------------------- */
exports.deleteStatMaster = async (req, res) => {
  try {
    const statMaster = await StatMaster.findById(req.params.id);

    if (!statMaster) {
      return res.status(404).json({
        message: "Stat Master not found",
        status: false,
      });
    }

    await StatMaster.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Stat Master deleted successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error deleting stat master: ${error.message}`,
      status: false,
    });
  }
};