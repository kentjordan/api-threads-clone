CREATE DATABASE threads;

DROP TABLE IF EXISTS threads;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	first_name VARCHAR(128),
	last_name VARCHAR(128),
	email VARCHAR(128) UNIQUE,
	password TEXT,
	username VARCHAR(32),
	bio VARCHAR(128),
	link TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP
);

CREATE TABLE threads(
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	user_id UUID NOT NULL,
	content_text TEXT,
	content_photos TEXT[],
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT fk_userId FOREIGN KEY (user_id) REFERENCES users(id)
);