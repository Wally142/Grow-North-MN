CREATE DATABASE grow-north;

CREATE TABLE prospects (
 id serial primary key,
 firstname VARCHAR (200),
 lastname VARCHAR (200),
 email VARCHAR (200),
 phone VARCHAR (20),
 company VARCHAR (200),
 image VARCHAR (3000),
 title VARCHAR (200),
 referral VARCHAR (600),
 permission BOOLEAN default false,
 mentor BOOLEAN default false,
 mentee BOOLEAN default false,
 involvement VARCHAR (200),
 howhelp VARCHAR (600),
 experience VARCHAR (1000),
 struggle VARCHAR (2000),
 ecosystem VARCHAR (200),
 employees VARCHAR (600),
 revenue VARCHAR (600),
 distribution VARCHAR (200),
 story VARCHAR (1000),
 comments VARCHAR (3000),
 startdate TIMESTAMP DEFAULT current_timestamp,
 approved BOOLEAN default false
 );

CREATE TABLE connections (
id serial primary key,
person1 int references prospects (id) ON DELETE CASCADE,
person2 int references prospects (id) ON DELETE CASCADE,
constraint person1_cannot_be_equal_to_person2_CHK CHECK (person1 <> person2)
);

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username varchar(55),
password varchar(60),
email varchar(100)
);