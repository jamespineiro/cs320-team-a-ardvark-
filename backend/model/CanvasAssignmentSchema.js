const mongoose = require("mongoose");

const CanvasAssignmentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    course_id: {
        type: String,
        required: true,
    },
    assignment_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    course_name: {
        type: String,
    },
    due_date: {
        type: Date,
    },
    status: {
        type: String, // ex: "submitted", "missing", "unsubmitted"
    },
    raw_json: {
        type: Object, // store original Canvas JSON for debugging
    },
}, { timestamps: true });

module.exports = mongoose.model("CanvasAssignment", CanvasAssignmentSchema);
