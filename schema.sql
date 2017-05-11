CREATE DATABASE tran_db;
use tran_db;

CREATE TABLE animals(
    petName varchar(255),
    petType varchar(255),
    gender varchar(255),
    breed varchar(255),
    weight decimal(3, 2),
    temperament varchar(255),
    special_needs varchar(255),
    location varchar(255)
);