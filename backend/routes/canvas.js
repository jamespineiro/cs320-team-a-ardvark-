const express = require("express");
const { encrypt } = require("../utils/encryption");
const { runCanvas } = require("../services/canvasService");

const router = express.Router();

// handler factory
function createFetchCanvasHandler({ CanvasModel, encryptFn = encrypt, runCanvasFn = runCanvas }) {
  return async (req, res) => {
    const { base_url, access_token, course_id, user_id } = req.body;

    if (!base_url || !access_token || !course_id || !user_id)
        return res.status(400).json({ detail: "Missing required fields" });

    const encrypted = encryptFn(access_token);

    const saved = await CanvasModel.create({
        user_id,
        base_url,
        course_id,
        access_token: encrypted.encryptedData,
        iv: encrypted.iv,
    });

    runCanvasFn(base_url, access_token, course_id);

    res.json({
        message: "Canvas connection saved + Python script started",
        id: saved._id,
    });
  };
}

// normal usage
const CanvasModel = require("../model/Canvas");
const fetchCanvasHandler = createFetchCanvasHandler({ CanvasModel });
router.post("/fetch-canvas", fetchCanvasHandler);

module.exports = { router, fetchCanvasHandler, createFetchCanvasHandler };