/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */
const express = require('express');
const app = express();
const homepageRouter = require('./router/homepage')
const userRoutes = require('./router/user');
const ticketRoutes = require('./router/ticket');
const stationRoutes = require('./router/station');
const statisticsRoutes = require('./router/statistics');
const scheduleRoutes = require('./router/schedule');
const { initializeDatabase } = require('./database/database');
const checkAuth = require('./utils/checkAuth.js');
app.use(express.json());

process.env.TZ = 'Europe/Budapest';

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.status(200).end();
});

app.use(express.static('../vuetify-app/public'));
app.use(express.static('../vuetify-app/dist'));


app.use('/user/roots', (req, res, next) => checkAuth.checkRole(req, res, next, 1), userRoutes);
app.use('/statistics', (req, res, next) => checkAuth.checkRole(req, res, next, 1), statisticsRoutes);
app.use('/ticket/sell', (req, res, next) => checkAuth.checkRole(req, res, next, 2), ticketRoutes);
app.use('/station/crashes', (req, res, next) => checkAuth.checkRole(req, res, next, 3), stationRoutes);

app.use('/', homepageRouter);
app.use('/user', userRoutes);
app.use('/ticket',ticketRoutes);
app.use('/station', stationRoutes);
app.use('/schedule', scheduleRoutes);


initializeDatabase()
    .then(async () => {
        const port = process.env.PORT || 3000;
        app.listen(port, async () => {
            console.log(`Server is running on port ${port}`);
            try {
                await fetch(`http://localhost:${port}/station/timetable`);
                console.log('Initial schedule generation request sent.');
            } catch (error) {
                console.error('Failed to send initial schedule generation request:', error);
            }
        });
    })
    .catch((error) => {
        console.error('Error initializing database:', error);
    });

