const express = require("express");
const CanvasModel = require("../model/Canvas");
const { encrypt } = require("../utils/encryption");
const { fetchCanvasDeadlines } = require("../services/canvasService");

const router = express.Router();

router.post("/fetch-canvas", async (req, res) => {
    const { base_url, access_token, course_id, user_id } = req.body;
    if (!base_url || !access_token || !course_id || !user_id)
        return res.status(400).json({ detail: "Missing required fields" });

    try {
        const encrypted = encrypt(access_token);
        const saved = await CanvasModel.create({ user_id, base_url, course_id, access_token: encrypted.encryptedData, iv: encrypted.iv });

        // Call service to run Python script
        fetchCanvasDeadlines(base_url, access_token, course_id)
            .then(() => console.log("Python script started"))
            .catch(err => console.error(err));

        return res.json({ message: "Canvas connection saved + Python script started", id: saved._id });
    } catch (err) {
        return res.status(500).json({ detail: err.message });
    }
});

module.exports = router;