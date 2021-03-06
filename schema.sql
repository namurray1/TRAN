CREATE DATABASE tran_db;
use tran_db;

CREATE TABLE animals(
    animal_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pet_name varchar(255),
    pet_type varchar(255),
    gender varchar(255),
    breed varchar(255),
    weight decimal(3, 2),
    temperament varchar(255),
    special_needs varchar(255),
    lat decimal(17, 14),
    lng decimal(17, 14)
);

CREATE TABLE users(
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,    
    address varchar(255) NOT NULL,
    phone varchar(255) NOT NULL,
    hash varchar(255) NOT NULL,
    salt varchar(255) NOT NULL,
    role varchar(255) NOT NULL,
	lat decimal(17, 14),
    lng decimal(17, 14),
	createdAt datetime NOT NULL,
    updatedAt datetime NOT NULL
);

CREATE TABLE admins(
	full_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    non_profit_id varchar(255) NOT NULL,
    organization_name varchar(255) NOT NULL,
	hash varchar(255) NOT NULL,
    salt varchar(255) NOT NULL,
    phone varchar(255) NOT NULL,
    lat decimal(17, 14),
    lng decimal(17, 14),
    role varchar(255) NOT NULL
);