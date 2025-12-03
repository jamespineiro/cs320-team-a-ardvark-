const express = require("express");
const CanvasModel = require("../model/Canvas");
const CanvasAssignment = require("../model/CanvasAssignmentSchema"); // You will create this
const { encrypt } = require("../utils/encryption");
const { runCanvas } = require("../services/canvasService");

const {
    parseCanvasForDB,
    parseCanvasToCalendar
} = require("../utils/canvasParser"); // You will create this too

const router = express.Router();

// --- Same style as Gradescope.js ---
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}

// Apply auth middleware
router.use(requireAuth);

// POST /fetch-canvas
router.post("/fetch-canvas", async (req, res) => {
    const { base_url, access_token, course_id, user_id } = req.body;

    if (!base_url || !access_token || !course_id)
        return res.status(400).json({ message: "Missing Canvas credentials" });

    if (!user_id)
        return res.status(400).json({ message: "User ID required" });

    try {
        // Encrypt and save connection metadata
        const encrypted = encrypt(access_token);
        const saved = await CanvasModel.create({
            user_id,
            base_url,
            course_id,
            access_token: encrypted.encryptedData,
            iv: encrypted.iv,
        });

        // Run Python and get JSON
        const pythonAssignments = await runCanvas(
            base_url,
            access_token,
            course_id
        );


        // Parse for database
        const dbAssignments = parseCanvasForDB(
            pythonAssignments,
            user_id,
            course_id
        );

        // Delete old → insert new
        await CanvasAssignment.deleteMany({ user_id, course_id });
        if (dbAssignments.length > 0) {
            await CanvasAssignment.insertMany(dbAssignments);
        }

        // Parse for frontend calendar
        const calendarEvents = parseCanvasToCalendar(pythonAssignments);

        res.json({
            message: "Canvas sync successful",
            count: calendarEvents.length,
            assignments: calendarEvents,
            id: saved._id,
        });

    } catch (err) {
        console.error("Canvas sync error:", err);
        res.status(500).json({
            error: "Failed to fetch Canvas assignments",
            detail: err.message,
        });
    }
});

// GET /canvas-events
router.get("/canvas-events", async (req, res) => {
    const { user_id, course_id } = req.query;

    if (!user_id)
        return res.status(400).json({ message: "User ID required" });

    try {
        const assignments = await CanvasAssignment
            .find(course_id ? { user_id, course_id } : { user_id })
            .sort({ due_date: 1 });

        const calendarEvents = assignments.map(a => ({
            title: `${a.course_code}: ${a.name}`,
            start: a.due_date.toISOString().split("T")[0],
            extendedProps: {
                status: a.status,
                course: a.course_name
            }
        }));

        res.json(calendarEvents);

    } catch (err) {
        console.error("Canvas event error:", err);
        res.status(500).json({
            error: "Failed to fetch Canvas events",
            detail: err.message,
        });
    }
});

module.exports = router;