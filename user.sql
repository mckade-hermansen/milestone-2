DROP DATABASE IF EXISTS generator;
CREATE DATABASE generator;

\c generator;

CREATE TABLE user (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password VARCHAR,
  highscore VARCHAR
);

INSERT INTO user (username, password, highscore)
  VALUES ('admin', 'password', '9000');
