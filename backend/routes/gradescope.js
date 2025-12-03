const express = require("express");
const { runGradescope } = require("../services/gradescopeService");
const { parseGradescopeToCalendar, parseGradescopeForDB } = require("../utils/gradescopeParser");
const GradescopeAssignment = require("../model/GradescopeAssignmentSchema");

const router = express.Router();

// Middleware to verify authentication (optional - add if you want to enforce auth)
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // You could validate the sessionId here against your User model if needed
    next();
}

router.post("/fetch-gradescope", async (req, res) => {
    const { email, password, user_id } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Email and password required" });

    if (!user_id)
        return res.status(400).json({ message: "User ID required" });

    try {
        const result = await runGradescope(email, password);

        if (result.error)
            return res.status(401).json({
                message: "Gradescope login failed",
                detail: result.error,
            });

        // Parse assignments for database storage
        const dbAssignments = parseGradescopeForDB(result, user_id);

        // Delete old assignments for this user and insert new ones
        await GradescopeAssignment.deleteMany({ user_id });
        if (dbAssignments.length > 0) {
            await GradescopeAssignment.insertMany(dbAssignments);
        }

        // Parse assignments for calendar format
        const calendarEvents = parseGradescopeToCalendar(result);

        res.json({
            message: "Sync Successful",
            count: calendarEvents.length,
            assignments: calendarEvents
        });
    } catch (err) {
        console.error("Gradescope sync error:", err);
        res.status(500).json({
            error: "Failed to connect to Gradescope",
            detail: err.message,
        });
    }
});

// GET route to retrieve stored Gradescope assignments
router.get("/gradescope-events", async (req, res) => {
    const { user_id } = req.query;

    if (!user_id)
        return res.status(400).json({ message: "User ID required" });

    try {
        const assignments = await GradescopeAssignment.find({ user_id })
            .sort({ due_date: 1 });

        const calendarEvents = assignments.map(assignment => {
            const courseCode = assignment.course.split(',')[0].trim();
            const formattedDate = assignment.due_date.toISOString().split('T')[0];

            return {
                title: `${courseCode}: ${assignment.assignment}`,
                start: formattedDate,
                extendedProps: {
                    course: assignment.course,
                    status: assignment.status
                }
            };
        });

        res.json(calendarEvents);
    } catch (err) {
        console.error("Error fetching Gradescope events:", err);
        res.status(500).json({
            error: "Failed to fetch Gradescope events",
            detail: err.message,
        });
    }
});

module.exports = router;