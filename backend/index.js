const { spawn } = require('child_process');
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

// SIGNUP ROUTE
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const encrypted = encrypt(password);

    try {
        const user = await UserModel.create({
            email,
            password: encrypted.encryptedData,
            iv: encrypted.iv,
        });

        res.json({ message: "User created", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN ROUTE
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) return res.json("No record existed");

    const decryptedPassword = decrypt(user.password, user.iv);

    if (decryptedPassword === password) {
        return res.json("Success");
    } else {
        return res.json("The password is incorrect");
    }
});

// LINK GRADESCOPE ROUTE
app.post("/link-gradescope", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Spawn Python script with the user's credentials
    const pythonProcess = spawn('python3', ['./gradescopeAPI.py', email, password]);

    let dataString = '';
    let errorString = '';

    // Collecting data from Python script
    pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
    });

    // Collect any errors
    pythonProcess.stderr.on('data', (data) => {
        errorString += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error("Python script failed:", errorString);
            return res.status(500).json({ message: "Failed to connect to Gradescope", error: errorString });
        }

        try {
            const result = JSON.parse(dataString);

            if (result.error) {
                return res.status(401).json({ message: "Gradescope login failed", detail: result.error });
            }

            // For now, just return the data to prove it works.
            // Later, you will save 'result' to the database.
            res.json({ message: "Sync Successful", assignments: result });

        } catch (err) {
            console.error("JSON Parse Error:", err);
            res.status(500).json({ message: "Error parsing Gradescope data" });
        }
    });
});
app.listen(4000, () => {
    console.log(`Server listening on port 4000`);
});