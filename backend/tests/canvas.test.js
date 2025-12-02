import { test } from "node:test";
import assert from "node:assert";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// import the handler factory
const { createFetchCanvasHandler } = require("../routes/canvas");

// create mocks
const mockCanvasModel = { create: async (data) => ({ _id: "mock_id", ...data }) };
const mockEncrypt = (t) => ({ encryptedData: "encrypted_" + t, iv: "iv" });
const mockRunCanvas = () => true;

// create the handler with injected mocks
const fetchCanvasHandler = createFetchCanvasHandler({
  CanvasModel: mockCanvasModel,
  encryptFn: mockEncrypt,
  runCanvasFn: mockRunCanvas,
});

// mock response
function createMockRes() {
  return {
    statusCode: 200,
    jsonResult: null,
    status(code) { this.statusCode = code; return this; },
    json(data) { this.jsonResult = data; },
  };
}

// --- TESTS ---
test("400 on missing fields", async () => {
  const req = { body: { base_url: "url", access_token: "token" } };
  const res = createMockRes();
  await fetchCanvasHandler(req, res);
  assert.strictEqual(res.statusCode, 400);
  assert.deepStrictEqual(res.jsonResult, { detail: "Missing required fields" });
});

test("success path", async () => {
  const req = {
    body: { base_url: "https://canvas.test", access_token: "token", course_id: "123", user_id: "user1" },
  };
  const res = createMockRes();
  await fetchCanvasHandler(req, res);
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.jsonResult.message, "Canvas connection saved + Python script started");
  assert.strictEqual(res.jsonResult.id, "mock_id");
});