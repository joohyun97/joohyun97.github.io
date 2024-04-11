const express = require('express');
const path = require('path');
const app = express();
const { readTopRatedBooks, searchBooks, getBookDetailsById, getAllBooks } = require('./crud');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use(express.static('docs'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
})

app.get('/books', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'book-list.html'));
});

app.get('/api/books', (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 books per page if not specified
    
    getAllBooks(page, limit, (err, books) => 
    {
        if (err)
        {
            console.error(err);
            return res.status(500).send('Server error occurred fetching all books.');
        }
        res.json(books);
    });
});

app.get('/api/books/top-rated', (req, res) => {
    readTopRatedBooks((err, books) => {
        if (err)
        {
            res.status(500).send(err.message);
        } else
        {
            res.status(200).json(books);
        }
    });
});

app.get('/api/books/search', (req, res) => {
    const { query, type } = req.query;
    searchBooks(query, type, (err, books) => 
    {
        if (err)
        {
            console.error(err);
            res.status(500).send(err.message);
        } else
        {
            res.status(200).json(books);
        }
    });
});

app.get('/api/books/details/:bookID', (req, res) => {
    const { bookID } = req.params;
    
    getBookDetailsById(bookID, (err, book) => 
    {
        if (err)
        {
            console.error(err);
            return res.status(500).send('Server error occurred fetching book details.');
        }
        res.json(book);
    });
});