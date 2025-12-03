// canvas.test.js
import { test } from "node:test";
import assert from "node:assert";

// Mock dependencies
const CanvasModel = {
  create: async (data) => ({ _id: "mock_id", ...data }),
};
const encrypt = (token) => ({ encryptedData: "encrypted_" + token, iv: "iv" });
const runCanvas = (base_url, access_token, course_id) => {
  // Simulate running Python script
  return true;
};

// Minimal router handler function (like your route)
async function fetchCanvasHandler(req, res) {
  const { base_url, access_token, course_id, user_id } = req.body;

  if (!base_url || !access_token || !course_id || !user_id) {
    return res.status(400).json({ detail: "Missing required fields" });
  }

  const encrypted = encrypt(access_token);
  const saved = await CanvasModel.create({
    user_id,
    base_url,
    course_id,
    access_token: encrypted.encryptedData,
    iv: encrypted.iv,
  });

  runCanvas(base_url, access_token, course_id);

  return res.json({
    message: "Canvas connection saved + Python script started",
    id: saved._id,
  });
}

// Helper to create mock response object
function createMockRes() {
  let jsonResult = null;
  return {
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      jsonResult = data;
      this.jsonResult = jsonResult;
    },
  };
}

// --- TESTS ---

test("returns 400 if required fields are missing", async () => {
  const req = { body: { base_url: "https://canvas.test", access_token: "token" } }; // missing course_id, user_id
  const res = createMockRes();

  await fetchCanvasHandler(req, res);

  assert.strictEqual(res.statusCode, 400);
  assert.deepStrictEqual(res.jsonResult, { detail: "Missing required fields" });
});

test("saves Canvas data and returns success message", async () => {
  const req = {
    body: {
      base_url: "https://canvas.test",
      access_token: "token",
      course_id: "123",
      user_id: "user1",
    },
  };
  const res = createMockRes();

  await fetchCanvasHandler(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(
    res.jsonResult.message,
    "Canvas connection saved + Python script started"
  );
  assert.strictEqual(res.jsonResult.id, "mock_id");
});