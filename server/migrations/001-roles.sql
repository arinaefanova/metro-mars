CREATE TABLE IF NOT EXISTS roles
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT
);


INSERT INTO roles (title)
SELECT 'Admin'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE title = 'Admin');

INSERT INTO roles (title)
SELECT 'Worker'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE title = 'Worker');

INSERT INTO roles (title)
SELECT 'Technician'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE title = 'Technician');

INSERT INTO roles (title)
SELECT 'User'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE title = 'User');
