const {database} = require("../database/database");

class ScheduleService {

    async getNearestTrains(stationId) {
        try {
            const currentTime = new Date().toJSON();

            const timetable = await database().all(`
                SELECT *
                FROM (
                         SELECT *
                         FROM schedule
                         WHERE station_id = ? AND TIME(time) >= TIME(?)
                         ORDER BY time ASC
                     ) AS subquery
                GROUP BY train_id;
    `, [stationId, currentTime]);
            return timetable;
        } catch (error) {
            console.error(`Error retrieving nearest trains: ${error}`);
            throw error;
        }
    }

    async getTrain(trainId) {
        try {

            const train = await database().get(`
                         SELECT *
                         FROM trains
                         WHERE id = ? 
                    
    `, [trainId]);
            return train;
        } catch (error) {
            console.error(`Error retrieving train: ${error}`);
            throw error;
        }
    }

    async getStationName(stationId) {
        try {

            const stationName = await database().get(`
                         SELECT name
                         FROM stations
                         WHERE id = ? 
                    
    `, [stationId]);
            return stationName;
        } catch (error) {
            console.error(`Error retrieving station name: ${error}`);
            throw error;
        }
    }



}

module.exports = new ScheduleService();