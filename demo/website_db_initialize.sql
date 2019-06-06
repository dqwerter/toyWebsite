-- This file is intended to initialize the database of the website.

CREATE TABLE Users (
    uid int,
    username varchar(255),
    password varchar(255),
    email varchar(255),
    phoneNumber varchar(255),
    address varchar(255)
);

INSERT INTO Users VALUES('0', 'root', 'root', 'danielqin7@outlook.com', NULL, NULL);

CREATE TABLE comments
(
    comment_id int,
    FOREIGN KEY (author) REFERENCES Users (uid)
);