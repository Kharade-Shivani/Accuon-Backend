const ServiceSubCategory = require("../models/ServiceSubCategory");

/* -------------------- CREATE -------------------- */
exports.createSubCategory = async (req, res) => {
    try {
        const { categoryId, title, description, image, status } = req.body;

        if (!categoryId || !title || !description) {
            return res.status(400).json({
                message: "Required fields missing",
                status: false,
            });
        }

        const data = await ServiceSubCategory.create({
            categoryId,
            title,
            description,
            image,
            status: status || "active",
        });

        res.status(201).json({
            message: "Sub Category created successfully",
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

/* -------------------- GET ALL -------------------- */
exports.getAllSubCategories = async (req, res) => {
    try {
        const data = await ServiceSubCategory.find()
            .populate("categoryId", "name") // 🔥 show category name
            .sort({ createdAt: -1 });

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
exports.getSubCategoryById = async (req, res) => {
    try {
        const data = await ServiceSubCategory.findById(req.params.id)
            .populate("categoryId", "name");

        if (!data) {
            return res.status(404).json({
                message: "Sub Category not found",
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
exports.updateSubCategory = async (req, res) => {
    try {
        const updated = await ServiceSubCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );

        if (!updated) {
            return res.status(404).json({
                message: "Sub Category not found",
                status: false,
            });
        }

        res.status(200).json({
            message: "Sub Category updated successfully",
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
exports.deleteSubCategory = async (req, res) => {
    try {
        const data = await ServiceSubCategory.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "Sub Category not found",
                status: false,
            });
        }

        await ServiceSubCategory.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Sub Category deleted successfully",
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};