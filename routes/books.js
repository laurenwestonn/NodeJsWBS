const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const BookModel = require('../models/book');
const uploadPath = path.join('public', BookModel.coverImageBasePath);
const AuthorModel = require('../models/author');
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
const upload = multer({
	dest: uploadPath,
	fileFilter: (req, file, callback) => {
		callback(null, imageMimeTypes.includes(file.mimetype))
	}
});

// All books 
router.get('/', async (req, res) => {
	try {
		let query = BookModel.find();
		if (req.query.title) {
			query = query.regex('title', new RegExp(req.query.title, 'i'));
		}
		if (req.query.publishedBefore) {
			query = query.lte('publishDate', req.query.publishedBefore)
		}
		if (req.query.publishedAfter) {
			query = query.gte('publishDate', req.query.publishedAfter)
		}

		const books = await query.exec();

		res.render('books/index', {
			books: books,
			searchOptions: req.query
		});
	} catch {
		res.redirect('/books');
	}
})

// New book
router.get('/new', async (req, res) => {
	renderNewPage(res, new BookModel());
})

// Create book
router.post('/', upload.single('cover'), async (req, res) => {
	const book = new BookModel({
		title: req.body.title,
		description: req.body.description,
		publishDate: new Date(req.body.publishDate),
		pageCount: req.body.pageCount,
		author: req.body.author,
		coverImageName: !!req.file ? req.file.filename : null
	});

	try {
		const newBook = await book.save();
		res.redirect('/books');
	} catch {
		if (book.coverImageName) {
			removeBookCover(book.coverImageName);
		}
		renderNewPage(res, book, true);
	}
})

function removeBookCover(fileName) {
	fs.unlink(path.join(uploadPath, fileName), err => {
		if (err) {
			console.error(err);
		}
	});
}

async function renderNewPage(res, book, hasError = false) {
	try {
		const authors = await AuthorModel.find({});
		const params = {
			authors: authors,
			book: book
		};

		if (hasError) {
			params.errorMessage = 'Error creating book';
		}

		res.render('books/new', params);
	} catch {
		res.redirect('/books');
	}
	
}

module.exports = router;