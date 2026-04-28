const Client = require("../models/Client");

/* -------------------------------------------------------------------------- */
/* 🟢 Create Client */
/* -------------------------------------------------------------------------- */
exports.createClient = async (req, res) => {
    try {
        const { image, title } = req.body;

        const newClient = await Client.create({
            image,
            title,
        });

        res.status(201).json({
            message: "Client created successfully",
            status: true,
            data: newClient,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error creating client: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get All Clients */
/* -------------------------------------------------------------------------- */
exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: true,
            count: clients.length,
            data: clients,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error fetching clients: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get Client By ID */
/* -------------------------------------------------------------------------- */
exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({
                message: "Client not found",
                status: false,
            });
        }

        res.status(200).json({
            status: true,
            data: client,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error fetching client: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Update Client */
/* -------------------------------------------------------------------------- */
exports.updateClient = async (req, res) => {
    try {
        const { image, title } = req.body;

        const updated = await Client.findByIdAndUpdate(
            req.params.id,
            { image, title },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                message: "Client not found",
                status: false,
            });
        }

        res.status(200).json({
            message: "Client updated successfully",
            status: true,
            data: updated,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error updating client: ${error.message}`,
            status: false,
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Delete Client */
/* -------------------------------------------------------------------------- */
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({
                message: "Client not found",
                status: false,
            });
        }

        await Client.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Client deleted successfully",
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error deleting client: ${error.message}`,
            status: false,
        });
    }
};