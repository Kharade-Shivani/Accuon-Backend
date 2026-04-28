const nodemailer = require("nodemailer");

// Gmail SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify connection
transporter.verify((error) => {
    if (error) {
        console.error("❌ SMTP Error:", error.message);
    } else {
        console.log("✅ SMTP Connected Successfully");
    }
});

const sendEnquiryEmails = async ({
    name,
    email,
    company,
    phone,
    service,
    message,
}) => {
    // 📩 ADMIN MAIL
    const adminMail = {
        from: `"Accuon Website" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `🚀 New Enquiry from ${name}`,
        html: `
      <h3>New Enquiry</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
    };

    // 📩 USER AUTO REPLY
    const userMail = {
        from: `"Accuon Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thank you for contacting Accuon 🚀",
        html: `
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thank you for contacting <strong>Accuon</strong>.</p>
      <p>We have received your enquiry and our team will contact you shortly.</p>
      <br/>
      <p>Best Regards,<br/>
      <strong>Accuon Team</strong></p>
    `,
    };

    // Send both
    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);
};

module.exports = { sendEnquiryEmails };