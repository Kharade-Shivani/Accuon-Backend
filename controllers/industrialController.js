const Industrial = require("../models/IndustrialAutomation");

// CREATE
exports.create = async (req, res) => {
    try {
        const data = await Industrial.create(req.body);

        res.status(201).json({
            message: "Industrial Automation created",
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

// GET ALL
exports.getAll = async (req, res) => {
    try {
        const data = await Industrial.find().sort({ createdAt: -1 });

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

// UPDATE
exports.update = async (req, res) => {
    try {
        const updated = await Industrial.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );

        res.status(200).json({
            message: "Industrial updated",
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

// DELETE
exports.delete = async (req, res) => {
    try {
        await Industrial.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Industrial deleted",
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};