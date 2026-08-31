require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoute");
const clientRoutes = require("./routes/clientRoute");
const schemaRoutes = require("./routes/schemaRoute");

const app = express();


// Connect MongoDB
connectDB();


// Middleware
app.use(cors());

app.use(express.json());


// Test route
app.get("/", (req, res) => {

    res.json({
        message: "Client Management API is running"
    });

});


// Routes
app.use("/api/auth",authRoutes);

app.use("/api/clients",clientRoutes);

app.use("/api/schema",schemaRoutes);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});