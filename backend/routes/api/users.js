const express = require('express');
const router = express.Router();
// To check/validate user's request:
const { check, validationResult } = require('express-validator');

// @route  POST api/users
// @desc   Test route
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //   TODOs:
    //   See if user already exists
    //   Encrypt password
    //   Return jsonwebtoken (because user should be logged in upon registration)

    res.send('Users route');
  }
);

module.exports = router;
