CREATE DATABASE tran_db;
use tran_db;

CREATE TABLE animal(
    animal_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pet_name varchar(255),
    pet_type varchar(255),
    gender varchar(255),
    breed varchar(255),
    weight decimal(3, 2),
    temperament varchar(255),
    special_needs varchar(255),
    lat decimal(3, 14),
    lng decimal(3, 14)
);

CREATE TABLE user(
    user_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(255) DEFAULT NULL,
    username varchar(255) NOT NULL,
    hash varchar(255) DEFAULT NULL,
    salt varchar(255) DEFAULT NULL,
    role varchar(255) NOT NULL,
    createdAt datetime NOT NULL,
    updatedAt datetime NOT NULL
);

CREATE TABLE volunteer(
    user_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    animal_id int(11),
    animals_delivered int(11) NULL,
    user_volunteered_flag tinyint(1) NOT NULL DEFAULT 0,
    createdAt datetime NOT NULL,
    updatedAt datetime NOT NULL,
    lat decimal(3, 14),
    lng decimal(3, 14),
    FOREIGN KEY (animal_id) REFERENCES Animal(animal_id)
);

CREATE TABLE admin(
	admin_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    non_profit_id int NOT NULL,
    lat decimal(3, 14),
    lng decimal(3, 14),
    role varchar(255) NOT NULL
);