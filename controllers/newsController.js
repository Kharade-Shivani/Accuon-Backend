const News = require("../models/News");

/* -------------------------------------------------------------------------- */
/* 🟢 Create News */
/* -------------------------------------------------------------------------- */
exports.createNews = async (req, res) => {
    try {
        const { title, description, image, video } = req.body;

        const newNews = await News.create({
            title,
            description,
            image,
            video,
        });

        res.status(201).json({
            message: "News created successfully",
            status: true,
            data: newNews,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error creating news: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get All News */
/* -------------------------------------------------------------------------- */
exports.getAllNews = async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: true,
            count: news.length,
            data: news,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error fetching news: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get News By ID */
/* -------------------------------------------------------------------------- */
exports.getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);

        if (!news) {
            return res.status(404).json({
                message: "News not found",
                status: false,
            });
        }

        res.status(200).json({
            status: true,
            data: news,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error fetching news: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Update News */
/* -------------------------------------------------------------------------- */
exports.updateNews = async (req, res) => {
    try {
        const { title, description, image, video } = req.body;

        const updated = await News.findByIdAndUpdate(
            req.params.id,
            { title, description, image, video },
            { returnDocument: "after" }
        );

        if (!updated) {
            return res.status(404).json({
                message: "News not found",
                status: false,
            });
        }

        res.status(200).json({
            message: "News updated successfully",
            status: true,
            data: updated,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error updating news: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Delete News */
/* -------------------------------------------------------------------------- */
exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);

        if (!news) {
            return res.status(404).json({
                message: "News not found",
                status: false,
            });
        }

        await News.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "News deleted successfully",
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error deleting news: ${error.message}`,
            status: false,
        });
    }
};