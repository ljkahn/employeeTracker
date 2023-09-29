-- drop and then create company_db to ensure fresh database
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

--make sure we are using correct db
USE company_db;
--create department table
CREATE TABLE departments (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
dep_name VARCHAR(30) NOT NULL,


);

--create roles table
CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR (30) NOT NULL, 
department_id INT NOT NULL,
salary DECIMAL,

FOREIGN KEY (department_id)
REFERENCES departments(id)

);

--create employees table
CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INT,
manager_id INT,

FOREIGN KEY (role_id)
REFERENCES roles(id),
FOREIGN KEY (manager_id)
REFERENCES employee(id)

);