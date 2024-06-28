const express = require('express');
const router = express.Router();
const AuthorModel = require('../models/author');

// All authors 
router.get('/', async (req, res) => {
	try {
		const authors = await AuthorModel.find({});
		res.render('authors/index', { authors: authors });
	} catch {
		res.render('/', { errorMessage: err });
	}
})

// New author
router.get('/new', (req, res) => {
	res.render('authors/new', { author: new AuthorModel() });
})

// Create author
router.post('/', async (req, res) => {
	const author = new AuthorModel({
		name: req.body.name
	});

	try {
		await author.save()
			.then((newAuthor) => {
				// res.render(`authors/${newAuthors.id}`);
				res.render(`authors`);
			})
	} catch(err) {
		res.render('authors/new', {
			author: author,
			errorMessage: 'Error creating Author'
		})
		console.error(err);
	}
})

module.exports = router;