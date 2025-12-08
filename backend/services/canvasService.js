const { spawn } = require("child_process");

function runCanvas(base_url, token, course_id) {
    const python = spawn("python3", [
        "./python/canvasJSONexporter.py",
        base_url,
        token,
        course_id,
    ]);

    let stdout = "";
    let stderr = "";

    python.stdout.on("data", (data) =>
        console.log("PYTHON:", data.toString())
    );

    python.stderr.on("data", (data) =>
        console.error("PYTHON ERROR:", data.toString())
    );

    python.on("close", (code) =>
        console.log(`Python script exited with code ${code}`)
    );

    python.on("close", (code) => {
        if (code !== 0) return reject(stderr);
        try {
            resolve(JSON.parse(stdout));
        } catch {
            reject("JSON parse error");
        }
    });
}

module.exports = { runCanvas };