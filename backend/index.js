require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const authRouter = require("./routes/auth");
const canvasRouter = require("./routes/canvas");
const gradescopeRouter = require("./routes/gradescope");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Mount routers
app.use("/auth", authRouter);
app.use("/canvas", canvasRouter);
app.use("/gradescope", gradescopeRouter);

// Start server
app.listen(4000, () => console.log("Server listening on port 4000"));

module.exports = app;
