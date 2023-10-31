CREATE TABLE IF NOT EXISTS schedule
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    train_id INTEGER,
    station_id INTEGER,
    time DATE,
    FOREIGN KEY (train_id) REFERENCES trains (id),
    FOREIGN KEY (station_id) REFERENCES stations (id)
);
