const Job = require("../models/Job");

/* -------------------- CREATE -------------------- */
exports.createJob = async (req, res) => {
    try {
        const { jobTitle, department, experience, salary, status } = req.body;

        const job = await Job.create({
            jobTitle,
            department,
            experience,
            salary,
            status: status || "active",
        });

        res.status(201).json({
            message: "Job created successfully",
            status: true,
            data: job,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};

/* -------------------- GET ALL -------------------- */
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: true,
            count: jobs.length,
            data: jobs,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};

/* -------------------- GET BY ID -------------------- */
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                status: false,
            });
        }

        res.status(200).json({
            status: true,
            data: job,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};

/* -------------------- UPDATE -------------------- */
exports.updateJob = async (req, res) => {
    try {
        const updated = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );

        if (!updated) {
            return res.status(404).json({
                message: "Job not found",
                status: false,
            });
        }

        res.status(200).json({
            message: "Job updated successfully",
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

/* -------------------- DELETE -------------------- */
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                status: false,
            });
        }

        await Job.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Job deleted successfully",
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};