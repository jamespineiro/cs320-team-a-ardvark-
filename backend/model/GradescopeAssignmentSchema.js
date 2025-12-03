const mongoose = require("mongoose");

const GradescopeAssignmentSchema = new mongoose.Schema({
    course: { type: String, required: true },
    assignment: { type: String, required: true },
    status: { type: String, required: true }, // "Submitted" or "Pending"
    due_date: { type: Date, required: true },
    user_email: { type: String, required: true }, // To associate with user
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Index for faster queries
GradescopeAssignmentSchema.index({ user_email: 1, due_date: 1 });

const GradescopeAssignment = mongoose.model("gradescope_assignments", GradescopeAssignmentSchema);

module.exports = GradescopeAssignment;