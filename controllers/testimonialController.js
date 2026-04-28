const Testimonial = require("../models/Testimonial");

/* -------------------------------------------------------------------------- */
/* 🟢 Create Testimonial */
/* -------------------------------------------------------------------------- */
exports.createTestimonial = async (req, res) => {
    try {
        const { image, client_name, description, rating } = req.body;

        const newTestimonial = await Testimonial.create({
            image,
            client_name,
            description,
            rating,
        });

        res.status(201).json({
            message: "Testimonial created successfully",
            status: true,
            data: newTestimonial,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error creating testimonial: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get All Testimonials */
/* -------------------------------------------------------------------------- */
exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: true,
            count: testimonials.length,
            data: testimonials,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error fetching testimonials: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get Testimonial By ID */
/* -------------------------------------------------------------------------- */
exports.getTestimonialById = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                message: "Testimonial not found",
                status: false,
            });
        }

        res.status(200).json({
            status: true,
            data: testimonial,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error fetching testimonial: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Update Testimonial */
/* -------------------------------------------------------------------------- */
exports.updateTestimonial = async (req, res) => {
    try {
        const { image, client_name, description, rating } = req.body;

        const updated = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { image, client_name, description, rating },
            { returnDocument: "after" } // ✅ fixed warning
        );

        if (!updated) {
            return res.status(404).json({
                message: "Testimonial not found",
                status: false,
            });
        }

        res.status(200).json({
            message: "Testimonial updated successfully",
            status: true,
            data: updated,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error updating testimonial: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Delete Testimonial */
/* -------------------------------------------------------------------------- */
exports.deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                message: "Testimonial not found",
                status: false,
            });
        }

        await Testimonial.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Testimonial deleted successfully",
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error deleting testimonial: ${error.message}`,
            status: false,
        });
    }
};