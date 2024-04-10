const db = require('./database');

// Get top 3 books by rating 
const readTopRatedBooks = (callback) => 
{
    const sql = `
        SELECT title, subtitle, authors, thumbnail, average_rating, bookID
        FROM books 
        ORDER BY CAST(average_rating AS REAL) DESC 
        LIMIT 3`;
    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
};

// Search books
const searchBooks = (query, type, callback) => 
{
    const allowedColumns = ['isbn13', 'isbn10', 'title', 'subtitle', 'authors', 'categories'];
    const sql = `SELECT * FROM books WHERE ${type} LIKE ? LIMIT 100`;

    // Execute the query with parameter substitution for the query value
    db.all(sql, [`%${query}%`], (err, rows) => {
        callback(err, rows);
    });
};

// Get details of the book
const getBookDetailsById = (bookID, callback) => 
{
    const sql = 'SELECT * FROM books WHERE bookID = ?';
    
    db.get(sql, [bookID], (err, row) => {
        if (err) 
        {
            return callback(err, null);
        }
        // If the book is found, row object is returned, else row will be undefined
        if (row) 
        {
            callback(null, row);
        } else 
        {
            callback(new Error('Book not found'), null);
        }
    });
};

// Fetch all books
const getAllBooks = (page, limit, callback) => 
{
    const offset = (page - 1) * limit;
    const sql = `
        SELECT title, subtitle, authors, thumbnail, average_rating, bookID
        FROM books
        LIMIT ? OFFSET ?`;
    db.all(sql, [limit, offset], (err, rows) => {
        callback(err, rows);
    });
};

module.exports = { readTopRatedBooks, searchBooks, getBookDetailsById, getAllBooks };
