const cloudinary = require("../config/cloudinaryConfig");
const path = require("path");

const sanitizeResumeName = (originalName = "resume") =>
    path
        .parse(originalName)
        .name
        .trim()
        .replace(/[^\w.-]+/g, "_");

const buildResumeUrls = (url = "") => {
    if (!url) {
        return {
            viewUrl: "",
            downloadUrl: "",
        };
    }

    return {
        viewUrl: url,
        downloadUrl: url.replace("/upload/", "/upload/fl_attachment/"),
    };
};

/* -------------------- UPLOAD RESUME -------------------- */
exports.uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
                status: false,
            });
        }

        if (req.file.mimetype !== "application/pdf") {
            return res.status(400).json({
                message: "Only PDF files are allowed",
                status: false,
            });
        }

        const cleanName = sanitizeResumeName(req.file.originalname);

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "Accuon/Resumes",
                    resource_type: "image",
                    public_id: `${Date.now()}_${cleanName}`,
                    format: "pdf",
                    type: "upload",
                    access_mode: "public",
                },
                (error, result) => {
                    if (result) resolve(result);
                    else reject(error);
                }
            );

            stream.end(req.file.buffer);
        });

        const { viewUrl, downloadUrl } = buildResumeUrls(result.secure_url);

        res.status(200).json({
            message: "Resume uploaded successfully",
            status: true,
            fileUrl: viewUrl,
            viewUrl,
            downloadUrl,
        });
    } catch (error) {
        console.error("UPLOAD ERROR:", error);
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};
