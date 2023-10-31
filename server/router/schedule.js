const express = require("express");
const router = express.Router();
const scheduleService = require('../service/schedule-service');


router.get('/trains', async (req, res) => {
    try {
        const { stationId } = req.query;
        const trains = await scheduleService.getNearestTrains(stationId);
        res.json(trains);
    } catch (error) {
        console.error('Error getting nearest trains:', error);
        res.status(500).json({ message: 'Failed to get nearest trains' });
    }
});

router.get('/train', async (req, res) => {
    try {
        const { trainId } = req.query;
        const train = await scheduleService.getTrain(trainId);
        res.json(train);
    } catch (error) {
        console.error('Error getting nearest trains:', error);
        res.status(500).json({ message: 'Failed to get nearest trains' });
    }
});

router.get('/station-name', async (req, res) => {
    try {
        const { stationId } = req.query;
        const stationName = await scheduleService.getStationName(stationId);
        res.json(stationName);
    } catch (error) {
        console.error('Error getting station name:', error);
        res.status(500).json({ message: 'Failed to get station name' });
    }
});







module.exports = router;