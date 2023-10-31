CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);