const ControlPanel = require("../models/ControlPanel");

// CREATE
exports.create = async (req, res) => {
    try {
        const data = await ControlPanel.create(req.body);

        res.status(201).json({
            message: "Control Panel created",
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
        const data = await ControlPanel.find().sort({ createdAt: -1 });

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
        const updated = await ControlPanel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );

        res.status(200).json({
            message: "Control Panel updated",
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
        await ControlPanel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Control Panel deleted",
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};