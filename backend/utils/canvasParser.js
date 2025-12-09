// Parse Canvas assignments into calendar event format
function parseCanvasToCalendar(assignments) {
    console.log("parseCanvasToCalendar - Input:", assignments);

    if (!Array.isArray(assignments)) {
        console.error("Assignments is not an array:", typeof assignments);
        return [];
    }

    return assignments
        .filter(assignment => {
            if (!assignment.due_at) {
                console.log("Skipping assignment without due_at:", assignment.name);
                return false;
            }
            return true;
        })
        .map(assignment => {
            const courseCode = `Canvas Course ${assignment.course_id}`;
            const dueDate = new Date(assignment.due_at);
            const formattedDate = dueDate.toISOString().split('T')[0];
            const status = assignment.has_submitted_submissions ? 'Submitted' : 'Pending';

            return {
                title: `${courseCode}: ${assignment.name}`,
                start: formattedDate,
                extendedProps: {
                    course: courseCode,
                    status: status,
                    originalDueDate: assignment.due_at
                }
            };
        });
}

// Parse Canvas assignments for database storage
function parseCanvasForDB(assignments, userId) {
    console.log("parseCanvasForDB - Input:", assignments?.length, "assignments");

    if (!Array.isArray(assignments)) {
        console.error("Assignments is not an array:", typeof assignments);
        return [];
    }

    return assignments
        .filter(assignment => assignment.due_at)
        .map(assignment => {
            const status = assignment.has_submitted_submissions ? 'Submitted' : 'Pending';

            return {
                course: `Canvas Course ${assignment.course_id}`,
                assignment: assignment.name,
                status: status,
                has_submitted_submissions: assignment.has_submitted_submissions || false,
                due_at: new Date(assignment.due_at), // Use due_at not due_date!
                user_id: userId,
                updated_at: new Date()
            };
        });
}

module.exports = {
    parseCanvasToCalendar,
    parseCanvasForDB
};