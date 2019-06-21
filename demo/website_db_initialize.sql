-- This file is intended to initialize the database of the website.

CREATE DATABASE website_database;

USE website_database;

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
                                       id int(5) NOT NULL AUTO_INCREMENT,
                                       first_name varchar(255) NOT NULL,
                                       last_name varchar(255) NOT NULL,
                                       gender varchar(255) NOT NULL,
                                       number int(11) NOT NULL,
                                       image varchar(255) NOT NULL,
                                       user_name varchar(20) NOT NULL,
                                       PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=UTF8MB4 AUTO_INCREMENT=1;

