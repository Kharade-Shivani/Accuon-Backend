const Certification = require("../models/Certification");

/* -------------------------------------------------------------------------- */
/* 🟢 Create Certification */
/* -------------------------------------------------------------------------- */
exports.createCertification = async (req, res) => {
    try {
        const { image, title, description } = req.body;

        const newCertification = await Certification.create({
            image,
            title,
            description,
        });

        res.status(201).json({
            message: "Certification created successfully",
            status: true,
            data: newCertification,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error creating certification: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get All Certifications */
/* -------------------------------------------------------------------------- */
exports.getAllCertification = async (req, res) => {
    try {
        const certification = await Certification.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: true,
            count: certification.length,
            data: certification,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error fetching certification: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get Certification By ID */
/* -------------------------------------------------------------------------- */
exports.getCertificationById = async (req, res) => {
    try {
        const certification = await Certification.findById(req.params.id);

        if (!certification) {
            return res.status(404).json({
                message: "Certification not found",
                status: false,
            });
        }

        res.status(200).json({
            status: true,
            data: certification,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error fetching certification: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Update Certification */
/* -------------------------------------------------------------------------- */
exports.updateCertification = async (req, res) => {
    try {
        const { image, title, description } = req.body;

        const updated = await Certification.findByIdAndUpdate(
            req.params.id,
            { image, title, description },
            { returnDocument: "after" }
        );

        if (!updated) {
            return res.status(404).json({
                message: "Certification not found",
                status: false,
            });
        }

        res.status(200).json({
            message: "Certification updated successfully",
            status: true,
            data: updated,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error updating certification: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Delete Certification */
/* -------------------------------------------------------------------------- */
exports.deleteCertification = async (req, res) => {
    try {
        const certification = await Certification.findById(req.params.id);

        if (!certification) {
            return res.status(404).json({
                message: "Certification not found",
                status: false,
            });
        }

        await Certification.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Certification deleted successfully",
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error deleting certification: ${error.message}`,
            status: false,
        });
    }
};