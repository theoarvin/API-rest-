const express = require('express');

// la fonction Router()
const router = express.Router()

// importation du controllers/user
const userCtrl = require('../controllers/user');

// la route (endpoint) signup
router.post('/signup', userCtrl.signup);
// la route (endpoint) login
router.post('/login', userCtrl.login);

module.exports = router;