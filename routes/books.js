const express = require('express');
const router = express.Router();
const BookModel = require('../models/book');

// All books 
router.get('/', async (req, res) => {
	res.send('All books');
})

// New book
router.get('/new', (req, res) => {
	res.send('New book');
})

// Create book
router.post('/', async (req, res) => {
	res.send('Create book');
})

module.exports = router;