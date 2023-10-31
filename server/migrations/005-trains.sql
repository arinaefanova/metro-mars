CREATE TABLE IF NOT EXISTS trains
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    startStation INTEGER DEFAULT 0,
    destinationStation INTEGER DEFAULT 0,
    FOREIGN KEY (startStation) REFERENCES stations (id),
    FOREIGN KEY (destinationStation) REFERENCES stations (id)
);

INSERT INTO trains (startStation, destinationStation) VALUES (1, 10);
INSERT INTO trains (startStation, destinationStation) VALUES (10, 1);
INSERT INTO trains (startStation, destinationStation) VALUES (11, 20);
INSERT INTO trains (startStation, destinationStation) VALUES (20, 11);
INSERT INTO trains (startStation, destinationStation) VALUES (21, 25);
INSERT INTO trains (startStation, destinationStation) VALUES (25, 21);
INSERT INTO trains (startStation, destinationStation) VALUES (26, 30);
INSERT INTO trains (startStation, destinationStation) VALUES (30, 26);