const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

// Connect to DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// FIX: Increase payload limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Root Route
app.get('/', (req, res) => {
    res.send('🚀 Accuon Backend Running');
});

// -------------------- ROUTES IMPORT --------------------
const bannerRoutes = require("./routes/bannerRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const clientRoutes = require("./routes/clientRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const footerRoutes = require("./routes/footerRoutes");
const certificationRoutes = require("./routes/certificationRoutes");
const newsRoutes = require("./routes/newsRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const serviceCategoryRoutes = require("./routes/serviceCategoryRoutes");
const turnkeyRoutes = require("./routes/turnkeyRoutes");
const engineeringRoutes = require("./routes/engineeringRoutes");
const industrialRoutes = require("./routes/industrialRoutes");
const controlPanelRoutes = require("./routes/controlPanelRoutes");
const jobRoutes = require("./routes/jobRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const serviceSubCategoryRoutes = require("./routes/serviceSubCategoryRoutes");
const aboutUsRoutes = require("./routes/aboutUsRoutes");
const imageMasterRoutes = require("./routes/imageMasterRoutes");
const statMasterRoutes = require("./routes/statMasterRoutes");
const accreditationsMasterRoutes = require("./routes/accreditationsMasterRoutes");
const whyChooseUsMasterRoutes = require("./routes/whyChooseUsMasterRoutes");
// -------------------- ROUTES USE ------------------------
app.use("/", bannerRoutes);
app.use("/", galleryRoutes);
app.use("/", clientRoutes);
app.use("/", testimonialRoutes);
app.use("/", footerRoutes);
app.use("/", certificationRoutes);
app.use("/api/news", newsRoutes);
app.use("/api", enquiryRoutes);
app.use("/", serviceCategoryRoutes);
app.use("/", turnkeyRoutes);
app.use("/", engineeringRoutes);
app.use("/", industrialRoutes);
app.use("/", controlPanelRoutes);
app.use("/", jobRoutes);
app.use("/", candidateRoutes);
app.use("/", uploadRoutes);
app.use("/", serviceSubCategoryRoutes);
app.use("/", aboutUsRoutes);
app.use("/", imageMasterRoutes);
app.use("/", statMasterRoutes);
app.use("/", accreditationsMasterRoutes);
app.use("/", whyChooseUsMasterRoutes);

// Start Server
app.listen(process.env.Port, () => {
    console.log(`listening on ${process.env.Port}`);
    console.log(`Connected to DB → ${process.env.MONGO_URI}`);
});
