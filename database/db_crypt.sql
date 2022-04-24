CREATE DATABASE Web_login;

USE Web_login;

CREATE TABLE user(
  id_user INT(10) NOT NULL PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  password VARCHAR(70) NOT NULL
);

ALTER TABLE user 
  MODIFY id_user INT(10) AUTO_INCREMENT, AUTO_INCREMENT = 1;

INSERT INTO user(username, password) VALUES ('ismael@email.go','pass123')