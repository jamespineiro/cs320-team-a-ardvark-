const express = require("express");
const { linkGradescope } = require("../services/gradescopeService");

const router = express.Router();

router.post("/fetch-gradescope", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    try {
        const assignments = await linkGradescope(email, password);
        res.json({ message: "Sync Successful", assignments });
    } catch (err) {
        res.status(500).json({ message: "Failed to connect to Gradescope", error: err.toString() });
    }
});

module.exports = router;