const Client = require("../models/Client");

// Get all clients
const getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });

    res.status(200).json({
      clients
    });

  } catch (error) {
    console.error("Get clients error:", error);

    res.status(500).json({
      message: "Failed to fetch clients"
    });
  }
};


// Add new client
const addClient = async (req, res) => {
  try {
    const { name, email, status } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required"
      });
    }

    const client = await Client.create({
      name,
      email,
      status: status || "Active"
    });

    res.status(201).json({
      message: "Client added successfully",
      client
    });

  } catch (error) {
    console.error("Add client error:", error);

    res.status(500).json({
      message: "Failed to add client"
    });
  }
};


module.exports = {
  getClients,
  addClient
};