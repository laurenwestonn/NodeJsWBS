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
	res.send('Create');
})

module.exports = router;