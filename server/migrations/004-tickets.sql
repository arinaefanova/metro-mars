CREATE TABLE IF NOT EXISTS tickets
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    price FlOAT,
    childDiscount INTEGER DEFAULT 0,
    pensionerDiscount INTEGER DEFAULT 0,
    ticketDate Date,
    id_user INTEGER DEFAULT 0,
    FOREIGN KEY (id_user) REFERENCES users (id)

)