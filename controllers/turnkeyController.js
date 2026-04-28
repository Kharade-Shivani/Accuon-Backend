const Turnkey = require("../models/Turnkey");

// CREATE
exports.create = async (req, res) => {
    try {
        const data = await Turnkey.create(req.body);

        res.status(201).json({
            message: "Created successfully",
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
        const data = await Turnkey.find().sort({ createdAt: -1 });

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
        const updated = await Turnkey.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );

        res.status(200).json({
            message: "Updated",
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
        await Turnkey.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Deleted",
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};