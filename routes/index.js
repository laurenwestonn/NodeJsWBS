const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('Here\'s a GET route to "/"');
})

module.exports = router;