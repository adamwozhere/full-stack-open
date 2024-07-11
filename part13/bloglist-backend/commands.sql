CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

insert into blogs (author, url, title) values ('Hunter S. Thompson', 'https://en.wikipedia.org/wiki/The_Rum_Diary_(novel)', 'The Rum Diary');
insert into blogs (author, url, title) values ('Patricia Highsmith', 'https://en.wikipedia.org/wiki/The_Talented_Mr._Ripley', 'The Talented Mr. Ripley');
insert into blogs (author, url, title) values ('F. Scott Fitzgerald', 'https://en.wikipedia.org/wiki/The_Great_Gatsby', 'The Great Gatsby');

select * from blogs;

