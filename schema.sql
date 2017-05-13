CREATE DATABASE tran_db;
use tran_db;

CREATE TABLE animals(
    pet_name varchar(255),
    pet_type varchar(255),
    gender varchar(255),
    breed varchar(255),
    weight decimal(3, 2),
    temperament varchar(255),
    special_needs varchar(255),
    google_place_id varchar(255)
);