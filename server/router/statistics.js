const express = require("express");
const router = express.Router();
const statisticsService = require('../service/statistics-service');
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, 'viv99vfd9vdf09', (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

router.get('/all-users', authenticateToken, async (req, res) => {
    try {
        const users = await statisticsService.getUserCount();
        res.json(users);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }
});

router.get('/all-tickets', authenticateToken, async (req, res) => {
    try {
        const tickets = await statisticsService.getTicketCount();
        res.json(tickets);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }
});

router.get('/today-tickets', authenticateToken, async (req, res) => {
    try {
        const tickets = await statisticsService.getTicketCountToday();
        res.json(tickets);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }
});

router.get('/all-stations', authenticateToken, async (req, res) => {
    try {
        const stations = await statisticsService.getStationsCount();
        res.json(stations);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }
});

router.get('/all-crashes', authenticateToken, async (req, res) => {
    try {
        const crashes = await statisticsService.getStationsCrash();
        res.json(crashes);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }
});






















module.exports = router;