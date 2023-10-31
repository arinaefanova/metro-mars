const express = require("express");
const router = express.Router();
const ticketService = require('../service/ticket-service');

router.get('/sell', async (req, res) => {
    try {
        console.log('Successful access check.');
    } catch (error) {
        console.error('Error sell ticket', error);
        res.status(500).json({ message: 'Failed to sell ticket' });
    }
});

router.post('/sell', async (req, res) => {
    try {
        const { price, childDiscount, pensionerDiscount} = req.body;

        const newTicket = {
            price,
            childDiscount,
            pensionerDiscount,
            ticketDate: new Date()
        };

        await ticketService.sellTicket(newTicket);
        res.status(201).json({ message: 'The ticket is successfully registered.' });
    } catch (error) {
        console.error('Error registering ticket:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/buy', async (req, res) => {
    try {
        const { price, childDiscount, pensionerDiscount, userId} = req.body;


        const newTicket = {
            price,
            childDiscount,
            pensionerDiscount,
            ticketDate: new Date(),
            userId
        };

        await ticketService.buyTicket(newTicket);
        res.status(201).json({ message: 'The ticket is successfully registered.' });
    } catch (error) {
        console.error('Error registering ticket:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/all-my', async (req, res) => {
    try {
        const userId = Number(req.query.userId);
        const tickets = await ticketService.getTicketsById(userId);
        res.json(tickets);
    } catch (error) {
        console.error('Error retrieving tickets:', error);
        res.status(500).json({ message: 'Failed to retrieve tickets' });
    }
});

module.exports = router;