const { spawn } = require("child_process");

function runCanvasAndReturnJSON(base_url, token, course_id) {
    return new Promise((resolve, reject) => {
        const python = spawn("python3", [
            "./python/canvasJSONexporter.py",
            base_url,
            token,
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
                return reject(new Error(errorOutput || "Python script failed"));
            }
            try {
                const json = JSON.parse(output);
                resolve(json);
            } catch (err) {
                reject(new Error("Invalid JSON from Python"));
            }
        });
    });
}

module.exports = { runCanvasAndReturnJSON };