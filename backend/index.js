const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const canvasRoutes = require("./routes/canvas");
const gradescopeRoutes = require("./routes/gradescope");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_CONNECTION)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/auth", authRoutes);
app.use("/canvas", canvasRoutes);
app.use("/gradescope", gradescopeRoutes);

app.listen(4000, () => console.log("Server listening on port 4000"));