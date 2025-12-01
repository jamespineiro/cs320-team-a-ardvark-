const { spawn } = require("child_process");


function runGradescope(email, password) {
    return new Promise((resolve, reject) => {
        const python = spawn("python3", ["./python/GradescopeDeadlines.py", email, password]);

        let stdout = "";
        let stderr = "";

        python.stdout.on("data", (data) => (stdout += data.toString()));
        python.stderr.on("data", (data) => (stderr += data.toString()));

        python.on("close", (code) => {
            if (code !== 0) return reject(stderr);
            try {
                resolve(JSON.parse(stdout));
            } catch {
                reject("JSON parse error");
            }
        });
    });
}

module.exports = { runGradescope };