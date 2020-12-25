CREATE TABLE graffiti (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(64) NOT NULL,
    artist VARCHAR(128),
    title VARCHAR(20),
    lat DOUBLE NOT NULL,
    lng DOUBLE NOT NULL
);
