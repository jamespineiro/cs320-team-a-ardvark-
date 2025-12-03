function parseCanvasForDB(assignments, user_id, course_id) {
    return assignments.map(a => ({
        user_id,
        course_id,
        course_name: a.course_id || "Canvas Course",
        course_code: a.course_code || "",
        name: a.name,
        due_date: a.due_at ? new Date(a.due_at) : null,
        status: a.submission?.workflow_state || "unknown"
    })).filter(a => a.name);
}

function parseCanvasToCalendar(assignments) {
    return assignments.map(a => ({
        title: a.name,
        start: a.due_at ? a.due_at.split("T")[0] : null,
        extendedProps: {
            status: a.submission?.workflow_state || "unknown"
        }
    })).filter(a => a.start);
}

module.exports = { parseCanvasForDB, parseCanvasToCalendar };