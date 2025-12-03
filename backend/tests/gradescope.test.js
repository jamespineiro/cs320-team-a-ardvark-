const test = require("node:test");
const assert = require("assert");
const request = require("supertest");
const express = require("express");

// Import router and service
const gradescopeRouter = require("../routes/gradescope.js");
const service = require("../services/gradescopeService.js");

// Build a test Express app
const app = express();
app.use(express.json());
app.use("/", gradescopeRouter);

// helper to mock runGradescope
function mockRunGradescope(mockFn) {
    const original = service.runGradescope;
    service.runGradescope = mockFn;
    return () => { service.runGradescope = original; };
}

/* 1. Missing credentials: 400 */
test("POST /fetch-gradescope → 400 when missing email/password", async () => {
    const res = await request(app)
        .post("/fetch-gradescope")
        .send({ email: "", password: "" });

    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.message, "Email and password required");
});

/* 2. Server crash: 500 */
test("POST /fetch-gradescope → 500 on internal error", async () => {
    const restore = mockRunGradescope(async () => { throw new Error("Server exploded"); });

    const res = await request(app)
        .post("/fetch-gradescope")
        .send({ email: "user@test.com", password: "pass" });

    restore();

    assert.strictEqual(res.status, 500);
    assert.strictEqual(res.body.error, "Failed to connect to Gradescope");
});