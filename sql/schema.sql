CREATE TABLE graffiti (
    id INTEGER PRIMARY KEY,
    filename VARCHAR(64) NOT NULL,
    artist VARCHAR(20) NOT NULL,
    title VARCHAR(20),
    lat DOUBLE NOT NULL,
    lng DOUBLE NOT NULL,
);
