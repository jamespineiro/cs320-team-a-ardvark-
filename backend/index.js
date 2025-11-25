require('dotenv').config();
const crypto = require('crypto');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./model/User");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Encryption Setup
const algorithm = 'aes-256-cbc';

const key = crypto
    .createHash('sha256')
    .update(String(process.env.ENCRYPTION_KEY))
    .digest('base64')
    .substring(0, 32);

// Encrypt function
function encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return { iv: iv.toString("hex"), encryptedData: encrypted };
}

// Decrypt function
function decrypt(encryptedData, iv) {
    const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(key),
        Buffer.from(iv, "hex")
    );

    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}

// SIGNUP ROUTE (with validation + proper errors)
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    // 1. Missing fields
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    // 2. Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    // 3. Weak password check (optional, but recommended)
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    try {
        // 4. Check if email already exists
        const exists = await UserModel.findOne({ email });
        if (exists) {
            return res.status(409).json({ error: "Email already in use" });
        }

        // 5. Encrypt password and store user
        const encrypted = encrypt(password);

        const user = await UserModel.create({
            email,
            password: encrypted.encryptedData,
            iv: encrypted.iv
        });

        return res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        return res.status(500).json({ error: "Server error: " + err.message });
    }
});

// LOGIN ROUTE (with validation + proper errors)
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // 1. Missing fields
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    // 2. Find user
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    // 3. Compare encrypted password
    const decryptedPassword = decrypt(user.password, user.iv);

    if (decryptedPassword !== password) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    // 4. Success
    return res.json({ message: "Login successful" });
});

app.listen(4000, () => {
    console.log(`Server listening on port 4000`);
});
