const AboutUs = require("../models/AboutUs");

/* -------------------------------------------------------------------------- */
/* 🟢 CREATE */
/* -------------------------------------------------------------------------- */
exports.createAboutUs = async (req, res) => {
    try {
        const { image, title, description } = req.body;

        const data = await AboutUs.create({
            image,
            title,
            description,
        });

        res.status(201).json({
            message: "About Us created successfully",
            status: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 GET ALL */
/* -------------------------------------------------------------------------- */
exports.getAllAboutUs = async (req, res) => {
    try {
        const data = await AboutUs.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: true,
            count: data.length,
            data,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 GET BY ID */
/* -------------------------------------------------------------------------- */
exports.getAboutUsById = async (req, res) => {
    try {
        const data = await AboutUs.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "About Us not found",
                status: false,
            });
        }

        res.status(200).json({
            status: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 UPDATE */
/* -------------------------------------------------------------------------- */
exports.updateAboutUs = async (req, res) => {
    try {
        const { image, title, description } = req.body;

        const updated = await AboutUs.findByIdAndUpdate(
            req.params.id,
            { image, title, description },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                message: "About Us not found",
                status: false,
            });
        }

        res.status(200).json({
            message: "About Us updated successfully",
            status: true,
            data: updated,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 DELETE */
/* -------------------------------------------------------------------------- */
exports.deleteAboutUs = async (req, res) => {
    try {
        const data = await AboutUs.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "About Us not found",
                status: false,
            });
        }

        await AboutUs.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "About Us deleted successfully",
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};