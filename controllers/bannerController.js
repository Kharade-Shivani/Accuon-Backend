const Banner = require("../models/Banner");
const cloudinary = require("../config/cloudinaryConfig");

/* -------------------------------------------------------------------------- */
/* 🟢 Create Banner */
/* -------------------------------------------------------------------------- */
exports.createBanner = async (req, res) => {
    try {
        const { image, status } = req.body;

        const newBanner = await Banner.create({
            image: image || undefined,
            status: status || "active",
        });

        res.status(201).json({
            message: "Banner created successfully",
            data: newBanner,
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error creating banner: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get All Banners */
/* -------------------------------------------------------------------------- */
exports.getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: true,
            count: banners.length,
            data: banners,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error fetching banners: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get Banner by ID */
/* -------------------------------------------------------------------------- */
exports.getBannerById = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);

        if (!banner) {
            return res.status(404).json({
                message: "Banner not found",
                status: false,
            });
        }

        res.status(200).json({
            status: true,
            data: banner,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error fetching banner: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Update Banner */
/* -------------------------------------------------------------------------- */
exports.updateBanner = async (req, res) => {
    try {
        const { status, image } = req.body;

        const updated = await Banner.findByIdAndUpdate(
            req.params.id,
            { status, image },
            { returnDocument: "after" } // ✅ fixed warning
        );

        if (!updated) {
            return res.status(404).json({
                message: "Banner not found",
                status: false,
            });
        }

        res.status(200).json({
            message: "Banner updated successfully",
            status: true,
            data: updated,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error updating banner: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Delete Banner */
/* -------------------------------------------------------------------------- */
exports.deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);

        if (!banner) {
            return res.status(404).json({
                message: "Banner not found",
                status: false,
            });
        }

        await Banner.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Banner deleted successfully",
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error deleting banner: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Upload Banner Image (ONLY IMAGE) */
/* -------------------------------------------------------------------------- */
exports.uploadBannerImage = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file provided",
                status: false,
            });
        }

        cloudinary.uploader
            .upload_stream(
                {
                    folder: "Accuon/Banners",
                },
                (error, result) => {
                    if (error) {
                        return res.status(400).json({
                            message: "Image upload failed",
                            status: false,
                        });
                    }

                    res.status(200).json({
                        message: "Image uploaded successfully",
                        imageUrl: result.secure_url,
                        status: true,
                    });
                }
            )
            .end(req.file.buffer);
    } catch (error) {
        res.status(500).json({
            message: `Upload error: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Upload Media (IMAGE + VIDEO) */
/* -------------------------------------------------------------------------- */
exports.uploadMedia = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: "No files uploaded",
                status: false,
            });
        }

        let imageUrl = null;
        let videoUrl = null;

        const uploadToCloudinary = (file, type) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream(
                        {
                            folder: "Accuon/News",
                            resource_type: type === "video" ? "video" : "image", // ✅ FIX
                        },
                        (error, result) => {
                            if (error) {
                                console.error("Cloudinary Error:", error); // 🔥 IMPORTANT
                                reject(error);
                            } else {
                                resolve(result.secure_url);
                            }
                        }
                    )
                    .end(file.buffer);
            });
        };

        for (let file of req.files) {
            if (file.mimetype.startsWith("image")) {
                imageUrl = await uploadToCloudinary(file, "image");
            }
            else if (file.mimetype.startsWith("video")) {
                videoUrl = await uploadToCloudinary(file, "video");
            }
        }

        res.status(200).json({
            message: "Upload successful",
            image: imageUrl,
            video: videoUrl,
            status: true,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};