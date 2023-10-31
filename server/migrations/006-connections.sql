CREATE TABLE IF NOT EXISTS connections
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_station_id INTEGER DEFAULT 0,
    destination_station_id INTEGER DEFAULT 0,
    FOREIGN KEY (source_station_id) REFERENCES stations (id),
    FOREIGN KEY (destination_station_id) REFERENCES stations (id)
);

INSERT INTO connections (source_station_id, destination_station_id) VALUES (1, 2);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (2, 3);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (3, 4);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (4, 5);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (5, 6);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (6, 7);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (7, 8);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (8, 9);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (9, 10);

INSERT INTO connections (source_station_id, destination_station_id) VALUES (10, 9);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (9, 8);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (8, 7);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (7, 6);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (6, 5);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (5, 4);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (4, 3);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (3, 2);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (2, 1);



INSERT INTO connections (source_station_id, destination_station_id) VALUES (8, 13);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (13, 8);



INSERT INTO connections (source_station_id, destination_station_id) VALUES (11, 12);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (12, 13);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (13, 14);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (14, 15);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (15, 16);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (16, 17);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (17, 18);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (18, 19);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (19, 20);

INSERT INTO connections (source_station_id, destination_station_id) VALUES (20, 19);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (19, 18);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (18, 17);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (17, 16);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (16, 15);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (15, 14);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (14, 13);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (13, 12);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (12, 11);



INSERT INTO connections (source_station_id, destination_station_id) VALUES (17, 22);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (22, 17);



INSERT INTO connections (source_station_id, destination_station_id) VALUES (21, 22);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (22, 23);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (23, 24);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (24, 25);

INSERT INTO connections (source_station_id, destination_station_id) VALUES (25, 24);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (24, 23);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (23, 22);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (22, 21);



INSERT INTO connections (source_station_id, destination_station_id) VALUES (24, 27);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (27, 24);



INSERT INTO connections (source_station_id, destination_station_id) VALUES (26, 27);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (27, 28);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (28, 29);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (29, 30);

INSERT INTO connections (source_station_id, destination_station_id) VALUES (30, 29);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (29, 28);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (28, 27);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (27, 26);



INSERT INTO connections (source_station_id, destination_station_id) VALUES (29, 5);
INSERT INTO connections (source_station_id, destination_station_id) VALUES (5, 29);