const { spawn } = require("child_process");

function fetchCanvasDeadlines(base_url, access_token, course_id) {
    return new Promise((resolve, reject) => {
        const python = spawn("python3", ["./python/canvasDeadlineExporter.py", base_url, access_token, course_id]);
        let output = "";
        let errorOutput = "";

        python.stdout.on("data", (data) => (output += data.toString()));
        python.stderr.on("data", (data) => (errorOutput += data.toString()));

        python.on("close", (code) => {
            if (code !== 0) return reject(new Error(errorOutput));
            try {
                resolve(JSON.parse(output));
            } catch (err) {
                reject(err);
            }
        });
    });
}

module.exports = { fetchCanvasDeadlines };