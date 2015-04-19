DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
    article_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    article_body TEXT,
    author_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS authors;
CREATE TABLE authors (
    author_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    article_id INTEGER
);

DROP TABLE IF EXISTS subscribers;
CREATE TABLE subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
);

