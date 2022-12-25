CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    user_name VARCHAR (50) NOT NULL UNIQUE ,
    first_name VARCHAR (50) NOT NULL, 
    last_name VARCHAR (50) NOT NULL, 
    password VARCHAR (255) NOT NULL);