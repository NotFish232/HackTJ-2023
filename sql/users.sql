DROP TABLE IF EXISTS users;
CREATE TABLE users(userId INT, username VARCHAR(100), email TEXT, password TEXT, coins INT, health INT, hasHouse INT, month INT, stocks INT, last_bought INT, PRIMARY KEY(userId), UNIQUE (email));

