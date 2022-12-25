CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders(
    order_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    order_status VARCHAR(50) NOT NULL,
    user_id uuid DEFAULT uuid_generate_v4 () NOT NULL,  FOREIGN KEY (user_id) REFERENCES users (user_id) );