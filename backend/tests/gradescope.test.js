const assert = require('assert');
const http = require('http');
const express = require('express');
const path = require('path');

// --- 1. MOCK THE SERVICE ---
const mockService = {
    runGradescope: async () => {} 
};

try {
    // Try to find the service to mock it. 
    const servicePath = require.resolve('../services/gradescopeService');
    require.cache[servicePath] = {
        id: servicePath,
        filename: servicePath,
        loaded: true,
        exports: mockService
    };
    console.log("Mocked gradescopeService");
} catch (e) {
    console.log("Could not find '../services/gradescopeService'.");
}

// --- 2. SETUP SERVER ---
let gradescopeRouter;
try {
    gradescopeRouter = require('./gradescope'); 
    console.log("Loaded gradescope.js router");
} catch (e) {
    console.error("\nERROR: Could not load './gradescope.js'.");
    process.exit(1);
}

const app = express();
app.use(express.json());
app.use('/', gradescopeRouter);

console.log("Attempting to start test server.");
const server = app.listen(0, async () => {
    const port = server.address().port;
    const baseUrl = `http://localhost:${port}/fetch-gradescope`;
    console.log(`Test server running on port ${port}\n`);

    try {
        await runAllTests(baseUrl);
        console.log("\nALL TESTS PASSED");
    } catch (err) {
        console.error("\nTEST FAILED");
        console.error(err);
    } finally {
        server.close();
        process.exit(0); 
    }
});

// --- 3. TEST RUNNER ---
async function runAllTests(url) {
    
    // TEST 1: Missing Credentials 
    console.log("Test 1: Check missing credentials...");
    let res = await postRequest(url, { email: "only-email" });
    assert.strictEqual(res.statusCode, 400, "Status should be 400");
    assert.strictEqual(res.body.message, "Email and password required");


    // TEST 2: Successful Sync 
    console.log("Test 2: Check successful sync...");
    const mockData = [{ id: 1, name: "Homework 1" }];
    
    // Update mock behavior for this test
    mockService.runGradescope = async (email, pass) => {
        if (email === "valid@test.com" && pass === "123") return mockData;
        return { error: "Unexpected inputs in mock" };
    };

    res = await postRequest(url, { email: "valid@test.com", password: "123" });
    assert.strictEqual(res.statusCode, 200, "Status should be 200");
    assert.deepStrictEqual(res.body.assignments, mockData, "Assignments should match mock data");


    // TEST 3: Login Failed (401)
    console.log("Test 3: Check Gradescope login failure...");
    mockService.runGradescope = async () => ({ error: "Bad password" });

    res = await postRequest(url, { email: "wrong", password: "wrong" });
    assert.strictEqual(res.statusCode, 401, "Status should be 401");
    assert.strictEqual(res.body.detail, "Bad password");


    // TEST 4: Server Error / Crash (500)
    console.log("Test 4: Check service exception...");
    mockService.runGradescope = async () => { throw new Error("Scraper crashed"); };

    res = await postRequest(url, { email: "test", password: "test" });
    assert.strictEqual(res.statusCode, 500, "Status should be 500");
    assert.strictEqual(res.body.error, "Failed to connect to Gradescope");
}

// --- Helper to make HTTP POST requests ---
function postRequest(url, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ statusCode: res.statusCode, body: JSON.parse(body) });
                } catch (e) {
                    resolve({ statusCode: res.statusCode, body: body });
                }
            });
        });
        req.on('error', reject);
        req.write(JSON.stringify(data));
        req.end();
    });
}