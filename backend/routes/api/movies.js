const express = require('express');
const router = express.Router();

// @route  GET api/movies
// @desc   Test route
// @access Public
router.get('/', (req, res) => res.send('Movies route'));

module.exports = router;
