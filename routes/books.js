const express = require('express');
const router = express.Router();
const BookModel = require('../models/book');
const AuthorModel = require('../models/author');

// All books 
router.get('/', async (req, res) => {
	res.send('All books');
})

// New book
router.get('/new', async (req, res) => {
	try {
		const authors = await AuthorModel.find({});
		const book = new BookModel();
		res.render('books/new', {
			authors: authors,
			book: book
		});
	} catch {
		res.redirect('/books');
	}
	
})

// Create book
router.post('/', async (req, res) => {
	res.send('Create book');
})

module.exports = router;