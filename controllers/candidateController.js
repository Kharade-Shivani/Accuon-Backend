const Candidate = require("../models/Candidate");
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

const sanitizeDownloadFileName = (fileName = "resume.pdf") =>
    String(fileName).replace(/[^a-zA-Z0-9._-]/g, "_");

const parseCloudinaryAsset = (assetUrl = "") => {
    if (!assetUrl) {
        return null;
    }

    try {
        const parsedUrl = new URL(assetUrl);
        const segments = parsedUrl.pathname.split("/").filter(Boolean);
        const versionIndex = segments.findIndex((segment) => /^v\d+$/.test(segment));

        if (versionIndex === -1 || versionIndex < 3) {
            return null;
        }

        const resourceType = segments[1];
        const deliveryType = segments[2];
        const publicIdWithFormat = decodeURIComponent(
            segments.slice(versionIndex + 1).join("/")
        );
        const extension = path.extname(publicIdWithFormat);
        const format = extension ? extension.slice(1) : "pdf";
        const publicId =
            resourceType === "raw"
                ? publicIdWithFormat
                : extension
                  ? publicIdWithFormat.slice(0, -extension.length)
                  : publicIdWithFormat;

        return {
            resourceType,
            deliveryType,
            publicId,
            format,
            fileName: path.basename(publicIdWithFormat) || `resume.${format}`,
        };
    } catch (error) {
        return null;
    }
};

const uploadResumeToCloudinary = async (file) => {
    const cleanName = sanitizeResumeName(file.originalname);

    return new Promise((resolve, reject) => {
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

        stream.end(file.buffer);
    });
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
                message: "Only PDF allowed",
                status: false,
            });
        }

        const result = await uploadResumeToCloudinary(req.file);
        const { viewUrl, downloadUrl } = buildResumeUrls(result.secure_url);

        res.status(200).json({
            message: "Resume uploaded successfully",
            status: true,
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

/* -------------------- CREATE -------------------- */
exports.createCandidate = async (req, res) => {
    try {
        const {
            name,
            email,
            contact,
            position,
            employment,
            availabilityDate,
            resume,
        } = req.body;

        if (
            !name ||
            !email ||
            !contact ||
            !position ||
            !employment ||
            !availabilityDate
        ) {
            return res.status(400).json({
                message: "All required fields must be provided",
                status: false,
            });
        }

        let resumeUrl = resume || "";

        if (req.file) {
            const uploaded = await uploadResumeToCloudinary(req.file);
            resumeUrl = uploaded.secure_url;
        }

        const { viewUrl, downloadUrl } = buildResumeUrls(resumeUrl);

        const candidate = await Candidate.create({
            name,
            email,
            contact,
            position,
            employment,
            availabilityDate,
            resume: resumeUrl,
        });

        res.status(201).json({
            message: "Candidate created successfully",
            status: true,
            data: {
                ...candidate.toObject(),
                viewResume: viewUrl,
                downloadResume: downloadUrl,
            },
        });
    } catch (error) {
        console.error("CREATE ERROR:", error);
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};

/* -------------------- GET ALL -------------------- */
exports.getAllCandidates = async (req, res) => {
    try {
        const data = await Candidate.find().sort({ createdAt: -1 });

        const updatedData = data.map((item) => {
            const { viewUrl, downloadUrl } = buildResumeUrls(item.resume);

            return {
                ...item.toObject(),
                viewResume: viewUrl,
                downloadResume: downloadUrl,
            };
        });

        res.status(200).json({
            status: true,
            count: updatedData.length,
            data: updatedData,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};

/* -------------------- GET BY ID -------------------- */
exports.getCandidateById = async (req, res) => {
    try {
        const data = await Candidate.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "Candidate not found",
                status: false,
            });
        }

        const { viewUrl, downloadUrl } = buildResumeUrls(data.resume);

        res.status(200).json({
            status: true,
            data: {
                ...data.toObject(),
                viewResume: viewUrl,
                downloadResume: downloadUrl,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};

/* -------------------- DOWNLOAD RESUME -------------------- */
exports.downloadCandidateResume = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);

        if (!candidate) {
            return res.status(404).json({
                message: "Candidate not found",
                status: false,
            });
        }

        if (!candidate.resume) {
            return res.status(404).json({
                message: "Resume not found",
                status: false,
            });
        }

        const asset = parseCloudinaryAsset(candidate.resume);

        if (!asset) {
            return res.status(400).json({
                message: "Invalid resume URL",
                status: false,
            });
        }

        const signedDownloadUrl = cloudinary.utils.private_download_url(
            asset.publicId,
            asset.format,
            {
                resource_type: asset.resourceType,
                type: asset.deliveryType,
                attachment: asset.fileName,
            }
        );

        const downloadResponse = await fetch(signedDownloadUrl);

        if (!downloadResponse.ok) {
            throw new Error(`Cloudinary download failed with status ${downloadResponse.status}`);
        }

        const fileBuffer = Buffer.from(await downloadResponse.arrayBuffer());
        const contentType =
            downloadResponse.headers.get("content-type") || "application/pdf";
        const safeFileName = sanitizeDownloadFileName(asset.fileName);

        res.setHeader("Content-Type", contentType);
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${safeFileName}"`
        );

        return res.status(200).send(fileBuffer);
    } catch (error) {
        console.error("DOWNLOAD RESUME ERROR:", error);
        return res.status(500).json({
            message: "Failed to download resume",
            status: false,
        });
    }
};

/* -------------------- UPDATE -------------------- */
exports.updateCandidate = async (req, res) => {
    try {
        const updateData = { ...req.body };

        if (req.file) {
            const uploaded = await uploadResumeToCloudinary(req.file);
            updateData.resume = uploaded.secure_url;
        }

        const updated = await Candidate.findByIdAndUpdate(
            req.params.id,
            updateData,
            { returnDocument: "after" }
        );

        if (!updated) {
            return res.status(404).json({
                message: "Candidate not found",
                status: false,
            });
        }

        const { viewUrl, downloadUrl } = buildResumeUrls(updated.resume);

        res.status(200).json({
            message: "Candidate updated successfully",
            status: true,
            data: {
                ...updated.toObject(),
                viewResume: viewUrl,
                downloadResume: downloadUrl,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};

/* -------------------- DELETE -------------------- */
exports.deleteCandidate = async (req, res) => {
    try {
        const data = await Candidate.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "Candidate not found",
                status: false,
            });
        }

        await Candidate.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Candidate deleted successfully",
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};
