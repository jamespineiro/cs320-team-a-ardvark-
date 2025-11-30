const mongoose = require("mongoose");

const CanvasSchema = new mongoose.Schema({
    base_url: { type: String, required: true },
    access_token: { type: String, required: true },
    iv: { type: String, required: true },
    course_id: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const Canvas = mongoose.model("canvas_connections", CanvasSchema);

module.exports = Canvas;
