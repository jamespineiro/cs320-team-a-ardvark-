const assert = require('assert');
const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');

console.log("🚀 Starting test script...");

// --- 1. MOCK THE SERVICE ---
// We use a container so we can swap the logic even after the router has loaded
let mockImplementation = async () => {}; // Default empty behavior

const mockService = {
    // The router will grab this function. inside, it calls whatever 'mockImplementation' is currently set to.
    runGradescope: async (...args) => {
        return mockImplementation(...args);
    }
};

try {
    const servicePath = require.resolve('../services/gradescopeService');
    require.cache[servicePath] = {
        id: servicePath,
        filename: servicePath,
        loaded: true,
        exports: mockService
    };
    console.log("✅ Mocked gradescopeService");
} catch (e) {
    console.log("⚠️  Warning: Could not mock '../services/gradescopeService'. Tests will run but might fail if they need the real service file to exist.");
}

// --- 2. SETUP SERVER ---
let gradescopeRouter;
const routerPath = '../routes/gradescope'; 

try {
    gradescopeRouter = require(routerPath); 
    console.log(`✅ Successfully loaded router from: ${routerPath}`);
} catch (e) {
    console.error("\n❌ ERROR: Could not find the router file.");
    console.error(`   Tried looking at: ${path.resolve(__dirname, routerPath)}.js`);
    console.error("   System Error:", e.message);
    process.exit(1);
}

const app = express();
app.use(express.json());
app.use('/', gradescopeRouter);

console.log("⏳ Starting test server...");
const server = app.listen(0, async () => {
    const port = server.address().port;
    const baseUrl = `http://localhost:${port}/fetch-gradescope`;
    console.log(`🧪 Test server running on port ${port}\n`);

    try {
        await runAllTests(baseUrl);
        console.log("\n✅ ALL TESTS PASSED");
    } catch (err) {
        console.error("\n❌ TEST FAILED");
        console.error(err);
    } finally {
        server.close();
        process.exit(0);
    }
});

// --- 3. TEST RUNNER ---
async function runAllTests(url) {
    
    // TEST 1: Missing Credentials
    process.stdout.write("Test 1: Check missing credentials... ");
    let res = await postRequest(url, { email: "only-email" });
    assert.strictEqual(res.statusCode, 400);
    console.log("Passed");

    // TEST 2: Successful Sync
    process.stdout.write("Test 2: Check successful sync... ");
    const mockData = [{ id: 1, name: "Homework 1" }];
    
    // UPDATE THE MOCK BEHAVIOR
    mockImplementation = async (email, pass) => {
        if (email === "valid@test.com" && pass === "123") return mockData;
        return { error: "Unexpected inputs" };
    };

    res = await postRequest(url, { email: "valid@test.com", password: "123" });
    
    // If this fails with 500, it means the mock threw an error or returned undefined
    if (res.statusCode === 500) {
        console.error("\n   Server Error Details:", res.body);
    }
    
    assert.strictEqual(res.statusCode, 200);
    assert.deepStrictEqual(res.body.assignments, mockData);
    console.log("Passed");

    // TEST 3: Login Failed
    process.stdout.write("Test 3: Check Gradescope login failure... ");
    
    // UPDATE THE MOCK BEHAVIOR
    mockImplementation = async () => ({ error: "Bad password" });

    res = await postRequest(url, { email: "wrong", password: "wrong" });
    assert.strictEqual(res.statusCode, 401);
    console.log("Passed");

    // TEST 4: Server Error
    process.stdout.write("Test 4: Check server crash handling... ");
    
    // UPDATE THE MOCK BEHAVIOR
    mockImplementation = async () => { throw new Error("Crash"); };

    res = await postRequest(url, { email: "test", password: "test" });
    assert.strictEqual(res.statusCode, 500);
    console.log("Passed");
}

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