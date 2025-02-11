const { registerUser, loginUser } = require('../controllers/auth.controller.js');

const router = require('express').Router();

router
    .post('/register', registerUser)
    .post('/login', loginUser)

module.exports = router;
