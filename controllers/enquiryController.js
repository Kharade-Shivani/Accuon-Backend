const { sendEnquiryEmails } = require("../services/emailService");

exports.submitEnquiry = async (req, res) => {
    try {
        const { name, email, company, phone, service, message } = req.body;

        if (!name || !email || !service || !message) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing",
            });
        }

        await sendEnquiryEmails({
            name,
            email,
            company,
            phone,
            service,
            message,
        });

        res.status(200).json({
            success: true,
            message: "Enquiry submitted successfully",
        });

    } catch (error) {
        console.error("❌ Email Error:", error);

        res.status(500).json({
            success: false,
            message: "Email sending failed",
        });
    }
};