-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS songs;
 
    CREATE TABLE songs (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    artist TEXT NOT NULL,
    genre TEXT NOT NULL
);