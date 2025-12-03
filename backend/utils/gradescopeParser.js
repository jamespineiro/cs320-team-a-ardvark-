/**
 * Parse Gradescope assignments into calendar event format
 * @param {Array} assignments - Raw assignments from Gradescope scraper
 * @returns {Array} Calendar events in format { title, start }
 */
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

/**
 * Parse Gradescope assignments for database storage
 * @param {Array} assignments - Raw assignments from Gradescope scraper
 * @param {String} userId - User's MongoDB ObjectId for association
 * @returns {Array} Assignments ready for database insertion
 */
function parseGradescopeForDB(assignments, userId) {
    return assignments
        .filter(assignment => assignment.due_date) // Filter out null dates
        .map(assignment => ({
            course: assignment.course,
            assignment: assignment.assignment,
            status: assignment.status,
            due_date: new Date(assignment.due_date),
            user_id: userId,
            updated_at: new Date()
        }));
}

module.exports = {
    parseGradescopeToCalendar,
    parseGradescopeForDB
};