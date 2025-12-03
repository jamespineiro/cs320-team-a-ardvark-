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

// DB
mongoose
    .connect(process.env.MONGODB_CONNECTION)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/", authRoutes);            // /signup, /login
app.use("/", canvasRoutes);          // /fetch-canvas
app.use("/", gradescopeRoutes);      // /fetch-gradescope

app.listen(5173, () => console.log("Server listening on port 5173"));