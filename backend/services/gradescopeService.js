const { spawn } = require("child_process");

function linkGradescope(email, password) {
    return new Promise((resolve, reject) => {
        const python = spawn("python3", ["./python/gradescopeAPI.py", email, password]);
        let output = "";
        let errorOutput = "";

        python.stdout.on("data", (data) => (output += data.toString()));
        python.stderr.on("data", (data) => (errorOutput += data.toString()));

        python.on("close", (code) => {
            if (code !== 0) return reject(new Error(errorOutput));
            try {
                const result = JSON.parse(output);
                if (result.error) return reject(result.error);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    });
}

module.exports = { linkGradescope };