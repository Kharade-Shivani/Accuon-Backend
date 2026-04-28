const Footer = require("../models/Footer");

/* -------------------------------------------------------------------------- */
/* 🟢 Create Footer */
/* -------------------------------------------------------------------------- */
exports.createFooter = async (req, res) => {
    try {
        const { phone, email, address } = req.body;

        const newFooter = await Footer.create({
            phone,
            email,
            address,
        });

        res.status(201).json({
            message: "Footer created successfully",
            status: true,
            data: newFooter,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error creating footer: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get All Footers */
/* -------------------------------------------------------------------------- */
exports.getAllFooter = async (req, res) => {
    try {
        const footer = await Footer.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: true,
            count: footer.length,
            data: footer,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error fetching footer: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get Footer By ID */
/* -------------------------------------------------------------------------- */
exports.getFooterById = async (req, res) => {
    try {
        const footer = await Footer.findById(req.params.id);

        if (!footer) {
            return res.status(404).json({
                message: "Footer not found",
                status: false,
            });
        }

        res.status(200).json({
            status: true,
            data: footer,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error fetching footer: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Update Footer */
/* -------------------------------------------------------------------------- */
exports.updateFooter = async (req, res) => {
    try {
        const { phone, email, address } = req.body;

        const updated = await Footer.findByIdAndUpdate(
            req.params.id,
            { phone, email, address },
            { returnDocument: "after" }
        );

        if (!updated) {
            return res.status(404).json({
                message: "Footer not found",
                status: false,
            });
        }

        res.status(200).json({
            message: "Footer updated successfully",
            status: true,
            data: updated,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error updating footer: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Delete Footer */
/* -------------------------------------------------------------------------- */
exports.deleteFooter = async (req, res) => {
    try {
        const footer = await Footer.findById(req.params.id);

        if (!footer) {
            return res.status(404).json({
                message: "Footer not found",
                status: false,
            });
        }

        await Footer.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Footer deleted successfully",
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error deleting footer: ${error.message}`,
            status: false,
        });
    }
};