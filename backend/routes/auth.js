const express = require("express");
const UserModel = require("../model/User");
const { encrypt, decrypt } = require("../utils/encryption");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email format" });
    if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters" });

    try {
        const exists = await UserModel.findOne({ email });
        if (exists) return res.status(409).json({ error: "Email already in use" });

        const encrypted = encrypt(password);
        await UserModel.create({ email, password: encrypted.encryptedData, iv: encrypted.iv });
        return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Server error: " + err.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid email or password" });

        const decryptedPassword = decrypt(user.password, user.iv);
        if (decryptedPassword !== password) return res.status(401).json({ error: "Invalid email or password" });

        return res.json({ message: "Login successful" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;