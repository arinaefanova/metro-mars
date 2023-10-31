const express = require("express");
const router = express.Router();
const stationService = require('../service/station-service');

router.put('/crashes', async (req, res) => {
    try {
        const { stationId, state } = req.body;

        await stationService.addCrush(stationId, state);
        res.json({ message: 'Crash added successfully' });
    } catch (error) {
        console.error('Error adding crash:', error);
        res.status(500).json({ message: 'Failed to add crash' });
    }
});

router.get('/crashes', async (req, res) => {
    try {
        const crashes = await stationService.getAllCrashes();
        res.json(crashes);
    } catch (error) {
        console.error('Error getting crashes:', error);
        res.status(500).json({ message: 'Failed to get crashes' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const stations = await stationService.getAllWorkingStations();
        res.json(stations);
    } catch (error) {
        console.error('Error getting stations:', error);
        res.status(500).json({ message: 'Failed to get stations' });
    }
});

router.get('/all-st', async (req, res) => {
    try {
        const stations = await stationService.getAllStations();
        res.json(stations);
    } catch (error) {
        console.error('Error getting stations:', error);
        res.status(500).json({ message: 'Failed to get stations' });
    }
});

router.get('/route', async (req, res) => {
    try {
        const { startStationId, endStationId } = req.query;
        const route = await stationService.calculateShortestPath(startStationId, endStationId);
        res.json(route);
    } catch (error) {
        console.error('Error building route:', error);
        res.status(500).json({ message: 'Failed to build route' });
    }
});

router.get('/timetable', async (req, res) => {
    try {
        const count = await stationService.getCountSchedule();
        if (count === 0) {
        await stationService.populateScheduleForLine();
            res.status(200).json({ message: 'Schedule has been successfully generated.' });
        } else {
            res.status(200).json({ message: 'Schedule has already been filled.' });
        }
    } catch (error) {
        console.error('Error building schedule:', error);
        res.status(500).json({ message: 'Failed to build schedule' });
    }
});

router.get('/isWork', async (req, res) => {
    try {
        const { stationId } = req.query;
        const is_work = await stationService.getStationIsWork(stationId);
        res.json(is_work);
    } catch (error) {
        console.error('Error getting is_work:', error);
        res.status(500).json({ message: 'Failed to get is_work' });
    }
});

module.exports = router;