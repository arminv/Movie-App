const express = require('express');
const router = express.Router();
// const { check, validationResults } = require('express-validator');
const auth = require('../../middleware/auth');

const Movie = require('../../models/Movie');
const User = require('../../models/User');

// @route  POST api/movies
// @desc   Add a movie
// @access Private
router.post('/', [auth], async (req, res) => {
  
  // const errors = validationResults(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newMovie = new Movie({
      user: req.user.id,
      // text: req.body.text,
      movies: req.body.movies,
    });

    const movie = await newMovie.save();

    res.json(movie);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
