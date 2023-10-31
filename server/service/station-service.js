const {database} = require("../database/database");

class StationService {

    async addCrush(stationId, state) {
        try {
            await database().run(`
      UPDATE stations
      SET is_working = ?
      WHERE id = ?
    `, [state, stationId]);

            return true;
        } catch (error) {
            console.error('Error adding crash:', error);
            throw new Error('Error adding crash');
        }
    }

    async getAllCrashes() {
        try {
            return await database().all("SELECT * FROM stations WHERE is_working = 0");
        } catch (error) {
            throw new Error(`Error retrieving all crashes: ${error}`);
        }
    }

    async getAllWorkingStations() {
        try {
            return await database().all("SELECT * FROM stations WHERE is_working = 1");
        } catch (error) {
            throw new Error(`Error retrieving working stations: ${error}`);
        }
    }

    async getAllStations() {
        try {
            return await database().all("SELECT * FROM stations");
        } catch (error) {
            throw new Error(`Error retrieving all stations: ${error}`);
        }
    }

    async getStationById(stationId) {
        try {
            return await database().get(`SELECT * FROM stations WHERE id = ?`, [stationId]);
        } catch (error) {
            throw new Error(`Error retrieving station: ${error}`);
        }
    }

    async getConnectionsBySourceStationId(stationId) {
        try {
            return await database().all(`SELECT * FROM connections WHERE source_station_id = ?`, [stationId]);
        } catch (error) {
            throw new Error(`Error retrieving connections: ${error}`);
        }
    }

    async getStationByName(stationName){
        try {
            return await database().get(`SELECT * FROM stations WHERE name = ?`, [stationName]);
        } catch (error) {
            throw new Error(`Error retrieving station: ${error}`);
        }
    }

    async calculateShortestPath(fromStationId, toStationNameId) {
        const fromStation = await this.getStationById(fromStationId);
        const toStation = await this.getStationById(toStationNameId);

        if (!fromStation || !toStation) {
            return null;
        }

        const visited = new Set();
        const distances = new Map();
        const previous = new Map();

        const allStations = await this.getAllStations();
        allStations.forEach(station => {
            distances.set(station.name, Infinity);
        });
        distances.set(fromStation.name, 0);

        while (visited.size < allStations.length ) {
            let currentStation;
            let shortestDistance = Infinity;

            allStations.forEach(station => {
                if (!visited.has(station.name) && distances.get(station.name) < shortestDistance) {
                    currentStation = station;
                    shortestDistance = distances.get(station.name);
                }
            });

            if (!currentStation) {
                break;
            }

            visited.add(currentStation.name);

            const connections = await this.getConnectionsBySourceStationId(currentStation.id);
            for (const connection of connections) {
                const neighborStation = await this.getStationById(connection.destination_station_id);
                if (neighborStation && !visited.has(neighborStation.name)) {
                    const distanceToNeighbor = shortestDistance + 1;
                    const neighborStatus = neighborStation.is_working;

                    if (neighborStatus !== 0) {
                        if (distanceToNeighbor < distances.get(neighborStation.name)) {
                            distances.set(neighborStation.name, distanceToNeighbor);
                            previous.set(neighborStation.name, currentStation.name);
                        }
                    }
                }
            }
        }

        const path = [];
        let currentName = toStation.name;

        while (previous.has(currentName)) {
            const currentStation = await this.getStationByName(currentName);
            if (currentStation) {
                path.unshift(currentStation);
                currentName = previous.get(currentName);
            }
        }
        return path;
    }

    async getStationIsWork(stationId) {
        try {
            return await database().get(`SELECT is_working FROM stations WHERE id = ?`, [stationId]);
        } catch (error) {
            throw new Error(`Error retrieving station: ${error}`);
        }
    }

    async getStationsByLine(lineName) {
        try {
            return await database().all(`SELECT id FROM stations WHERE metro_line = ?`, [lineName]);
        } catch (error) {
            throw new Error(`Error retrieving station: ${error}`);
        }
    }

    async getCountSchedule() {
        try {
            const result = await database().get(`SELECT COUNT(*) AS count FROM schedule`);
            return result.count;
        } catch (error) {
            throw new Error(`Error retrieving count schedule: ${error}`);
        }
    }


    async generateSchedule(trainId, lineName, reverse) {
        const startTime = '2023-06-12T09:00:00';
        const endTime = '2023-06-12T24:00:00';

        let stations = await this.getStationsByLine(lineName);

        if (reverse === true){
            stations = stations.reverse();
        }

        const schedule = [];
        const currentTime = new Date(startTime);

        while (currentTime <= new Date(endTime)) {
            for (let i = 0; i < stations.length; i++) {
                const station = stations[i];
                schedule.push({ trainId, stationId: station.id, time: currentTime.toJSON() });
                currentTime.setMinutes(currentTime.getMinutes() + 5);
            }

            stations.reverse();

            if (stations.length === 1) {
                break;
            }
        }
        console.log(schedule);
        return schedule;
    }

    async populateScheduleForLine() {
        let trainId = 1;
        let lineName='Red Line';
        let schedule = await this.generateSchedule(trainId, lineName, false);

        for (const { stationId, time } of schedule) {
            await database().run('INSERT INTO schedule (train_id, station_id, time) VALUES (?, ?, ?)', [trainId, stationId, time]);
        }

        trainId=2;
        schedule = await this.generateSchedule(trainId, lineName, true);
        for (const { stationId, time } of schedule) {
            await database().run('INSERT INTO schedule (train_id, station_id, time) VALUES (?, ?, ?)', [trainId, stationId, time]);
        }

        trainId=3;
        lineName='Blue Line';
        schedule = await this.generateSchedule(trainId, lineName, false);
        for (const { stationId, time } of schedule) {
            await database().run('INSERT INTO schedule (train_id, station_id, time) VALUES (?, ?, ?)', [trainId, stationId, time]);
        }

        trainId=4;
        schedule = await this.generateSchedule(trainId, lineName, true);
        for (const { stationId, time } of schedule) {
            await database().run('INSERT INTO schedule (train_id, station_id, time) VALUES (?, ?, ?)', [trainId, stationId, time]);
        }

        trainId=5;
        lineName='Yellow Line';
        schedule = await this.generateSchedule(trainId, lineName, false);
        for (const { stationId, time } of schedule) {
            await database().run('INSERT INTO schedule (train_id, station_id, time) VALUES (?, ?, ?)', [trainId, stationId, time]);
        }

        trainId=6;
        schedule = await this.generateSchedule(trainId, lineName, true);
        for (const { stationId, time } of schedule) {
            await database().run('INSERT INTO schedule (train_id, station_id, time) VALUES (?, ?, ?)', [trainId, stationId, time]);
        }

        trainId=7;
        lineName='Green Line';
        schedule = await this.generateSchedule(trainId, lineName, false);
        for (const { stationId, time } of schedule) {
            await database().run('INSERT INTO schedule (train_id, station_id, time) VALUES (?, ?, ?)', [trainId, stationId, time]);
        }

        trainId=8;
        schedule = await this.generateSchedule(trainId, lineName, true);
        for (const { stationId, time } of schedule) {
            await database().run('INSERT INTO schedule (train_id, station_id, time) VALUES (?, ?, ?)', [trainId, stationId, time]);
        }
    }
}

module.exports = new StationService();