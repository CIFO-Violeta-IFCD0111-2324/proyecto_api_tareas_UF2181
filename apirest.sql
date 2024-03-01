DROP DATABASE IF EXISTS `apirest`;
CREATE DATABASE `apirest`;
USE `apirest`;
CREATE TABLE tasks(id INT PRIMARY KEY AUTO_INCREMENT,
                   activity VARCHAR(40),
                   start DATE,
                   deadline DATE,
                   comentary VARCHAR(50));