const express = require("express");
const CanvasModel = require("../model/Canvas");
const CanvasAssignment = require("../model/CanvasAssignmentSchema");
const { encrypt } = require("../utils/encryption");
const { runCanvas } = require("../services/canvasService");
const { parseCanvasToCalendar, parseCanvasForDB } = require("../utils/canvasParser");

const router = express.Router();

router.post("/fetch-canvas", async (req, res) => {
    const { base_url, access_token, course_id, user_id } = req.body;

    if (!base_url || !access_token || !course_id || !user_id)
        return res.status(400).json({ detail: "Missing required fields" });

    try {
        // Save Canvas credentials
        const encrypted = encrypt(access_token);

        const saved = await CanvasModel.create({
            user_id,
            base_url,
            course_id,
            access_token: encrypted.encryptedData,
            iv: encrypted.iv,
        });

        // Fetch Canvas assignments
        const result = await runCanvas(base_url, access_token, course_id);

        if (result.error)
            return res.status(401).json({
                message: "Canvas fetch failed",
                detail: result.error,
            });

        // Parse assignments for database storage
        const dbAssignments = parseCanvasForDB(result, user_id);

        // Delete old assignments for this user and insert new ones
        await CanvasAssignment.deleteMany({ user_id });
        if (dbAssignments.length > 0) {
            await CanvasAssignment.insertMany(dbAssignments);
        }

        // Parse assignments for calendar format
        const calendarEvents = parseCanvasToCalendar(result);

        res.json({
            message: "Canvas connection saved + assignments synced",
            id: saved._id,
            count: calendarEvents.length,
            assignments: calendarEvents
        });
    } catch (err) {
        console.error("Canvas sync error:", err);
        res.status(500).json({
            error: "Failed to connect to Canvas",
            detail: err.message,
        });
    }
});

// GET route to retrieve stored Canvas assignments
router.get("/canvas-events", async (req, res) => {
    const { user_id } = req.query;

    if (!user_id)
        return res.status(400).json({ message: "User ID required" });

    try {
        const assignments = await CanvasAssignment.find({ user_id })
            .sort({ due_date: 1 });

        const calendarEvents = assignments.map(assignment => {
            const formattedDate = assignment.due_date.toISOString().split('T')[0];

            return {
                title: `${assignment.course}: ${assignment.assignment}`,
                start: formattedDate,
                extendedProps: {
                    course: assignment.course,
                    status: assignment.status
                }
            };
        });

        res.json(calendarEvents);
    } catch (err) {
        console.error("Error fetching Canvas events:", err);
        res.status(500).json({
            error: "Failed to fetch Canvas events",
            detail: err.message,
        });
    }
});

module.exports = router;