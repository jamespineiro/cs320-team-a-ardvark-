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

app.listen(4000, () => {
    console.log(`Server listening on port 4000`);
});
