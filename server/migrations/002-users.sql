CREATE TABLE IF NOT EXISTS users
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    date_of_birth DATE,
    email TEXT,
    password TEXT,
    is_pensioner INTEGER DEFAULT 0,
    is_child INTEGER DEFAULT 0,
    role_id INTEGER DEFAULT 4,
    FOREIGN KEY (role_id) REFERENCES roles (id)
)
