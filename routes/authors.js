const express = require('express');
const router = express.Router();
const AuthorModel = require('../models/author');

// All authors 
router.get('/', async (req, res) => {
	let searchOptions = {};
	if (req.query.name) {
		searchOptions.name = new RegExp(req.query.name, 'i');
	}

	try {
		const authors = await AuthorModel.find(searchOptions);
		res.render('authors/index', { 
			authors: authors,
			searchOptions: req.query
		});
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
				res.redirect(`authors`);
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