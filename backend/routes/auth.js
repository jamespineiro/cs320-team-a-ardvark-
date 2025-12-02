const express = require("express");
const crypto = require("crypto");
const User = require("../model/User");
const { encrypt, decrypt } = require("../utils/encryption");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ error: "Email and password are required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already in use" });

    const encrypted = encrypt(password);

    await User.create({
        email,
        password: encrypted.encryptedData,
        iv: encrypted.iv,
    });

    res.status(201).json({ message: "User created successfully" });
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
        return res.status(401).json({ error: "Invalid email or password" });

    const decrypted = decrypt(user.password, user.iv);

    if (decrypted !== password)
        return res.status(401).json({ error: "Invalid email or password" });

    // Generate session ID
    const sessionId = typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : crypto.randomBytes(16).toString('hex');

    res.json({ 
        message: "Login successful", 
        sessionId,
        user_id: user._id 
    });
});

module.exports = router;
