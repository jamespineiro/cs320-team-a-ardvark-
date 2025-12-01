const express = require("express");
const CanvasModel = require("../model/Canvas");
const { encrypt } = require("../utils/encryption");
const { runCanvas } = require("../services/canvasService");

const router = express.Router();

router.post("/fetch", async (req, res) => {
    const { base_url, access_token, course_id, user_id } = req.body;

    if (!base_url || !access_token || !course_id || !user_id)
        return res.status(400).json({ detail: "Missing fields" });

    const encrypted = encrypt(access_token);

    const saved = await CanvasModel.create({
        user_id,
        base_url,
        course_id,
        access_token: encrypted.encryptedData,
        iv: encrypted.iv,
    });

    runCanvas(base_url, access_token, course_id);

    res.json({
        message: "Canvas connection saved + Python script started",
        id: saved._id,
    });
});

module.exports = router;