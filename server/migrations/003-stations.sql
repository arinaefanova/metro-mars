CREATE TABLE IF NOT EXISTS stations
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    metro_line TEXT,
    is_working INTEGER DEFAULT 1,
    next_station INTEGER DEFAULT 0,
    previous_station INTEGER DEFAULT 0,
    FOREIGN KEY (next_station) REFERENCES stations (id),
    FOREIGN KEY (previous_station) REFERENCES stations (id)
);

INSERT INTO stations (name, metro_line, next_station) VALUES ('Red Planet Central', 'Red Line', 2);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Olympus Mons Junction', 'Red Line', 3, 1);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Phobos Square', 'Red Line', 4, 2);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Valles Marineris Station', 'Red Line', 5, 3);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Gale Crater Hub', 'Red Line', 6, 4);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Polar Ice Caps Terminal', 'Red Line', 7, 5);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Spirit Rover Plaza', 'Red Line', 8, 6);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Curiosity Avenue', 'Red Line', 9, 7);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Tharsis Plateau Stop', 'Red Line', 10, 8);
INSERT INTO stations (name, metro_line, previous_station) VALUES ('Deimos Promenade', 'Red Line', 9);

INSERT INTO stations (name, metro_line, next_station) VALUES ('Solis Mons Station', 'Blue Line', 12);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Ascraeus Crater Stop', 'Blue Line', 13, 11);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Elysium Fields Station', 'Blue Line', 14, 12);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Mariner Valley Junction', 'Blue Line', 15, 13);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Hellas Basin Plaza', 'Blue Line', 16, 14);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Noctis Labyrinthus Terminal', 'Blue Line', 17, 15);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Syrtis Major Station', 'Blue Line', 18, 16);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Arsia Mons Crossing', 'Blue Line', 19, 17);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Utopia Planitia Hub', 'Blue Line', 20, 18);
INSERT INTO stations (name, metro_line, previous_station) VALUES ('Acidalia Planitia Stop', 'Blue Line', 19);

INSERT INTO stations (name, metro_line, next_station) VALUES ('Solaris Point Station', 'Yellow Line', 22);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Elysian Plains Stop', 'Yellow Line', 23, 21);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Marineris View Station', 'Yellow Line', 24, 22);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Cydonia Square Station', 'Yellow Line', 25, 23);
INSERT INTO stations (name, metro_line, previous_station) VALUES ('Olympus Heights Stop', 'Yellow Line', 24);

INSERT INTO stations (name, metro_line, next_station) VALUES ('Elysium Gardens Station', 'Green Line', 27);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Olympus Mons Plaza', 'Green Line', 28, 26);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Valles Oasis Stop', 'Green Line', 29, 27);
INSERT INTO stations (name, metro_line, next_station, previous_station) VALUES ('Phobos Promenade', 'Green Line', 30, 28);
INSERT INTO stations (name, metro_line, previous_station) VALUES ('Hellas Crater Station', 'Green Line', 29);

