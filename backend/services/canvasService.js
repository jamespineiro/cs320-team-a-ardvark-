const { spawn } = require("child_process");

function runCanvas(base_url, token, course_id) {
    return new Promise((resolve, reject) => {
        const python = spawn("python3", [
            "./python/canvasJSONexporter.py",
            base_url,
            token,
            course_id,
        ]);

        let stdout = "";
        let stderr = "";

        python.stdout.on("data", (data) => {
            const output = data.toString();
            console.log("PYTHON OUTPUT:", output);
            stdout += output;
        });

        python.stderr.on("data", (data) => {
            const error = data.toString();
            console.error("PYTHON ERROR:", error);
            stderr += error;
        });

        python.on("close", (code) => {
            console.log(`Python script exited with code ${code}`);

            if (code !== 0) {
                return reject(new Error(stderr || "Python script failed"));
            }

            try {
                const result = JSON.parse(stdout);
                console.log("Parsed Canvas data:", result);
                resolve(result);
            } catch (err) {
                console.error("JSON parse error:", err);
                console.error("Raw stdout:", stdout);
                reject(new Error("Failed to parse Canvas JSON response"));
            }
        });

        python.on("error", (err) => {
            console.error("Failed to start Python process:", err);
            reject(err);
        });
    });
}

module.exports = { runCanvas };
