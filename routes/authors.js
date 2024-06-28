const express = require('express');
const router = express.Router();
const AuthorModel = require('../models/author');

// All authors 
router.get('/', (req, res) => {
	res.render('authors/index');
})

// New author
router.get('/new', (req, res) => {
	res.render('authors/new', { author: new AuthorModel() });
})

// Create author
router.post('/', (req, res) => {
	const author = new AuthorModel({
		name: req.body.name
	});

	author.save()
		.then((newAuthor) => {
			// res.render(`authors/${newAuthors.id}`);
			res.render(`authors`);
		})
		.catch((err) => {
			res.render('authors/new', {
				author: author,
				errorMessage: 'Error creating Author'
			})
			console.error(err);
		});
})

module.exports = router;