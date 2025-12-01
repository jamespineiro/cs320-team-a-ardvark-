const express = require('express');
const router = express.Router();

/**
 remove before production.
 */
router.get('/mock-events', (req, res) => {
    const events = [
        {
            title: 'COMPSCI 230: 🛠️ Project 1, Data Representation - All',
            start: "2025-12-01",
        },
        {
            title: 'COMPSCI 320: Homework: Computing Lab 1 - Version Control',
            start: "2025-12-01",
        }
    ];
    res.json(events);
});

module.exports = router;