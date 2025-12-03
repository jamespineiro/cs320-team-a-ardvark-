// This file is intended to run on a Node.js server.
// It is NOT runnable within the frontend environment.

const { spawn } = require("child_process");

/**
 * Executes a Python script to fetch and export Canvas data as JSON.
 *
 * @param {string} base_url - The Canvas base URL (e.g., "myschool.instructure.com").
 * @param {string} access_token - The Canvas API token.
 * @param {string} course_id - The course ID to scrape.
 * @returns {Promise<Object>} Parsed JSON output from Python.
 */
function runCanvas(base_url, access_token, course_id) {
    return new Promise((resolve, reject) => {
        const python = spawn("python3", [
            "./python/canvasJSONexporter.py",
            base_url,
            access_token,
            course_id
        ]);

        let output = "";
        let errorOutput = "";

        python.stdout.on("data", (data) => {
            output += data.toString();
        });

        python.stderr.on("data", (data) => {
            errorOutput += data.toString();
        });

        python.on("close", (code) => {
            if (code !== 0) {
                console.error(
                    `Python script exited with code ${code}. Error: ${errorOutput}`
                );
                return reject(
                    new Error(errorOutput || "Python script failed to execute.")
                );
            }

            try {
                const json = JSON.parse(output.trim());
                resolve(json);
            } catch (err) {
                console.error("JSON parse error. Raw output:", output);
                reject(new Error("Invalid JSON output from Python script."));
            }
        });

        python.on("error", (err) => {
            console.error("Failed to start Python:", err);
            reject(new Error(`Python process error: ${err.message}`));
        });
    });
}

module.exports = { runCanvas };