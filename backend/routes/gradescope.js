const express = require("express");
const { runGradescope } = require("../services/gradescopeService");

const router = express.Router();

router.post("/fetch-gradescope", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Email and password required" });

    try {
        const result = await runGradescope(email, password);

        if (result.error)
            return res.status(401).json({
                message: "Gradescope login failed",
                detail: result.error,
            });

        res.json({ message: "Sync Successful", assignments: result });
    } catch (err) {
        res.status(500).json({
            error: "Failed to connect to Gradescope",
            detail: err,
        });
    }
});

module.exports = router;