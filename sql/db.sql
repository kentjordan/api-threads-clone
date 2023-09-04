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

CREATE TABLE thread_likes(
	id  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	thread_id UUID,
	by_user_id UUID,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT fk_threadId FOREIGN KEY (thread_id) REFERENCES threads(id),
	CONSTRAINT fk_by_userId FOREIGN KEY (by_user_id) REFERENCES users(id)
);

CREATE TABLE thread_reposts(
	id  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	thread_id UUID,
	by_user_id UUID,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT fk_threadId FOREIGN KEY (thread_id) REFERENCES threads(id),
	CONSTRAINT fk_by_userId FOREIGN KEY (by_user_id) REFERENCES users(id)
);

CREATE TABLE thread_photos(
	id  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	thread_id UUID,
	user_id UUID,
	img_url TEXT[],
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT fk_threadId FOREIGN KEY (thread_id) REFERENCES threads(id),
	CONSTRAINT fk_by_userId FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE thread_replies(
	id  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	thread_id UUID,
	user_id UUID,
	content_text TEXT,
	content_photos TEXT[],
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT fk_threadId FOREIGN KEY (thread_id) REFERENCES threads(id),
	CONSTRAINT fk_by_userId FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE refresh_tokens(
	user_id UUID NOT NULL PRIMARY KEY,
	refresh_token TEXT,
	CONSTRAINT fk_userId FOREIGN KEY (user_id) REFERENCES users(id)
);