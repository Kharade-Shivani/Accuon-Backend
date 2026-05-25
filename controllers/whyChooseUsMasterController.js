const WhyChooseUsMaster = require("../models/WhyChooseUsMaster");

/* -------------------------------------------------------------------------- */
/* 🟢 Create Why Choose Us Master */
/* -------------------------------------------------------------------------- */
exports.createWhyChooseUsMaster = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newWhyChooseUs = await WhyChooseUsMaster.create({
      title,
      description,
    });

    res.status(201).json({
      message: "Why Choose Us Master created successfully",
      status: true,
      data: newWhyChooseUs,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error creating why choose us master: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get All Why Choose Us Master */
/* -------------------------------------------------------------------------- */
exports.getAllWhyChooseUsMaster = async (req, res) => {
  try {
    const whyChooseUs = await WhyChooseUsMaster.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      status: true,
      count: whyChooseUs.length,
      data: whyChooseUs,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching why choose us master: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get Why Choose Us Master By ID */
/* -------------------------------------------------------------------------- */
exports.getWhyChooseUsMasterById = async (req, res) => {
  try {
    const whyChooseUs = await WhyChooseUsMaster.findById(req.params.id);

    if (!whyChooseUs) {
      return res.status(404).json({
        message: "Why Choose Us Master not found",
        status: false,
      });
    }

    res.status(200).json({
      status: true,
      data: whyChooseUs,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching why choose us master: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Update Why Choose Us Master */
/* -------------------------------------------------------------------------- */
exports.updateWhyChooseUsMaster = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updated = await WhyChooseUsMaster.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Why Choose Us Master not found",
        status: false,
      });
    }

    res.status(200).json({
      message: "Why Choose Us Master updated successfully",
      status: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error updating why choose us master: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Delete Why Choose Us Master */
/* -------------------------------------------------------------------------- */
exports.deleteWhyChooseUsMaster = async (req, res) => {
  try {
    const whyChooseUs = await WhyChooseUsMaster.findById(req.params.id);

    if (!whyChooseUs) {
      return res.status(404).json({
        message: "Why Choose Us Master not found",
        status: false,
      });
    }

    await WhyChooseUsMaster.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Why Choose Us Master deleted successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error deleting why choose us master: ${error.message}`,
      status: false,
    });
  }
};