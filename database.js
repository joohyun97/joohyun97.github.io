const sqlite3 = require('sqlite3').verbose();
const dbName = './db/books.db';

// Declare book database
let db = new sqlite3.Database(dbName, (err) => 
{
    if(err)
    {
        console.error(err.message);
    }
    else
    {
        console.log("Connected to the books database");
        db.run(`CREATE TABLE IF NOT EXISTS books (
            bookID INTEGER,
            isbn13 INTEGER,
            isbn10 INTEGER,
            title TEXT,
            subtitle TEXT,
            authors TEXT,
            categories TEXT,
            thumbnail TEXT,
            published_year INTEGER,
            average_rating TEXT,
            num_pages INTEGER,
            ratings_count INTEGER)`, (err) => {
            if(err)
            {
                console.error(err.message);
            }
            else
            {
                console.log("Book data is ready");
            }
        });
    };
});

// Exports db
module.exports = db;