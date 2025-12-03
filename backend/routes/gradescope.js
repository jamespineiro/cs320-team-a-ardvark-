const express = require("express");
const { runGradescope } = require("../services/gradescopeService");
const { parseGradescopeToCalendar, parseGradescopeForDB } = require("../utils/gradescopeParser");
const GradescopeAssignment = require("../models/Gradescope");

const router = express.Router();

router.post("/fetch-gradescope", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Email and password required" });

    try {
        const result = await runGradescope(email, password);

        if (result.error)
            return res.status(401).json({
                message: "Gradescope login failed",
                detail: result.error,
            });

        // Parse assignments for database storage
        const dbAssignments = parseGradescopeForDB(result, email);

        // Delete old assignments for this user and insert new ones
        await GradescopeAssignment.deleteMany({ user_email: email });
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
    const { email } = req.query;

    if (!email)
        return res.status(400).json({ message: "Email required" });

    try {
        const assignments = await GradescopeAssignment.find({ user_email: email })
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