const ImageMaster = require("../models/ImageMaster");

/* -------------------------------------------------------------------------- */
/* 🟢 Create Image Master */
/* -------------------------------------------------------------------------- */
exports.createImageMaster = async (req, res) => {
  try {
    const { image, imageTitle } = req.body;

    const newImageMaster = await ImageMaster.create({
      image,
      imageTitle,
    });

    res.status(201).json({
      message: "Image Master created successfully",
      status: true,
      data: newImageMaster,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error creating image master: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get All Image Master */
/* -------------------------------------------------------------------------- */
exports.getAllImageMaster = async (req, res) => {
  try {
    const imageMaster = await ImageMaster.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      status: true,
      count: imageMaster.length,
      data: imageMaster,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching image master: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get Image Master By ID */
/* -------------------------------------------------------------------------- */
exports.getImageMasterById = async (req, res) => {
  try {
    const imageMaster = await ImageMaster.findById(req.params.id);

    if (!imageMaster) {
      return res.status(404).json({
        message: "Image Master not found",
        status: false,
      });
    }

    res.status(200).json({
      status: true,
      data: imageMaster,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching image master: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Update Image Master */
/* -------------------------------------------------------------------------- */
exports.updateImageMaster = async (req, res) => {
  try {
    const { image, imageTitle } = req.body;

    const updated = await ImageMaster.findByIdAndUpdate(
      req.params.id,
      { image, imageTitle },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Image Master not found",
        status: false,
      });
    }

    res.status(200).json({
      message: "Image Master updated successfully",
      status: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error updating image master: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Delete Image Master */
/* -------------------------------------------------------------------------- */
exports.deleteImageMaster = async (req, res) => {
  try {
    const imageMaster = await ImageMaster.findById(req.params.id);

    if (!imageMaster) {
      return res.status(404).json({
        message: "Image Master not found",
        status: false,
      });
    }

    await ImageMaster.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Image Master deleted successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error deleting image master: ${error.message}`,
      status: false,
    });
  }
};