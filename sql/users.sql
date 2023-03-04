DROP TABLE IF EXISTS users;
CREATE TABLE users(userId INT, username VARCHAR(100), email TEXT, password TEXT, coins INT, PRIMARY KEY(userId), UNIQUE (email));

