// Parse Gradescope assignments into calendar event format
function parseGradescopeToCalendar(assignments) {
    return assignments
        .filter(assignment => assignment.due_date) // Filter out null dates
        .map(assignment => {
            // Extract course code (e.g., "COMPSCI 320" from "COMPSCI 320, Section 2 - Introduction to Software Engineering")
            const courseCode = assignment.course.split(',')[0].trim();

            // Format the due date to YYYY-MM-DD
            const dueDate = new Date(assignment.due_date);
            const formattedDate = dueDate.toISOString().split('T')[0];

            return {
                title: `${courseCode}: ${assignment.assignment}`,
                start: formattedDate,
                extendedProps: {
                    course: assignment.course,
                    status: assignment.status,
                    originalDueDate: assignment.due_date
                }
            };
        });
}

// Parse Gradescope assignments for database storage
function parseGradescopeForDB(assignments, userEmail) {
    return assignments
        .filter(assignment => assignment.due_date) // Filter out null dates
        .map(assignment => ({
            course: assignment.course,
            assignment: assignment.assignment,
            status: assignment.status,
            due_date: new Date(assignment.due_date),
            user_email: userEmail,
            updated_at: new Date()
        }));
}

module.exports = {
    parseGradescopeToCalendar,
    parseGradescopeForDB
};