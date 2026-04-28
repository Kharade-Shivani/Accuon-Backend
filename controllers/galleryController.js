const Gallery = require("../models/Gallery");

/* -------------------------------------------------------------------------- */
/* 🟢 Create Gallery */
/* -------------------------------------------------------------------------- */
exports.createGallery = async (req, res) => {
  try {
    const { image, title, description } = req.body;

    const newGallery = await Gallery.create({
      image,
      title,
      description,
    });

    res.status(201).json({
      message: "Gallery created successfully",
      status: true,
      data: newGallery,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error creating gallery: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get All Gallery */
/* -------------------------------------------------------------------------- */
exports.getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: gallery.length,
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching gallery: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get Gallery By ID */
/* -------------------------------------------------------------------------- */
exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        message: "Gallery not found",
        status: false,
      });
    }

    res.status(200).json({
      status: true,
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching gallery: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Update Gallery */
/* -------------------------------------------------------------------------- */
exports.updateGallery = async (req, res) => {
  try {
    const { image, title, description } = req.body;

    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      { image, title, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Gallery not found",
        status: false,
      });
    }

    res.status(200).json({
      message: "Gallery updated successfully",
      status: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error updating gallery: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Delete Gallery */
/* -------------------------------------------------------------------------- */
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        message: "Gallery not found",
        status: false,
      });
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Gallery deleted successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error deleting gallery: ${error.message}`,
      status: false,
    });
  }
};