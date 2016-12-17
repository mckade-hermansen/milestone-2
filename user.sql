CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password VARCHAR,
  highscore INTEGER
);

INSERT INTO users (username, password, highscore)
  VALUES ('mckade', 'mckade', '9000');
