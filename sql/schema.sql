CREATE TABLE graffiti (
    id INTEGER PRIMARY KEY,
    filename VARCHAR(64) NOT NULL,
    title VARCHAR(20),
    lat DOUBLE NOT NULL,
    lng DOUBLE NOT NULL
);

CREATE TABLE artist (
    id INTEGER PRIMARY KEY,
    filename VARCHAR(64),
    name VARCHAR(128) NOT NULL,
    link VARCHAR(128)
);

CREATE TABLE credits (
    graffiti_id INTEGER PRIMARY KEY,
    artist_id INTEGER,
    FOREIGN KEY(graffiti_id) REFERENCES graffiti(id),
    FOREIGN KEY(artist_id) REFERENCES graffiti(id)

);

PRAGMA foreign_keys = ON;