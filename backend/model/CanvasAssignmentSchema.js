const mongoose = require("mongoose");

// MongoDB Schema for Canvas Assignments (matching Gradescope format)
const CanvasAssignmentSchema = new mongoose.Schema({
    course: { type: String, required: true },
    assignment: { type: String, required: true },
    status: { type: String, required: true }, // "Submitted" or "Pending"
    has_submitted_submissions: { type: Boolean, required: true },
    due_at: { type: Date, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Index for faster queries
CanvasAssignmentSchema.index({ user_id: 1, due_at: 1 });

const CanvasAssignment = mongoose.model("canvas_assignments", CanvasAssignmentSchema);
