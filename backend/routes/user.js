const express = require('express');

// la fonction Router()
const router = express.Router()

// importation du middleware d'authentification
const auth = require('../middleware/auth');

// importation du controllers/user
const userCtrl = require('../controllers/user');

// la route (endpoint) signup
router.post('/signup', auth, userCtrl.signup);
// la route (endpoint) login
router.post('/login', auth, userCtrl.login);

module.exports = router;