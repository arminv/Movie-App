const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Movie = require('../../models/Movie');
// const User = require('../../models/User');

// @route  POST api/movies
// @desc   Add a movie
// @access Private
router.post('/', auth, async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select('-password');

    const newMovie = new Movie({
      user: req.user.id,
      movies: req.body.movies,
    });

    const movie = await newMovie.save();

    res.json(movie);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/movies
// @desc   Get all movies
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    // Sort by most recent movie:
    const movies = await Movie.find().sort({ date: -1 });
    res.json(movies);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/movies/:userId
// @desc   Get movies by userId
// @access Private
router.get('/:userId', auth, async (req, res) => {
  try {
    // Sort by most recent movie:
    const movie = await Movie.find({ user: req.params.userId }).sort({
      date: 1,
    });

    if (!movie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }

    res.json(movie);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Movie not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route  DELETE api/movies/:id
// @desc   Delete a movie by movie id
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // Sort by most recent movie:
    const movie = await Movie.findById(req.params.id);

    // Check movie:
    if (!movie) {
      return res.status(401).json({ msg: 'Movie not found' });
    }

    // Check user (should be authorized):
    if (movie.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    movie.remove();

    res.json({ msg: 'Movie removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Movie not found' });
    }
    res.status(500).send('Server Error');
  }
});
module.exports = router;
