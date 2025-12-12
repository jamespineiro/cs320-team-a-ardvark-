const mongoose = require("mongoose");

const CanvasAssignmentSchema = new mongoose.Schema({
    course: { type: String, required: true },
    assignment: { type: String, required: true },
    status: { type: String, required: true },
    has_submitted_submissions: { type: Boolean, required: true },
    due_at: { type: Date, required: true }, // Keep as due_at to match Canvas API
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

CanvasAssignmentSchema.index({ user_id: 1, due_at: 1 });

const CanvasAssignment = mongoose.model("canvas_assignments", CanvasAssignmentSchema);

module.exports = CanvasAssignment;