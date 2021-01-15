/*** Creating the database ***/
CREATE DATABASE new_db;

/*** Creating users table ***/
CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);

/*** Creating books table ***/
CREATE TABLE books(
    book_id uuid DEFAULT uuid_generate_v4(),
    book_title VARCHAR(255) NOT NULL,
    book_categ VARCHAR(255),
    book_price FLOAT
);

/*** Creating reader table ***/
CREATE TABLE reader(
    reader_id uuid DEFAULT uuid_generate_v4(),
    reader_fullname VARCHAR(255) NOT NULL,
    reader_CIN VARCHAR(255),
    reader_adress VARCHAR(255),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

