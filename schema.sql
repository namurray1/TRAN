CREATE DATABASE tran_db;
use tran_db;

CREATE TABLE Animal (
id int(11) NOT NULL AUTO_INCREMENT,
pet_name varchar(255),
pet_type varchar(255),
gender varchar(255),
breed varchar(255),
weight decimal(3, 2),
temperament varchar(255),
special_needs varchar(255),
google_place_id varchar(255)
);

CREATE TABLE User (
 id int(11) NOT NULL AUTO_INCREMENT,
 email varchar(255) DEFAULT NULL,
 username varchar(255) NOT NULL,
 hash varchar(255) DEFAULT NULL,
 salt varchar(255) DEFAULT NULL,
 role varchar(255) NOT NULL DEFAULT ‘user’,
 createdAt datetime NOT NULL,
 updatedAt datetime NOT NULL,
);

CREATE TABLE Volunteer (
 id int(11) NOT NULL AUTO_INCREMENT,
 animals_delivered int(11) NULL,
 user_volunteered_flag tinyint(1) NOT NULL DEFAULT ‘0’,
 createdAt datetime NOT NULL,
 updatedAt datetime NOT NULL,
 UserId int(11) NOT NULL,
 PRIMARY KEY (id),
 KEY AnimalId (AnimalId),
 KEY UserId (UserId),
 google_place_id varchar(255),
 CONSTRAINT volunteer_ibfk_1 FOREIGN KEY (AnimalId) REFERENCES Animal (id) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
 CONSTRAINT volunteer_ibfk_2 FOREIGN KEY (UserId) REFERENCES Users (id) ON DELETE NO ACTION ON UPDATE CASCADE,
 