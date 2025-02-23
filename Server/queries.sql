CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(100)
);

CREATE TABLE blogs(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(50),
    blog TEXT,
    date TEXT,
    user_id INTEGER REFERENCES users(id)
);
