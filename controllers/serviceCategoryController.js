const ServiceCategory = require("../models/ServiceCategory");

/* -------------------- CREATE -------------------- */
exports.createCategory = async (req, res) => {
    try {
        const { name, status } = req.body;

        const category = await ServiceCategory.create({
            name,
            status: status || "active",
        });

        res.status(201).json({
            message: "Category created successfully",
            status: true,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};

/* -------------------- GET ALL -------------------- */
exports.getAllCategories = async (req, res) => {
    try {
        const data = await ServiceCategory.find().sort({ createdAt: -1 });

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

/* -------------------- GET BY ID -------------------- */
exports.getCategoryById = async (req, res) => {
    try {
        const data = await ServiceCategory.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "Category not found",
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

/* -------------------- UPDATE -------------------- */
exports.updateCategory = async (req, res) => {
    try {
        const { name, status } = req.body;

        const updated = await ServiceCategory.findByIdAndUpdate(
            req.params.id,
            { name, status },
            { returnDocument: "after" }
        );

        if (!updated) {
            return res.status(404).json({
                message: "Category not found",
                status: false,
            });
        }

        res.status(200).json({
            message: "Category updated successfully",
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
exports.deleteCategory = async (req, res) => {
    try {
        const data = await ServiceCategory.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "Category not found",
                status: false,
            });
        }

        await ServiceCategory.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Category deleted successfully",
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};