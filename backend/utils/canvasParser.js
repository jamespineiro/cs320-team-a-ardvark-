// Parse Canvas assignments into calendar event format
function parseCanvasToCalendar(assignments) {
    return assignments
        .filter(assignment => assignment.due_at) // Filter out null dates
        .map(assignment => {
            // Extract course code from course_id or name
            const courseCode = `Canvas Course ${assignment.course_id}`;

            // Format the due date to YYYY-MM-DD
            const dueDate = new Date(assignment.due_at);
            const formattedDate = dueDate.toISOString().split('T')[0];

            // Determine status
            let status = assignment.has_submitted_submissions ? 'Submitted' : 'Pending';

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
    return assignments
        .filter(assignment => assignment.due_at) // Filter out null dates
        .map(assignment => {
            // Determine status
            let status = assignment.has_submitted_submissions ? 'Submitted' : 'Pending';

            return {
                course: `Canvas Course ${assignment.course_id}`,
                assignment: assignment.name,
                status: status,
                due_date: new Date(assignment.due_at),
                user_id: userId,
                updated_at: new Date()
            };
        });
}

module.exports = {
    parseCanvasToCalendar,
    parseCanvasForDB
};