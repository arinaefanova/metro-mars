const {database} = require("../database/database");

class StatisticsService {

    async getUserCount() {
        try {
            const result = await database().get("SELECT COUNT(*) AS count FROM users");
            return result.count;
        } catch (error) {
            throw new Error(`Error retrieving user count: ${error}`);
        }
    }

    async getTicketCount() {
        try {
            const result = await database().get("SELECT COUNT(*) AS count FROM tickets");
            return result.count;
        } catch (error) {
            throw new Error(`Error retrieving all ticket count: ${error}`);
        }
    }

    async getTicketCountToday() {
        try {
            const today = new Date().toISOString().slice(0, 10);
            const result = await database().get(`SELECT COUNT(*) AS count FROM tickets WHERE date(ticketDate) = date(?)`, today);
            return result.count;
        } catch (error) {
            throw new Error(`Error retrieving today's ticket count: ${error}`);
        }
    }

    async getStationsCount() {
        try {
            const result = await database().get("SELECT COUNT(*) AS count FROM stations");
            return result.count;
        } catch (error) {
            throw new Error(`Error retrieving stations count: ${error}`);
        }
    }

    async getStationsCrash() {
        try {
            const result = await database().get("SELECT COUNT(*) AS count FROM stations WHERE is_working = 0");
            return result.count;
        } catch (error) {
            throw new Error(`Error retrieving crash count: ${error}`);
        }
    }


}

module.exports = new StatisticsService();
