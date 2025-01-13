CREATE DATABASE IF NOT EXISTS library;
USE library;

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    status ENUM('Available', 'Checked Out') DEFAULT 'Available'
);

-- Insert data only if the table is empty
INSERT INTO books (title, author, status)
SELECT * FROM (SELECT 'The Great Gatsby', 'F. Scott Fitzgerald', 'Available') AS tmp
WHERE NOT EXISTS (
    SELECT * FROM books WHERE title = 'The Great Gatsby'
) LIMIT 1;

INSERT INTO books (title, author, status)
SELECT * FROM (SELECT 'To Kill a Mockingbird', 'Harper Lee', 'Available') AS tmp
WHERE NOT EXISTS (
    SELECT * FROM books WHERE title = 'To Kill a Mockingbird'
) LIMIT 1;

INSERT INTO books (title, author, status)
SELECT * FROM (SELECT '1984', 'George Orwell', 'Checked Out') AS tmp
WHERE NOT EXISTS (
    SELECT * FROM books WHERE title = '1984'
) LIMIT 1;
